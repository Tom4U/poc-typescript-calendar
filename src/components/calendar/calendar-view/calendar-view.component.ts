import { ComponentConfig } from '../../../lib/component-config.js';
import { Component } from '../../../lib/component.js';
import { DateHelper } from '../../../lib/date-helper.js';
import { DomHelper } from '../../../lib/dom-helper.js';
import { Calendar } from '../calendar.js';

export class CalendarViewComponent extends Component {
    config: ComponentConfig = {
        selector: 'calendar-view',
        template: 'calendar-view.component.html',
        style: 'calendar-view.component.css'
    };

    private readonly calendarElementId = 'calendar-view';
    private calendar?: Calendar;

    public registerComponents(): void {
        this.calendar = this.serviceContainer.getService(Calendar);

        super.registerComponents();
    }

    public loadCalendar(year?: number, month?: number): void {
        this.calendar?.loadCalendar({
            element: DomHelper.getElement(this.calendarElementId),
            month: month ? month : DateHelper.getCurrentMonth(),
            year: year ? year : DateHelper.getCurrentYear()
        });
    }
}
