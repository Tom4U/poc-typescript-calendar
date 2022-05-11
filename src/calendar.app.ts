import { App } from "./app.js";
import { Calendar } from "./calendar.js";
import { DateHelper } from "./date-helper.js";
import { DomHelper } from "./dom-helper.js";

export class CalendarApp extends App {
    private readonly calendar = new Calendar();
    private readonly calendarElementId = 'calendar';
    private readonly yearSelectorId = 'year-selector';
    private readonly monthSelectorId = 'month-selector';

    protected header = `
    <nav class="selectors">
        <select name="year" id="${this.yearSelectorId}" class="selector"></select>
        <select name="month" id="${this.monthSelectorId}" class="selector"></select>
    </nav>
    `;

    protected content = `<section id="${this.calendarElementId}" class="calendar"></section>`;

    public start(): void {
        super.start();
        this.init();
    }

    private init(): void {
        this.initSelectors();

        this.calendar.loadCalendar(
            {
                element: DomHelper.getElement(this.calendarElementId),
                month: DateHelper.getCurrentMonth(),
                year: DateHelper.getCurrentYear()
            });
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
            element: DomHelper.getElement(this.calendarElementId),
            month,
            year
        });
    }
}