import { Component } from '../../../lib/component.js';

export class TestChildComponent extends Component {
    config = {
        selector: 'test-child',
        template: 'test-child.component.html',
        style: `
            .test-child {
                font-size: 2rem;
                color: blue;
            }
        `
    };

    testChildProperty = 'Property in test-child';
}
