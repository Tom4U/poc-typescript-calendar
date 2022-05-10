export function getCurrentYear(): number {
    const date = new Date();

    return date.getFullYear();
}

export function getCurrentMonth(): number {
    const date = new Date();

    return date.getMonth() + 1;
}

export function getMonths(locale: string): string[] {
    const months = 
        [...Array(12).keys()]
        .map(
            key => new Date(0, key)
                   .toLocaleString(locale, { month: 'long' })
            )
    
    return months;
}

export function getMaxDaysOfMonth(month: number, year: number): number {
    const date = new Date(year, month, 0);

    return date.getDate();
}

export function getDays(month: number, year: number, locale: string): [number, string][] {
    const days: [number, string][] = [];
    const maxDays = getMaxDaysOfMonth(month, year);

    for (let day = 1; day <= maxDays; day++) {
        const weekDay = new Date(year, month - 1, day).toLocaleDateString(locale, { weekday: 'long' });
        
        days.push([day, weekDay]);
    }

    return days;
}