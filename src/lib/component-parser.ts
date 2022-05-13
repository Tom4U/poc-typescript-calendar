import { Component } from './component.js';
import { ComponentRegistry } from './component-registry.js';
import { TemplateTag } from './template-tag.js';

export class ComponentParser {
    constructor(private componentRegistry: ComponentRegistry) {}

    public async loadComponents(element: HTMLElement): Promise<void> {
        for (const child of element.children) {
            if (this.isComponent(child.tagName.toLowerCase())) {
                await this.replaceTagWithComponent(child, element);
            }

            if (child.childElementCount > 0) await this.loadComponents(<HTMLElement>child);
        }
    }

    private isComponent(selector: string): boolean {
        const searchResult = this.componentRegistry.getComponentBySelector(selector);

        if (!searchResult) return false;

        return true;
    }

    private async replaceTagWithComponent(child: Element, parent: HTMLElement): Promise<void> {
        const component = this.componentRegistry.getComponentBySelector(child.tagName.toLowerCase());

        if (!component) return;

        let template = await component.getTemplate();
        const styles = await component.getStyles();

        template = this.replaceTemplateTags(component, template);

        await this.addComponentToDOM(template, component, parent, child);
        if (styles.length > 0) this.addStylesToDOM(styles);
    }

    private async addComponentToDOM(template: string, component: Component, parent: HTMLElement, child: Element) {
        const div = document.createElement('div');
        div.innerHTML = template;
        div.id = component.config.selector;

        if (div.childElementCount > 0) await this.loadComponents(div);

        parent.replaceChild(div, child);
    }

    private addStylesToDOM(styles: string): void {
        let styleElement: HTMLStyleElement;
        const existingStyleElement = document.head.querySelector('style');

        if (!existingStyleElement) {
            styleElement = document.createElement('style');
            styleElement.innerHTML = styles;
            document.head.appendChild(styleElement);
        } else {
            existingStyleElement.innerHTML += styles;
        }
    }

    private replaceTemplateTags(component: Component, template: string): string {
        const tags = this.extractTemplateTags(template);

        tags.forEach((tag) => {
            template = this.replaceTemplateTag(tag, template, component);
        });

        return template;
    }

    private extractTemplateTags(template: string): TemplateTag[] {
        const tags: TemplateTag[] = [];

        const results = template.matchAll(/{{\s*([^\s]+)\s*}}/g);

        for (const tag of results) {
            tags.push({ template: tag[0], property: tag[1] });
        }

        return tags;
    }

    private replaceTemplateTag(tag: TemplateTag, template: string, component: Component): string {
        const propertyValue = this.getPropertyValue(tag.property, component);

        template = template.replace(tag.template, propertyValue);

        return template;
    }

    private getPropertyValue(property: string, object: any): string {
        const indexOfDot = property.indexOf('.');

        if (indexOfDot > -1) {
            const newPropertyName = property.substring(0, indexOfDot);
            const newProperty = property.substring(indexOfDot + 1);
            return this.getPropertyValue(newProperty, object[newPropertyName]);
        }

        const propertyValue = object[property];

        if (!propertyValue) return `[ERROR]: Component does not provide a property named ${property}`;

        return propertyValue;
    }
}
