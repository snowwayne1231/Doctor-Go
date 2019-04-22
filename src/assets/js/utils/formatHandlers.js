import config from 'src/config-env';
import { orderBy } from 'lodash';

export function replaceObject(origin, next, {createNew} = {createNew: false}) {
    const result = createNew ? {...origin} :  origin;
    Object.keys(next).map(key => {
        if (result.hasOwnProperty(key) && next[key]) {
            result[key] = next[key];
        }
    });
    return result;
}

export function getServerImage(uri) {
    return uri ? `${config.mainServerURL}upload/${uri}` : null;
}

export function getServerApiUploadedImage(id) {
    return `${config.mainServerURL}api/image/${id}`;
}

export function generalSortArray(ary) {
    return orderBy(ary, ['sort', 'id'], ['desc', 'asc']);
}

export function generalParseServerImageArray(ary) {
    return ary.map(e => { e.image = getServerImage(e.image); return e; });
}

export function arrayMapBy(array, col, isAlwaysArray) {
    const map = {};
    array.map(a => {
        const key = a[col];
        if (key) {
            if (isAlwaysArray) {
                if (map[key]) {
                    map[key].push(a);
                } else {
                    map[key] = [a];
                }
            } else {
                map[key] = a;
            }
        }
    });
    return map;
}

