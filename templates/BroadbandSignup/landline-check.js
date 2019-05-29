import { html } from '../../src/lit-html';

export default () => html`
<div name="landline-check">
    <div class="field field-set">
        <label class="field__name" for="landline-check[postcode]">Post Code</label>
        <input type="text" name="landline-check[postcode]" placeholder="EC1R 0AT" required />
    </div>

    <div class="field field-set">
        <span class="field__name">Land line</span>
        <input type="text" name="landline-check[landline]" placeholder="EC1R 0AT" pattern="^0[0-9]{8,10}" required />
    </div>

    <div class="field__inputs group group--merged">
        <input type="radio" value="true" name="landline-check[billpayer]-$boolean" id="landline-check[billpayer]-yes"/>
        <label for="landline-check[billpayer]-yes" class="button">Yes</label>

        <input type="radio" value="false" name="landline-check[billpayer]-$boolean" id="landline-check[billpayer]-no">
        <label for="landline-check[billpayer]-no" class="button">No</label>
    </div>
</div>
`;