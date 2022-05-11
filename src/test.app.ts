import { App } from "./app.js";

export class TestApp extends App {
    private readonly testValue = 'Test!';

    protected content = `
        <p>Test App works!</p>
        <p>Some Property: {{testValue}}</p>
    `;

    public start(): void {
        this.copyright = this.copyright.replace('by me', 'by Testman');

        super.start();
    }
}