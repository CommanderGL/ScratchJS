import html from "./htm";
import '@fortawesome/fontawesome-free/js/all';
import './console.css';
import Draggabilly from "draggabilly";

const consoleElem = <HTMLDivElement>html`
<div class="console" hidden>
    <header class="console-header">
        <div class="console-title">Console</div>
        <div class="console-right-block">
            <div class="console-clear">Clear</div>
            <div class="console-close">
                <i class="fa-solid fa-xmark" aria-label="Close" tabindex=0></i>
            </div>
        </div>
    </header>
    <ul class="console-content"></ul>
</div>
`;

const consoleContent = <HTMLUListElement>consoleElem.querySelector('.console-content');

new Draggabilly(consoleElem, {
    handle: '.console-header',
    containment: '.gui_body-wrapper_-N0sA'
});

const menubarElem = html`
<div aria-label="Console" class="menu-bar_menu-bar-item_oLDa- menu-bar_hoverable_c6WFB">
    <span>Console</span>
</div>
`;

const SJSconsole = {
    log(text: string) {
        const elem = document.createElement('li');
        elem.textContent = text;
        if (text == '') {
            elem.style.color = "#777";
            elem.style.fontStyle = "italic";
            elem.textContent = "(empty string)";
        }
        consoleContent.appendChild(elem);
    },

    clear() {
        consoleContent.innerHTML = '<li style="color: #777; font-style: italic;">(console cleared)</li>';
    }
}

menubarElem.addEventListener('click', () => {
    consoleElem.toggleAttribute('hidden');
});

(<HTMLDivElement>consoleElem.querySelector('.console-close')).addEventListener('click', () => {
    consoleElem.toggleAttribute('hidden');
});

(<HTMLDivElement>consoleElem.querySelector('.console-clear')).addEventListener('click', SJSconsole.clear);

const createMenubarDivider = () => {
    const divider = document.createElement('div');
    divider.classList.add('divider_divider_1_Adi', 'menu-bar_divider_2VFCm');
    return divider;
};

export const insertMenubarElem = () => {
    document.querySelector('div.menu-bar_main-menu_3wjWH')?.insertBefore(menubarElem, document.querySelector('.menu-bar_growable_1sHWN'));
    document.querySelector('div.menu-bar_main-menu_3wjWH')?.insertBefore(createMenubarDivider(), document.querySelector('.menu-bar_growable_1sHWN'));
};

export const insertConsoleElem = () => {
    document.body.appendChild(consoleElem);
}

export default SJSconsole;