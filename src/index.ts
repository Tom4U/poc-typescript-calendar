import { CalendarComponent } from './components/calendar/calendar.component.js';
import { TestComponent } from './components/test/test.component.js';
import { ComponentParser } from './lib/component-parser.js';
import { ComponentRegistry, ComponentRegistryItem } from './lib/component-registry.js';
import { ServiceContainer } from './lib/service-container.js';

document.addEventListener('DOMContentLoaded', () => {
    const componentRegistry = new ComponentRegistry();
    const componentParser = new ComponentParser(componentRegistry);
    const serviceContainer = new ServiceContainer();

    //componentRegistry.registerComponent(new ComponentRegistryItem(TestComponent, new TestComponent(componentRegistry, serviceContainer)));

    componentRegistry.registerComponent(
        new ComponentRegistryItem(CalendarComponent, new CalendarComponent(componentRegistry, serviceContainer))
    );

    componentParser.loadComponents(document.body).then(() => {
        componentRegistry.getAllComponents().forEach((component) => component.instance.componentLoaded());
        console.log('App gestartet');
    });
});
