const CURRENCY_FORMATTEUR = new Intl.NumberFormat(undefined, {
    currency: "EUR", style: "currency"
});

export function formatCurrency(number: number): string {
    return CURRENCY_FORMATTEUR.format(number);
}
