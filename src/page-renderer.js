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
        this.name = name;
        this.selector = selector;
        this.sections = [...sections];
        this.onFinish = onFinish;
        this.currentSection = null;
    }

    init() {
        if (this.sections.length === 0) {
            throw 'PageRenderer init: empty sections []';
        }
        this.renderWrapper();
    }

    renderWrapper() {
        render(pageWrapper(), document.querySelector(this.selector));
        const wrappers = this.sections.map(section => kebabcase(section.name)).map(name => {
            return html`<form id="section-form-${name}"></form>`;
        });

        render(html`${wrappers.map(w => w)}`, document.querySelector('#target'));
        this.next();
    }

    next() {
        const section = this.sections.shift();

        if (!section) {
            throw 'PageRenderer next: no section';
        }

        this.currentSection = section;
        this.renderSection(section);
    }

    addListeners(name) {
        if (!sdk.initiated) {
            return;
        }

        const submitBtn = document.querySelector(`#submit-btn-${name}`);
        const cancelBtn = document.querySelector('#cancel-btn');
        const vaultForm = document.querySelector(VAULT_FORM_SELECTOR);
        const form = document.querySelector(`#section-form-${name}`);

        const vaultListener = () => {
            if (!form.reportValidity()) {
                console.log('invalid form');
                return;
            }

            submitBtn.setAttribute('disabled', 'true');

            isVaultFormValid(vaultForm)
                .then(() => {
                    return submitVaultForm(vaultForm);
                })
                .then(({ cardToken, panToken }) => {
                    submitBtn.setAttribute('disabled', 'true');
                    const inputs = serializeForm(`#section-form-${name}`);

                    if (inputs.payment) {
                        inputs.payment['card'] = { '$token': cardToken };
                    }
                    inputs['panToken'] = panToken;

                    return sdk.createJobInputs(inputs);
                })
                .then(submittedInputs => {
                    const event = new CustomEvent('newInputs', { detail: submittedInputs });
                    window.dispatchEvent(event);

                    if (this.sections.length === 0) {
                        render(html``, document.querySelector(this.selector));
                        this.onFinish();
                    } else {
                        form.classList.add('form--disabled');
                        [...form.querySelectorAll('input')].forEach(_ => _.setAttribute('disabled', 'disabled'));
                        vaultForm.setAttribute('id', `${VAULT_FORM_SELECTOR}-submitted`);
                        this.next();
                    }
                })
                .catch(err => {
                    if (document.querySelector('#error')) {
                        render(flashError(err), document.querySelector('#error'));
                    }
                    submitBtn.removeAttribute('disabled');
                });
        };

        const defaultListener = () => {
            if (!form.reportValidity()) {
                console.log('invalid form');
                return;
            }

            submitBtn.setAttribute('disabled', 'true');

            const inputs = serializeForm(`#section-form-${name}`);

            // send input sdk
            sdk.createJobInputs(inputs)
                .then(submittedInputs => {
                    const event = new CustomEvent('newInputs', { detail: submittedInputs });
                    window.dispatchEvent(event);

                    if (this.sections.length === 0) {
                        render(html``, document.querySelector(this.selector));
                        this.onFinish();
                    } else {
                        form.classList.add('form--disabled');
                        [...form.querySelectorAll('input')].forEach(_ => _.setAttribute('disabled', 'disabled'));
                        this.next();
                    }
                })
                .catch(err => {
                    if (document.querySelector('#error')) {
                        render(flashError(err), document.querySelector('#error'));
                    }
                    submitBtn.removeAttribute('disabled');
                });
        };

        if (submitBtn) {
            const listener = vaultForm ? vaultListener : defaultListener;
            submitBtn.addEventListener('click', listener);
        } else {
            console.warn('no click/input submission listener added for the section');
        }

        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => {
                sdk.cancelJob().then(_res => {
                    window.location.hash = '/error';
                });
            });
        }
    }

    skipSection() {
        if (this.sections.length === 0) {
            render(html``, document.querySelector(this.selector));
            this.onFinish();
        } else {
            const kebabCaseName = kebabcase(this.currentSection.name);
            const form = document.querySelector(`#section-form-${kebabCaseName}`);
            if (form) {
                form.classList.add('form--disabled');
                [...form.querySelectorAll('input')].forEach(_ => _.setAttribute('disabled', 'disabled'));
            }

            const vaultForm = document.querySelector(VAULT_FORM_SELECTOR);
            if (vaultForm) {
                vaultForm.setAttribute('id', `${VAULT_FORM_SELECTOR}-submitted`);
            }

            this.next();
        }
    }

    renderSection({ name, waitFor, template }) {
        const sectionName = kebabcase(name);
        const selector = document.querySelector(`#section-form-${sectionName}`);
        const skip = () => {
            this.skipSection();
        };

        if (!waitFor) {
            render(html`${template(sectionName, {}, skip)} `, selector);
            this.addListeners(sectionName);

            const { inputs } = Storage.getAll();
            const submittedInputs = Object.keys(inputs);
            this.skipIfSubmitted(submittedInputs);

            return;
        }

        render(html`${inlineLoading()} `, selector);

        this.getDataForSection(waitFor)
            .then(res => {
                render(html`${template(sectionName, res, skip)} `, selector);
                this.addListeners(sectionName);

                const { inputs } = Storage.getAll();
                const submittedInputs = Object.keys(inputs);
                this.skipIfSubmitted(submittedInputs);
            });
    }

    getDataForSection(waitFor) {
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
            const trackOutput = () => {
                const { outputs } = Storage.getAll();
                const allAvailable = keysToWaitFor.every(k => outputs[k] !== undefined);

                if (allAvailable) {
                    const data = {};
                    keysToWaitFor.forEach(k => data[k] = outputs[k]);

                    window.removeEventListener('newOutputs', trackOutput);
                    resolve(data);
                }
            };

            window.addEventListener('newOutputs', trackOutput);
        });
    }

    skipIfSubmitted(submittedInputKeys) {
        const kebabCaseName = kebabcase(this.currentSection.name);
        const inputKeysInSection = getFormInputKeys(`#section-form-${kebabCaseName}`);

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
