import { App } from "./app.js";
import { CalendarApp } from "./calendar.app.js";
import { TestApp } from "./test.app.js";

document.addEventListener('DOMContentLoaded', () => {
    new App('Demo App').start();
    //new TestApp('Test App').start();
    //new CalendarApp('Kalender').start();
});



