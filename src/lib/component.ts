import { ComponentConfig } from './component-config.js';
import { ComponentRegistry, ComponentRegistryItem } from './component-registry.js';
import { ServiceContainer } from './service-container.js';

export abstract class Component {
    abstract config: ComponentConfig;

    protected components: ComponentRegistryItem<Component>[] = [];

    constructor(protected componentRegistry: ComponentRegistry, protected serviceContainer: ServiceContainer) {}

    public registerComponents() {
        this.components.forEach((component) => this.componentRegistry.registerComponent(component));
    }

    public async getTemplate(): Promise<string> {
        if (!this.config.template.endsWith('.html')) return this.config.template;

        return await this.getTemplateFromFile();
    }

    public async getStyles(): Promise<string> {
        if (!this.config.style.endsWith('.css')) return this.config.style;

        return await this.getStylesFromFile();
    }

    public componentLoaded(): void {}

    protected async getTemplateFromFile(): Promise<string> {
        return await this.getComponentFileContent(this.config.template);
    }

    protected async getStylesFromFile(): Promise<string> {
        return await this.getComponentFileContent(this.config.style);
    }

    private async getComponentFileContent(file: string): Promise<string> {
        const path = this.getComponentFilePath(file);
        const requestResult = await fetch(path);

        if (requestResult.ok) {
            const template = await requestResult.text();
            return template;
        }

        return '';
    }

    private getComponentFilePath(file: string): string {
        const name = this.getComponentFileName(this.constructor.name);
        const folder = this.getComponentPath(name);
        const path = `components/${folder}/${file}`;

        return path;
    }

    private getComponentFileName(componentName: string): string {
        const namePartsPattern = /([A-Z][a-z]+)/g;
        const nameParts = componentName.matchAll(namePartsPattern);
        let name = '';

        for (const namePart of nameParts) {
            if (namePart[0].toLowerCase() == 'component') break;

            name = name.length > 0 ? `${name}-${namePart[0]}` : namePart[0];
        }

        return name.toLowerCase();
    }

    private isSubComponent(componentName: string) {
        return componentName.indexOf('-') > -1;
    }

    private getComponentPath(componentName: string): string {
        if (!this.isSubComponent(componentName)) return componentName;

        const parts = componentName.split('-');
        let path = '';

        for (let index = 0; index < parts.length; index++) {
            const part = parts[index];

            if (index + 1 == parts.length) break;

            path += `${part}/`;
        }

        return `${path}${componentName}`;
    }
}
