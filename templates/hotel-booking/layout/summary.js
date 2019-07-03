import { html, templates, classMap } from '/src/main.js';

export default {
    MobileTemplate: (inputs = {}, outputs = {}, cache = {}, _local = {}, _) => {
        return MobileSummaryWrapper(inputs, outputs, cache, _);
    },
    DesktopTemplate: (inputs = {}, outputs = {}, cache = {}, _local = {}, _) => {
        return DesktopSummaryWrapper(inputs, outputs, cache, _);
    }
};

function SummaryDetails({ outputs, inputs }) {
    const price = inputs.selectedRooms && inputs.selectedRooms[0].price;

    return html`
    <div class="summary__body">
        <article class="summary__block">
             <ul class="dim">
                ${ inputs.selectedRooms && inputs.selectedRooms[0] ? html`
                    <b>${ inputs.selectedRooms[0].type }</b>
                    ${ inputs.selectedRooms[0].valueAdditions.map(i => html`<li>${ valueLabel(i) }</li>`) }
                    ` : ''}

                ${price ? html`
                    <li class="summary__price">
                        <b class="large">
                            ${templates.priceDisplay(price)}
                        </b>
                    </li>` : ''}
            </ul>
        </article>

        ${ outputs.priceBreakdown ? html`
            <article class="summary__block">
                <header class="summary__block-title">
                    Price Breakdown
                </header>
                <table class="table">
                    ${ outputs.priceBreakdown.map(i => html`
                        <tr>
                            <th>${ i.description } ${ i.type ? '· ' + templates.priceType(i.type) : '' }</th>
                            <td>${ templates.priceDisplay(i.price) }</td>
                        </tr>`) }
                </table>
            </article>` :
        '' }
    </div>`;
}

function SummaryPreview({ inputs }) {
    const price = inputs.selectedRooms && inputs.selectedRooms[0].price;

    return html`
        ${price ? html`
            <b class="large summary__preview-price">
                ${templates.priceDisplay(price)}
            </b>` : ''}
        ${inputs.selectedRooms && inputs.selectedRooms[0] ? html`
            <span class="faint summary__preview-info">
                <span>${ [inputs.selectedRooms[0].type, ...inputs.selectedRooms[0].valueAdditions.map(valueLabel)].join(', ') }</span>
            </span>` : ''}
    `;
}

function SummaryTitle(_) {
    const title = _.serviceName || 'Your Package';
    return html`
        <b class="large">${ title }</b>
        <span class="faint large">Hotel Booking</span>
    `;
}

function valueLabel(code) {
    switch (code) {
        case 'pay-later': return 'Pay later';
        case 'free-breakfast': return 'Breakfast included';
        case 'free-internet': return 'Wi-fi';
        default: return code;
    }
}

// UI wrappers

// mobile
let isExpanded = false;
function MobileSummaryWrapper(inputs, outputs, cache, _) {
    const update = new CustomEvent('update');
    const toggleSummary = {
        handleEvent() {
            isExpanded = !isExpanded;
            window.dispatchEvent(update);
        },
        capture: true
    };

    if (inputs.selectedRooms && inputs.selectedRooms[0] && showDetails()) {
        if (isExpanded) {
            return html`
            <aside class="summary">
                ${ToggableWrapper(SummaryTitle(_))}
                ${SummaryDetails({ inputs, outputs, cache })}
            </aside>
            <div class="app__summary-overlay" @click=${toggleSummary}></div>`;
        }
        return html`
        <aside class="summary">
            ${ToggableWrapper(SummaryPreview({ inputs, outputs, cache }))}
        </aside>`;
    }

    return html`
    <aside class="summary">
        <header class="summary__header">${SummaryTitle(_)}</header>
    </aside>`;

    function ToggableWrapper(template) {
        const classes = {
            'summary__header': true,
            'summary__header--toggable': true,
            'summary__header--toggled-down': isExpanded,
            'summary__header--toggled-up': !isExpanded
        };
        return html`
            <header
                class="${classMap(classes)}"
                @click=${toggleSummary}>
                <div class="summary__preview">${template}</div>
            </header>`;
    }
}

// deskop
function DesktopSummaryWrapper(inputs, outputs, cache, _) {
    return html`
    <aside class="summary">
        <header class="summary__header">${SummaryTitle(_)}</header>
        ${showDetails() ? SummaryDetails({ inputs, outputs, cache }) : ''}
    </aside>`;
}

function showDetails() {
    const route = window.location.hash.slice(1);
    return !['/error', '/confirmation'].includes(route);
}


