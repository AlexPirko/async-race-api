export default function addElement(elem: string, className: string[]): HTMLElement {
    const element = document.createElement(elem);
    element.classList.add(...className);
    return element;
}
