import { Calendar } from "./calendar.js";
import { DateHelper } from "./date-helper.js";
import { DomHelper } from "./dom-helper.js";

export class CalendarApp {
    private readonly calendar = new Calendar();

    constructor(
        private readonly yearSelectorId: string,
        private readonly monthSelectorId: string,
        private readonly calendarElementId: string) {
        this.init();
    }

    private init(): void {
        console.log('App gestartet');

        this.initSelectors();

        this.calendar.loadCalendar(
            {
                element: DomHelper.getCalendarElement(this.calendarElementId),
                month: DateHelper.getCurrentMonth(),
                year: DateHelper.getCurrentYear()
            });

        DomHelper.updateCopyrightYear();
    }

    private initSelectors(): void {
        this.initYearSelector();
        this.initMonthSelector();
    }

    private initYearSelector(): void {
        const selector = DomHelper.getSelect(this.yearSelectorId);

        this.addSelectorChangeListener(selector, (year) => this.updateYear(year));

        this.calendar.loadYears(selector);
    }

    private initMonthSelector(): void {
        const selector = DomHelper.getSelect(this.monthSelectorId);

        this.addSelectorChangeListener(selector, (month) => this.updateMonth(month));

        this.calendar.loadMonths(selector);
    }

    private addSelectorChangeListener(selector: HTMLSelectElement, callback: (selectedValue: number) => void) {
        selector.addEventListener('change', (event: Event) => {
            const element = <HTMLSelectElement>event.currentTarget;
            const selectedValue = parseInt(element.selectedOptions[0].value) + 1;

            callback(selectedValue);
        });
    }

    private updateMonth(month: number): void {
        const yearSelector = DomHelper.getSelect(this.yearSelectorId);
        const selectedYear = parseInt(yearSelector.selectedOptions[0].value);

        this.loadCalendar(month, selectedYear);
    }

    private updateYear(year: number): void {
        const monthSelector = DomHelper.getSelect(this.monthSelectorId);
        const selectedMonth = parseInt(monthSelector.selectedOptions[0].value);

        this.loadCalendar(selectedMonth + 1, year);
    }

    private loadCalendar(month: number, year: number) {
        this.calendar.loadCalendar({
            element: DomHelper.getCalendarElement(this.calendarElementId),
            month,
            year
        })
    }
}