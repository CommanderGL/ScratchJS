import html from "./htm";
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import './console.css';
import Draggabilly from "draggabilly";

const consoleElem = html`
<div class="console" hidden>
    <header class="console-header">
        <div class="console-title">
            <i class="console-icon fa-solid fa-terminal"></i>
            Console
        </div>
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
    <i class="console-icon fa-solid fa-terminal"></i>
    <span>Console</span>
</div>
`;

const SJSconsole = {
    log(text: string) {
        if (consoleContent.innerHTML === /* html */`<li style="color: #777; font-style: italic;">(console cleared)</li>`) {
            consoleContent.innerHTML = '';
        }

        const elem = document.createElement('li');
        elem.textContent = text;

        if (text == '') {
            elem.style.color = "#777";
            elem.style.fontStyle = "italic";
            elem.textContent = "(empty string)";
        }

        let bottom = false;
        if (consoleContent.scrollTop + consoleContent.clientHeight >= consoleContent.scrollHeight - 10) bottom = true;
        consoleContent.appendChild(elem);
        if (bottom) elem.scrollIntoView();
    },
    error(text: string) {
        if (consoleContent.innerHTML === /* html */`<li style="color: #777; font-style: italic;">(console cleared)</li>`) {
            consoleContent.innerHTML = '';
        }

        const elem = document.createElement('li');
        elem.textContent = text;
        elem.style.color = "#eb4034";

        if (text == '') {
            elem.style.color = "#777";
            elem.style.fontStyle = "italic";
            elem.textContent = "(empty error string)";
        }
        
        let bottom = false;
        if (consoleContent.scrollTop + consoleContent.clientHeight >= consoleContent.scrollHeight - 10) bottom = true;
        consoleContent.appendChild(elem);
        if (bottom) elem.scrollIntoView();
    },
    warn(text: string) {
        if (consoleContent.innerHTML === /* html */`<li style="color: #777; font-style: italic;">(console cleared)</li>`) {
            consoleContent.innerHTML = '';
        }

        const elem = document.createElement('li');
        elem.textContent = text;
        elem.style.color = "#d1b536";

        if (text == '') {
            elem.style.color = "#777";
            elem.style.fontStyle = "italic";
            elem.textContent = "(empty warning string)";
        }

        let bottom = false;
        if (consoleContent.scrollTop + consoleContent.clientHeight >= consoleContent.scrollHeight - 10) bottom = true;
        consoleContent.appendChild(elem);
        if (bottom) elem.scrollIntoView();
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