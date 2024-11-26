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

export const getMonthFromTimestamp = (timestamp: number): string => {
    const formattedMonth = new Intl.DateTimeFormat('es-CO', {
        month: 'long',
    }).format(new Date(timestamp));

    return formattedMonth.charAt(0).toUpperCase() + formattedMonth.slice(1);
}
