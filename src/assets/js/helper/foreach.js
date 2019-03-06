
export default function (a, b) {
    const newArray = [];
    const hasFunc = typeof b === 'function';
    const fnc = b;
    if (Number.isInteger(a.length)) {
        for(let i = 0; i < a.length; i += 1) {
            const loc = a[i];
            if (hasFunc) {
                const res = fnc(loc, i);
                if (res === 'break') {
                    break;
                }
                newArray.push(res || loc);
            } else {
                newArray.push(loc);
            }
        }
    }
    return newArray;
}
