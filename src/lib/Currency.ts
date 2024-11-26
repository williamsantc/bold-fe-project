export const formatCurrency = (amount?: number): string => {
    if (!amount) {
        return '';
    }

    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
    }).format(amount);
};
