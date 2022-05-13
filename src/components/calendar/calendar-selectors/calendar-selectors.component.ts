import { ComponentConfig } from '../../../lib/component-config.js';
import { Component } from '../../../lib/component.js';
import { DomHelper } from '../../../lib/dom-helper.js';
import { Calendar } from '../calendar.js';

export class CalendarSelectorsComponent extends Component {
    config: ComponentConfig = {
        selector: 'calendar-selectors',
        template: 'calendar-selectors.component.html',
        style: 'calendar-selectors.component.css'
    };

    selectorsChangedSubscribers: ((year: number, month: number) => void)[] = [];

    private readonly yearSelectorId = 'year-selector';
    private readonly monthSelectorId = 'month-selector';
    private calendar?: Calendar;

    public registerComponents(): void {
        this.calendar = this.serviceContainer.getService(Calendar);

        super.registerComponents();
    }

    public componentLoaded(): void {
        super.componentLoaded();

        this.initSelectors();
    }

    private initSelectors(): void {
        this.initYearSelector();
        this.initMonthSelector();
    }

    private initYearSelector(): void {
        const selector = DomHelper.getElement<HTMLSelectElement>(this.yearSelectorId);

        this.addSelectorChangeListener(selector, (year) => this.updateYear(year));

        this.calendar?.loadYears(selector);
    }

    private initMonthSelector(): void {
        const selector = DomHelper.getElement<HTMLSelectElement>(this.monthSelectorId);

        this.addSelectorChangeListener(selector, (month) => this.updateMonth(month + 1));

        this.calendar?.loadMonths(selector);
    }

    private addSelectorChangeListener(selector: HTMLSelectElement, callback: (selectedValue: number) => void) {
        selector.addEventListener('change', (event: Event) => {
            const element = <HTMLSelectElement>event.currentTarget;
            const selectedValue = parseInt(element.selectedOptions[0].value);

            callback(selectedValue);
        });
    }

    private updateMonth(month: number): void {
        const yearSelector = DomHelper.getElement<HTMLSelectElement>(this.yearSelectorId);
        const selectedYear = parseInt(yearSelector.selectedOptions[0].value);

        this.loadCalendar(month, selectedYear);
    }

    private updateYear(year: number): void {
        const monthSelector = DomHelper.getElement<HTMLSelectElement>(this.monthSelectorId);
        const selectedMonth = parseInt(monthSelector.selectedOptions[0].value);

        this.loadCalendar(selectedMonth + 1, year);
    }

    private loadCalendar(month: number, year: number) {
        this.selectorsChangedSubscribers.forEach((subscriber) => subscriber(year, month));
    }
}
