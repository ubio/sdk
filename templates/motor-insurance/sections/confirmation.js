import { html } from '/web_modules/lit-html/lit-html.js';
import render from '../render.js';

export default function confirmation({ data: { purchaseConfirmation } }) {
    return render(html`
        <div>
            <p class="large">
                <b>Purchase complete. Thank you.</b>
            </p>
            <p class="dim">
                Your purchase reference is <strong>${purchaseConfirmation.purchaseReference}</strong>.
                You’ll recieve an email confirmation shortly.
            </p>
            <p>
                <a href="/" class="button button--primary">Finish</a>
            </p>
        </div>
    `);
}
