import { DateHelper, WeekDayConfig } from "./date-helper.js";
import { DomHelper } from "./dom-helper.js";

export class Calendar {
    constructor(private locale = 'de', private maxYears = 2000) { }

    loadYears(select: HTMLSelectElement): void {
        const year: number = DateHelper.getCurrentYear();

        for (let next = year; next >= this.maxYears; next--) {
            const yearString = next.toString();
            DomHelper.appendOptionToSelect(select, yearString, yearString);
        }
    }

    loadMonths(select: HTMLSelectElement): void {
        const months = DateHelper.getMonths(this.locale);


        months.forEach((month, index) => {
            DomHelper.appendOptionToSelect(select, index.toString(), month);
        });

        select.selectedIndex = DateHelper.getCurrentMonth() - 1;
    }

    loadCalendar(config: CalendarConfig): void {
        const days = DateHelper.getDays(config.month, config.year, this.locale);
        const today = new Date();
        const isCurrentYear = today.getFullYear() == config.year;
        const isCurrentMonth = isCurrentYear && today.getMonth() == config.month - 1;

        config.element.innerHTML = '';

        days.forEach(day => config.element.appendChild(this.getDayElement(day, isCurrentMonth, today.getDate())));
    }

    private getDayElement(day: WeekDayConfig, isCurrentMonth: boolean, currentDay?: number): HTMLDivElement {
        const div = document.createElement('div');
        div.classList.add('calendar-day');

        if (isCurrentMonth && currentDay == day.dayNumber) {
            div.classList.add('today');
        }

        const weekDay = document.createElement('div');
        weekDay.classList.add('calendar-day-name');
        weekDay.innerText = day.dayName;
        div.appendChild(weekDay);

        const dayNumber = document.createElement('div');
        dayNumber.classList.add('calendar-day-number');
        dayNumber.innerText = day.dayNumber.toString();
        div.appendChild(dayNumber);

        return div;
    }
}

export interface CalendarConfig {
    element: HTMLElement;
    month: number;
    year: number;
}