import { CalendarApp } from "./calendar.app.js";

const yearSelectorId = 'year-selector';
const monthSelectorId = 'month-selector';
const calendarElementId = 'calendar';

document.addEventListener('DOMContentLoaded', () => {
    new CalendarApp(
        yearSelectorId,
        monthSelectorId,
        calendarElementId
    )
});



