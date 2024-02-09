type DayFunctions = {
    getDayOfWeek: (date: Date) => string,
    today: () => Date,
    tomorrow: (date?: Date) => Date,
    yesterday: (date?: Date) => Date,
}

function getDayOfWeek(date: Date): string {
    const days: string[] = [
        'Domingo',
        'Segunda-feira',
        'Terça-feira',
        'Quarta-feira',
        'Quinta-feira',
        'Sexta-feira',
        'Sábado'
    ];

    return days[date.getDay()];
}

function yesterday(date?: Date): Date {
    const yesterday = new Date(date?.getTime() ?? new Date().getTime());
    yesterday.setDate(
        (date?.getDate() ?? new Date().getDate()) - 1
    );

    return yesterday;
}

function today(): Date {
    return new Date();
}

function tomorrow(date?: Date): Date {
    const tomorrow = new Date(date?.getTime() ?? new Date().getTime());
    tomorrow.setDate(
        (date?.getDate() ?? new Date().getDate()) + 1
    );

    return tomorrow;
}

const Day: DayFunctions = {
    getDayOfWeek: getDayOfWeek,
    yesterday: yesterday,
    tomorrow: tomorrow,
    today: today
}

export default Day;