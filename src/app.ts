import { DomHelper } from "./dom-helper.js";

export class App {
    protected readonly year = new Date().getFullYear().toString();
    protected copyright = `&copy; ${this.year} by me :)`;
    
    protected header = `<nav>Demo Navigation</nav>`;    
    protected content = `<p>Demo Content</p>`;
    protected footer = `<span>{{copyright}}</span>`;

    constructor(private readonly appTitle: string, private readonly appId = 'app') {}

    public start(): void {
        this.renderTemplateTags();
        
        document.title = this.appTitle;

        console.log('App gestartet');
    }

    protected renderTemplateTags(): void {
        const element = DomHelper.getElement(this.appId);
        
        this.header = this.replaceTemplateTags(this.extractTemplateTags(this.header), this.header);
        this.content = this.replaceTemplateTags(this.extractTemplateTags(this.content), this.content);
        this.footer = this.replaceTemplateTags(this.extractTemplateTags(this.footer), this.footer);
        element.innerHTML = this.replaceTemplateTags(this.extractTemplateTags(element.innerHTML), element.innerHTML);        
    }

    private extractTemplateTags(html: string): string[] {
        const tags: string[] = [];

        const results = html.matchAll(/{{[a-z0-9A-Z]+}}/g);
        
        for (const tag of results) {
            tags.push(tag[0]);
        }

        return tags;
    }

    private replaceTemplateTags(tags: string[], html: string): string {
        tags.forEach(tag => {
            html = this.replaceTemplateTag(tag, html);
        });

        return html;
    }

    private replaceTemplateTag(tag: string, html: string): string {
        const property = tag.replace('{{', '').replace('}}', '');

        if (this.hasOwnProperty(property)) {
            html = html.replace(tag, (<any>this)[property]);
        }

        return html;
    }
}