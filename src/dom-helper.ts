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
    
    static getElement(elementId: string): HTMLElement {
        const element = document.getElementById(elementId);
    
        if (!element) {
            throw new Error(`Element with id ${elementId} not found`);
        }
    
        return element;
    }
}