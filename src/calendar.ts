import { getCurrentMonth, getCurrentYear, getDays, getMonths } from "./date-helper.js";
import { appendOptionToSelect } from "./dom-helper.js";

const locale = 'de';
const maxYears = 2000;

export function loadYears(select: HTMLSelectElement): void {
    const year: number = getCurrentYear();

    for (let next = year; next >= maxYears; next--) {
        const yearString = next.toString();
        appendOptionToSelect(select, yearString, yearString);
    }
}

export function loadMonths(select: HTMLSelectElement): void {
    const months = getMonths(locale);

    
    months.forEach((month, index) => {
        appendOptionToSelect(select, index.toString(), month);
    });

    select.selectedIndex = getCurrentMonth() - 1;
}

export function loadCalendar(element: HTMLElement, month: number, year: number): void {
    const days = getDays(month, year, locale);
    const today = new Date();
    const isCurrentYear = today.getFullYear() == year;
    const isCurrentMonth = isCurrentYear && today.getMonth() == month -1;

    element.innerHTML = '';

    days.forEach(day => element.appendChild(getDayElement(day, isCurrentMonth, today.getDate())));
}

function getDayElement(day: [number, string], isCurrentMonth: boolean, currentDay?: number): HTMLDivElement {
    const div = document.createElement('div');
    div.classList.add('calendar-day');

    if (isCurrentMonth && currentDay == day[0]) {
        div.classList.add('today');
    }

    const weekDay = document.createElement('div');
    weekDay.classList.add('calendar-day-name');
    weekDay.innerText = day[1];
    div.appendChild(weekDay);

    const dayNumber = document.createElement('div');
    dayNumber.classList.add('calendar-day-number');
    dayNumber.innerText = day[0].toString();
    div.appendChild(dayNumber);

    return div;
}