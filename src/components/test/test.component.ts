import { ComponentRegistryItem } from '../../lib/component-registry.js';
import { Component } from '../../lib/component.js';
import { TestChildComponent } from './test-child/test-child.component.js';

export class TestComponent extends Component {
    config = {
        selector: 'test',
        template: 'test.component.html', //<p>TEST WORKS</p>
        style: 'test.component.css'
    };

    stringProperty = 'Eine String Property';
    protected protectedProperty = 'Eine Protected Property';
    private privateProperty = 'Eine Private Property';
    #strictPrivateProperty = 'Eine ECMAScript Strict Private Property';
    objectProperty = { key: 'Wert von objectProperty.key' };

    public registerComponents(): void {
        // Könnte optional auch in der index.ts registriert werden
        this.components.push(
            new ComponentRegistryItem(TestChildComponent, new TestChildComponent(this.componentRegistry, this.serviceContainer))
        );
    }
}
