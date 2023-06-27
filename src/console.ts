import htm from 'htm';

const appendChild = (parent: Element, child: Element) => {
    if (Array.isArray(child)) {
        child.forEach(nestedChild => appendChild(parent, nestedChild));
        return;
    }
    parent.appendChild(child.nodeType ? child : document.createTextNode(<any>child));
}

const h = (type: keyof HTMLElementTagNameMap | string, props: {[key: string]: any}, ...children: Element[]) => {
    const elem = document.createElement(type);

    children.forEach(child => {
        appendChild(elem, child);
    });

    Object.entries(props || {}).forEach(([prop, value]) => {
        elem.setAttribute(prop, value);
    });

    return elem;
}

const html = htm.bind(h);

const menubarElem = html`
<div aria-label="Console" class="menu-bar_menu-bar-item_oLDa- menu-bar_hoverable_c6WFB">
    <span>Console</span>
</div>
`;

const createMenubarDivider = () => {
    const divider = document.createElement('div');
    divider.classList.add('divider_divider_1_Adi', 'menu-bar_divider_2VFCm');
    return divider;
};

export const insertMenubarElem = () => {
    document.querySelector('div.menu-bar_main-menu_3wjWH')?.insertBefore(<Node>menubarElem, document.querySelector('.menu-bar_growable_1sHWN'));
    document.querySelector('div.menu-bar_main-menu_3wjWH')?.insertBefore(createMenubarDivider(), document.querySelector('.menu-bar_growable_1sHWN'));
};

export const consoleElem = html`
<h1>Hello, World!</h1>
`;