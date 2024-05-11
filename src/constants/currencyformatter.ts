export const formatPrice = (amount: number): string => {
    return Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
    }).format(amount);
}