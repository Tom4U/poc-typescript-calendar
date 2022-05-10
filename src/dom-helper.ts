import { DateHelper } from "./date-helper.js";

export class DomHelper {
    static getSelect(selectId: string): HTMLSelectElement {
        const select = document.getElementById(selectId);
        
        if (! select) throw new Error(`Element with id ${selectId} not found`);
    
        return <HTMLSelectElement>select;
    }
    
    static appendOptionToSelect(select: HTMLSelectElement, value: string, text: string): void {
        let option = document.createElement('option');
            
        option.value = value;
        option.innerText = text;
    
        select.appendChild(option);
    }
    
    static updateCopyrightYear(): void {
        const element = document.querySelector('[data-copyright]');
    
        if (!element) {
            console.warn('No element with attribute data-copyright found');
            return;
        }
    
        element.innerHTML = element.innerHTML.replace('{{year}}', DateHelper.getCurrentYear().toString());
    }
    
    static getCalendarElement(calendarElementId: string): HTMLElement {
        const element = document.getElementById(calendarElementId);
    
        if (!element) {
            throw new Error(`Calendar element with id ${calendarElementId} not found`);
        }
    
        return element;
    }
}