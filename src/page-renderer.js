import kebabcase from '/web_modules/lodash.kebabcase.js';
import { html, render } from '/web_modules/lit-html/lit-html.js';
import sdk from './sdk.js';
import { serializeForm , getFormInputKeys } from './serialize-form.js';
import getData from './get-data-with-priority.js';
import pageWrapper from './builtin-templates/page-wrapper.js';
import inlineLoading from './builtin-templates/inline-loading.js';
import flashError from './builtin-templates/flash-error.js';
import * as Storage from './storage.js';

const VAULT_FORM_SELECTOR = '#ubio-vault-form';

/**
 * @param {String} name
 * @param {Array} sections
 * @param {String} selector
 * @param {Function} onFinish
 */
class PageRenderer {
    constructor(name, sections = [], selector, onFinish) {
        if (sections.length === 0) {
            throw new Error('PageRenderer constructor: sections is empty');
        }

        this.name = name;
        this.selector = selector;
        this.sections = [...sections];
        this.onFinish = onFinish;

        this.sectionsToRender = [];
        this.currentSection = null;
    }

    init() {
        this.sectionsToRender = this.sections.map(s => { return { elementName: kebabcase(s.name), ...s }; });
        this.renderWrapper();
    }

    renderWrapper() {
        render(pageWrapper(), document.querySelector(this.selector));
        const wrappers = this.sectionsToRender.map(s => html`<form id="section-form-${s.elementName}"></form>`);

        render(html`${wrappers.map(w => w)}`, document.querySelector('#target'));
        this.next();
    }

    next() {
        const section = this.sectionsToRender.shift();
        if (!section) {
            console.info('PageRenderer next: no section to render.');
            render(html``, document.querySelector(this.selector));
            return this.onFinish();
        }

        if (!section) {
            throw 'PageRenderer next: no section';
        }

        this.currentSection = section;
        this.renderSection(section);
    }

    addListeners(elementName) {
        if (!sdk.initiated) {
            return;
        }
        console.log('elementName', elementName);
        const submitBtn = document.querySelector(`#submit-btn-${elementName}`);
        const inputForm = document.querySelector(`#section-form-${elementName}`);

        const vaultListener = () => {
            if (inputForm && !inputForm.reportValidity()) {
                console.log('invalid form');
                return;
            }

            submitBtn.setAttribute('disabled', 'true');

            this.processVault()
                .then(() => {
                    const inputs = serializeForm(`#section-form-${elementName}`);
                    return this.createInputs(inputs);
                })
                .then(() => {
                    this.disableSection();
                    this.next();
                })
                .catch(err => {
                    if (document.querySelector('#error')) {
                        render(flashError(err), document.querySelector('#error'));
                    }
                    submitBtn.removeAttribute('disabled');
                });
        };

        if (submitBtn) {
            submitBtn.addEventListener('click', vaultListener);
        } else {
            console.warn('no click/input submission listener added for the section');
        }
    }

    processVault() {
        const vaultForm = document.querySelector(VAULT_FORM_SELECTOR);

        if (!vaultForm) {
            return Promise.resolve();
        }

        if (vaultForm) {
            return isVaultFormValid(vaultForm)
                .then(() => {
                    return submitVaultForm(vaultForm);
                })
                .then(({ cardToken, panToken }) => {
                    Storage.del('_', 'otp');
                    Storage.set('_', 'cardToken', cardToken);
                    Storage.set('_', 'panToken', panToken);

                    vaultForm.setAttribute('id', `${VAULT_FORM_SELECTOR}-submitted`);
                });
        }
    }

    createInputs(inputs) {
        let cardTokenSent = false;
        let panTokenSent = false;

        if (inputs.payment) {
            const cardToken = Storage.get('_', 'cardToken');
            const panToken = Storage.get('_', 'panToken');

            if (cardToken) {
                inputs.payment['card'] = { '$token': cardToken };
                cardTokenSent = true;
            }

            if (panToken) {
                inputs['panToken'] = panToken;
                panTokenSent = true;
            }
        }

        return sdk.createJobInputs(inputs)
            .then(submittedInputs => {
                const event = new CustomEvent('newInputs', { detail: submittedInputs });
                window.dispatchEvent(event);

                if (cardTokenSent) {
                    Storage.del('_', 'cardToken');
                }

                if (panTokenSent) {
                    Storage.del('_', 'panToken');
                }
            });
    }

    skipSection() {
        this.disableSection();

        const vaultForm = document.querySelector(VAULT_FORM_SELECTOR);
        if (vaultForm) {
            vaultForm.setAttribute('id', `${VAULT_FORM_SELECTOR}-submitted`);
        }

        this.next();
    }

    disableSection() {
        const inputForm = this.currentSection.inputForm;
        if (inputForm) {
            inputForm.classList.add('form--disabled');
            const fields = [
                ...inputForm.querySelectorAll('input'),
                ...inputForm.querySelectorAll('select')
            ];
            fields.forEach(_ => _.setAttribute('disabled', 'disabled'));
        }
    }

    renderSection({ elementName, waitFor, template }) {
        const sectionForm = document.querySelector(`#section-form-${elementName}`);
        this.currentSection.inputForm = sectionForm;

        render(html`${inlineLoading()} `, sectionForm);

        const skip = () => {
            this.skipSection();
        };

        this.getDataForSection(waitFor)
            .then(res => {
                render(html`${template(elementName, res, skip)} `, sectionForm);
                this.addListeners(elementName);
                this.skipIfSubmitted();
            });
    }

    getDataForSection(waitFor = []) {
        if (!waitFor || waitFor.length === 0) {
            return Promise.resolve({});
        }

        return new Promise(res => {
            const results = waitFor.map(_ => {
                const [type, sourceKey] = _.split('.');
                if (type === 'input') {
                    const data = Storage.get('input', sourceKey);
                    return { data, wait: false, sourceKey };
                }

                const data = getData(type, sourceKey);
                if (data === null) { // data is explicitly null
                    return { data: null, wait: false, sourceKey };
                }

                if (data) {
                    return { data, wait: false, sourceKey };
                }

                return { data: null, wait: true, sourceKey };
            });

            const keysToWaitFor = results.filter(r => r.wait === true).map(r => r.sourceKey);

            if (keysToWaitFor.length === 0) {
                const dataWaitFor = {};
                results.forEach(result => { dataWaitFor[result.sourceKey] = result.data; });

                return res(dataWaitFor);
            }

            const dataWaitFor = {};
            results.forEach(result => { dataWaitFor[result.sourceKey] = result.data; });

            this.waitForOutputs(keysToWaitFor).then(data => {
                res({ ...dataWaitFor, ...data });
            });
        });
    }

    waitForOutputs(keysToWaitFor) {
        return new Promise(resolve => {
            window.addEventListener('newOutputs', trackOutput);

            function trackOutput() {
                const { outputs } = Storage.getAll();
                const allAvailable = keysToWaitFor.every(k => outputs[k] !== undefined);

                if (allAvailable) {
                    const data = {};
                    keysToWaitFor.forEach(k => data[k] = outputs[k]);

                    window.removeEventListener('newOutputs', trackOutput);
                    resolve(data);
                }
            }
        });
    }

    skipIfSubmitted() {
        const { inputs } = Storage.getAll();
        const submittedInputKeys = Object.keys(inputs);
        const inputKeysInSection = getFormInputKeys(`#section-form-${this.currentSection.elementName}`);
        console.log(inputKeysInSection);
        if (inputKeysInSection.length === 0) {
            return;
        }

        /**
         * all input keys submitted -> skip section
         * part of the input keys submitted -> reset job, preserve input keys = submittedInputKeys - part of the keys submitted
         * none of keys submitted -> do nothing
        */
        const submittedKeysInSection = inputKeysInSection.map(k => submittedInputKeys.includes(k) ? k : null).filter(k => k);
        //all submitted
        if (submittedKeysInSection.length === inputKeysInSection.length) {
            return this.skipSection();
        }

        if (submittedKeysInSection.length > 0) {
            const preserveInputs = submittedInputKeys.filter(k => !submittedKeysInSection.includes(k));

            sdk.resetJob(inputKeysInSection[0], preserveInputs)
                .then(() => {
                    submittedKeysInSection.forEach(k => localStorage.removeItem(`input.${k}`));
                })
                .catch(_err => window.location.hash = '/error');
        }
    }
}

function isVaultFormValid(vaultForm) {
    return new Promise((resolve, reject) => {
        if (!vaultForm) {
            reject('vault form not found');
        }
        window.addEventListener('message', receiveValidation);
        vaultForm.contentWindow.postMessage('vault.validate', '*');

        function receiveValidation({ data: message }) {
            if (message.name === 'vault.validation') {
                if (message.data.isValid) {
                    resolve(message.data);
                } else {
                    reject('Please check payment details');
                }

                window.removeEventListener('message', receiveValidation);
            }
        }
    });
}

function submitVaultForm(vaultForm) {
    return new Promise((resolve, reject) => {
        if (!vaultForm) {
            reject('vault form not found');
        }

        window.addEventListener('message', receiveOutput);
        vaultForm.contentWindow.postMessage('vault.submit', '*');

        function receiveOutput({ data: message }) {
            if (message.name === 'vault.output') {
                window.removeEventListener('message', receiveOutput);
                return resolve(message.data);
            }

            if (message.name === 'vault.validationError') {
                window.removeEventListener('message', receiveOutput);
                return reject(message.name);
            }

            if (message.name === 'vault.error') {
                reject(message.name);
                sdk.cancelJob().then(() => {
                    window.location.hash = '/error';
                });
            }
        }
    });
}

function getPageRenderer(name, sections, selector, onFinish) {
    return new PageRenderer(name, sections, selector, onFinish);
}

export default getPageRenderer;
