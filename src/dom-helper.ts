import { getCurrentYear } from "./date-helper.js";

export function getYearSelector(yearSelectorId: string): HTMLSelectElement {
    const selector = document.getElementById(yearSelectorId);
    
    if (! selector) throw new Error(`Element with id ${yearSelectorId} not found`);

    return <HTMLSelectElement>selector;
}

export function getMonthSelector(monthSelectorId: string): HTMLSelectElement {
    const selector = document.getElementById(monthSelectorId);
    
    if (! selector) throw new Error(`Element with id ${monthSelectorId} not found`);

    return <HTMLSelectElement>selector;
}

export function appendOptionToSelect(select: HTMLSelectElement, value: string, text: string): void {
    let option = document.createElement('option');
        
    option.value = value;
    option.innerText = text;

    select.appendChild(option);
}

export function updateCopyrightYear(): void {
    const element = document.querySelector('[data-copyright]');

    if (!element) {
        console.warn('No element with attribute data-copyright found');
        return;
    }

    element.innerHTML = element.innerHTML.replace('{{year}}', getCurrentYear().toString());
}

export function getCalendarElement(calendarElementId: string): HTMLElement {
    const element = document.getElementById(calendarElementId);

    if (!element) {
        throw new Error(`Calendar element with id ${calendarElementId} not found`);
    }

    return element;
}