export class DateHelper {
    static getCurrentYear(): number {
        const date = new Date();
    
        return date.getFullYear();
    }
    
    static getCurrentMonth(): number {
        const date = new Date();
    
        return date.getMonth() + 1;
    }
    
    static getMonths(locale: string): string[] {
        const months = 
            [...Array(12).keys()]
            .map(
                key => new Date(0, key)
                       .toLocaleString(locale, { month: 'long' })
                )
        
        return months;
    }
    
    static getMaxDaysOfMonth(month: number, year: number): number {
        const date = new Date(year, month, 0);
    
        return date.getDate();
    }
    
    static getDays(month: number, year: number, locale: string): WeekDayConfig[] {
        const days: WeekDayConfig[] = [];
        const maxDays = this.getMaxDaysOfMonth(month, year);
    
        for (let dayNumber = 1; dayNumber <= maxDays; dayNumber++) {
            const dayName = new Date(year, month - 1, dayNumber).toLocaleDateString(locale, { weekday: 'long' });
            
            days.push({dayNumber, dayName});
        }
    
        return days;
    }
}

export interface WeekDayConfig {
    dayNumber: number;
    dayName: string;
}