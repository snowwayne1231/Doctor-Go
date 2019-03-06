

export function replaceObject(origin, next, {createNew} = {createNew: false}) {
    const result = createNew ? {...origin} :  origin;
    Object.keys(next).map(key => {
        if (result.hasOwnProperty(key)) {
            result[key] = next[key];
        }
    });
    return result;
}


