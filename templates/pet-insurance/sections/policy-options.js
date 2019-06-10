import { html } from '/web_modules/lit-html/lit-html.js';
import { policyOptions, selectedCover, selectedPaymentTerm } from '../inputs/index.js';

export default (name, { availableCovers, availablePaymentTerms }) => html`
    ${policyOptions()}
    ${selectedCover(availableCovers)}
    ${selectedPaymentTerm(availablePaymentTerms)}

    <div class="section__actions">
        <button type="button" class="button button--right button--primary" id="submit-btn-${name}">Find Cover</button>
    </div>
`;