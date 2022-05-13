import { Component } from '../../lib/component.js';
import { ComponentConfig } from '../../lib/component-config.js';
import { Calendar } from './calendar.js';
import { CalendarSelectorsComponent } from './calendar-selectors/calendar-selectors.component.js';
import { CalendarViewComponent } from './calendar-view/calendar-view.component.js';
import { Service } from '../../lib/service-container.js';
import { ComponentRegistryItem } from '../../lib/component-registry.js';

export class CalendarComponent extends Component {
    config: ComponentConfig = {
        selector: 'calendar',
        style: 'calendar.component.css',
        template: 'calendar.component.html'
    };

    appTitle = 'Kalender';
    year = new Date().getFullYear().toString();

    private readonly calendar = new Calendar();

    public registerComponents(): void {
        document.title = this.appTitle;

        this.serviceContainer.addService(new Service(Calendar, this.calendar));

        super.registerComponents();

        this.componentRegistry.registerComponent(
            new ComponentRegistryItem(
                CalendarSelectorsComponent,
                new CalendarSelectorsComponent(this.componentRegistry, this.serviceContainer)
            )
        );
        this.componentRegistry.registerComponent(
            new ComponentRegistryItem(CalendarViewComponent, new CalendarViewComponent(this.componentRegistry, this.serviceContainer))
        );

        this.registerSubscribers();
    }

    public componentLoaded(): void {
        this.updateView();
    }

    private registerSubscribers(): void {
        const selectorsComponent = this.componentRegistry.getComponentByType(CalendarSelectorsComponent);

        selectorsComponent.selectorsChangedSubscribers.push((year, month) => this.updateView(year, month));
    }

    private updateView(year?: number, month?: number): void {
        const viewComponent = this.componentRegistry.getComponentBySelector('calendar-view') as CalendarViewComponent;
        viewComponent.loadCalendar(year, month);
    }
}
