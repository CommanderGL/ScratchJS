import htm from 'htm';

const appendChild = (parent: Element, child: Element) => {
    if (Array.isArray(child)) {
        child.forEach(nestedChild => appendChild(parent, nestedChild));
        return;
    }
    parent.append(child.nodeType ? child : document.createTextNode(<any>child));
}

const createElement = (type: keyof HTMLElementTagNameMap | string, props: {[key: string]: any}, ...children: Element[]) => {
    const elem = document.createElement(type);

    children.forEach(child => {
        appendChild(elem, child);
    });

    Object.entries(props || {}).forEach(([prop, value]) => {
        elem.setAttribute(prop, value);
    });

    return elem;
}

const htmBinding = htm.bind(createElement);

const html = (strings: TemplateStringsArray, ...values: any[]) => {
    const htmUsage = htmBinding(strings, ...values);
    if (Array.isArray(htmUsage)) {
        const divWrapper = document.createElement('div');
        htmUsage.forEach(usage => {
            divWrapper.append(usage);
        });

        return divWrapper;
    }

    return htmUsage;
}

export default html;