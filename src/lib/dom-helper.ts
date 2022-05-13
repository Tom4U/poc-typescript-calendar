import { DateHelper } from './date-helper.js';

export class DomHelper {
    static getElement<TElement extends HTMLElement>(elementId: string): TElement {
        const element = document.getElementById(elementId);

        if (!element) {
            throw new Error(`Element with id ${elementId} not found`);
        }

        return <TElement>element;
    }

    static appendOptionToSelect(select: HTMLSelectElement, value: string, text: string): void {
        let option = document.createElement('option');

        option.value = value;
        option.innerText = text;

        select.appendChild(option);
    }
}
