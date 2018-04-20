/* @flow */

export function isPerc(str : string) : boolean {
    return typeof str === 'string' && (/^[0-9]+%$/).test(str);
}

export function isPx(str : string) : boolean {
    return typeof str === 'string' && (/^[0-9]+px$/).test(str);
}

export function toNum(val : string | number) : number {

    if (typeof val === 'number') {
        return val;
    }

    let match = val.match(/^([0-9]+)(px|%)$/);

    if (!match) {
        throw new Error(`Could not match css value from ${ val }`);
    }

    return parseInt(match[1], 10);
}

export function toPx(val : number | string) : string {
    return `${ toNum(val) }px`;
}

export function toCSS(val : number | string) : string {

    if (typeof val === 'number') {
        return toPx(val);
    }

    return isPerc(val) ? val : toPx(val);
}

export function percOf(num : number, perc : string) : number {
    return parseInt(num * toNum(perc)  / 100, 10);
}

export function normalizeDimension(dim : string | number, max : number) : number {
    if (typeof dim === 'number') {
        return dim;
    } else if (isPerc(dim)) {
        return percOf(max, dim);
    } else if (isPx(dim)) {
        return toNum(dim);
    } else {
        throw new Error(`Can not normalize dimension: ${ dim }`);
    }
}
