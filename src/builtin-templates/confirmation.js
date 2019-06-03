import { html, render } from 'lit-html';

export default (selector = '#app') => {
    return {
        init: () => {
            const target = document.querySelector(selector);
            if (!target) {
                throw new Error(`loading: selector ${selector} not found`);
            }

            render(template, target);
        }
    }
}

const template = html`
<div class="page">
    <h2> Purchase complete. Thank you. </h2>
    <p> You’ll receive an email confirmation shortly.</p>
</div>
`;
