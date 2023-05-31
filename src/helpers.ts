// create a currency formatter function
export const currencyFormatter = (value: number) => {   
    return new Intl.NumberFormat(undefined, {
        style: 'currency',
        currencyDisplay: 'narrowSymbol',
        currency: 'USD',
        minimumFractionDigits: 0,
    }).format(value);
}
