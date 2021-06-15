import _ from 'lodash';

export const parseObjectKeysToCamelCase = (row: Record<string, any>) => {
    let key,
        keys = Object.keys(row);
    let n = keys.length;
    let newObj: Record<string, any> = {};
    while (n--) {
        key = keys[n];
        newObj[_.camelCase(key)] = row[key];
    }

    return newObj;
};
