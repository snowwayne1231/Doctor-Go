

export function toThousandPlaced(number){
    const next = String(parseDecimalPoint(number, 3))
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return next;
}

export function parseDecimalPoint(number, digits = 2) {
    const pow = Math.pow(10, digits);
    return Math.round(number * pow) / pow;
}

