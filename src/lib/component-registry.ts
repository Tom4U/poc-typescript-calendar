import { Component } from './component.js';
import { ServiceContainer } from './service-container.js';

export class ComponentRegistry {
    private registeredComponents: ComponentRegistryItem<Component>[] = [];

    public registerComponent<TComponent extends Component>(componentRegistryItem: ComponentRegistryItem<TComponent>): void {
        this.registeredComponents.push(componentRegistryItem);

        componentRegistryItem.instance.registerComponents();
    }

    public getComponentBySelector<TComponent extends Component>(selector: string): TComponent {
        const instance = this.registeredComponents.find((c) => c.instance.config.selector == selector)?.instance;
        return <TComponent>instance;
    }

    public getComponentByType<TComponent extends Component>(componentType: {
        new (registry: ComponentRegistry, serviceContainer: ServiceContainer): TComponent;
    }): TComponent {
        return <TComponent>this.registeredComponents.find((c) => c.type === componentType)?.instance;
    }

    public getAllComponents(): ComponentRegistryItem<Component>[] {
        return this.registeredComponents;
    }
}

export class ComponentRegistryItem<TComponent extends Component> {
    constructor(
        public type: { new (registry: ComponentRegistry, serviceContainer: ServiceContainer): TComponent },
        public instance: TComponent
    ) {}
}
