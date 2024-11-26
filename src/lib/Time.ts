export const formatFullDate = (timestamp: number): string => {
    return new Intl.DateTimeFormat('es-CO', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    }).format(timestamp)
}

export const getMonthFromTimestamp = (timestamp: number, includeYear?: boolean): string => {
    const formattedMonth = new Intl.DateTimeFormat('es-CO', {
        month: 'long',
        year: includeYear ? 'numeric' : undefined
    }).format(new Date(timestamp));

    return formattedMonth.charAt(0).toUpperCase() + formattedMonth.slice(1);
}

export const getDayFromTimestamp = (timestamp: number): string => {
    return new Intl.DateTimeFormat('es-CO', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    }).format(timestamp);
}

export const getStartOfWeek = (timestamp: number): Date => {
    const date = new Date(timestamp);
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
}
