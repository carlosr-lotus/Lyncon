type DayFunctions = {
    getDayOfWeek: (date: Date) => string
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

export const day: DayFunctions = {
    getDayOfWeek: getDayOfWeek
}