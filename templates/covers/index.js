import { html } from '../../src/lit-html';

/* templates */
import selectedInput from '../selected-input';

export default () => html`
<div class="section">
    <h3 class="section__header">Your Covers</h3>
    <form class="section__body">
        ${selectedInput(meta)}
    </form>

    <button type="button" class="button button--right button--primary" id="submit-selected-cover">Continue</button>
</div>
`;

const meta = {
    inputKey: 'selectedCover',
    inputMethod: "SelectOne",
    sourceOutputKey: 'availableCovers',
    title: 'Select your cover',
};
