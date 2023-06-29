import html from "./htm";
import '@fortawesome/fontawesome-free/css/all.min.css';
import './console.css';
import Draggabilly from "draggabilly";

export const consoleElem = <HTMLDivElement>html`
<div class="console" hidden>
    <header class="console-header">
        <span>Console</span>
        <button class="console-close"><i class="fa-solid fa-xmark"></i></button>
    </header>
    <h1>Hi!</h1>
</div>
`;

const menubarElem = html`
<div aria-label="Console" class="menu-bar_menu-bar-item_oLDa- menu-bar_hoverable_c6WFB">
    <span>Console</span>
</div>
`;

const consoleDraggie = new Draggabilly(consoleElem, {
    handle: '.console-header',
    containment: '.gui_body-wrapper_-N0sA'
});

menubarElem.addEventListener('click', () => {
    consoleElem.toggleAttribute('hidden');
});

(<HTMLButtonElement>consoleElem.querySelector('.console-close')).addEventListener('click', () => {
    consoleElem.toggleAttribute('hidden');
});

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