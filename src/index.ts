import { loadCalendar, loadMonths, loadYears } from "./calendar.js";
import { getCurrentMonth, getCurrentYear } from "./date-helper.js";
import { getCalendarElement, getMonthSelector, getYearSelector, updateCopyrightYear } from "./dom-helper.js";

document.addEventListener('DOMContentLoaded', init);

const yearSelectorId = 'year-selector';
const monthSelectorId = 'month-selector';
const calendarElementId = 'calendar';

function init(): void {
    console.log('App gestartet');
    
    initSelectors();
    loadCalendar(getCalendarElement(calendarElementId), getCurrentMonth(), getCurrentYear());
    updateCopyrightYear();
}

function initSelectors(): void {
    initYearSelector();
    initMonthSelector();
}

function initYearSelector(): void {
    const selector = getYearSelector(yearSelectorId);

    selector.addEventListener('change', (event: Event) => {
        const element = <HTMLSelectElement>event.currentTarget;
        const year = parseInt(element.selectedOptions[0].value);

        updateYear(year);
    });

    loadYears(selector);
}

function initMonthSelector(): void {
    const selector = getMonthSelector(monthSelectorId);

    selector.addEventListener('change', (event: Event) => {
        const element = <HTMLSelectElement>event.currentTarget;
        const month = parseInt(element.selectedOptions[0].value) + 1;

        updateMonth(month);
    });

    loadMonths(selector);
}

function updateMonth(month: number): void {
    const yearSelector = getYearSelector(yearSelectorId);
    const year = parseInt(yearSelector.selectedOptions[0].value);

    loadCalendar(getCalendarElement(calendarElementId), month, year);
}

function updateYear(year: number): void {
    const monthSelector = getMonthSelector(monthSelectorId);
    const month = parseInt(monthSelector.selectedOptions[0].value);

    loadCalendar(getCalendarElement(calendarElementId), month + 1, year);
}