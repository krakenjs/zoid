
export function isPerc(str) {
    return typeof str === 'string' && (/^[0-9]+%$/).test(str);
}

export function isPx(str) {
    return typeof str === 'string' && (/^[0-9]+px$/).test(str);
}

export function isCSS(str) {
    return isPerc(str) || isPx(str);
}

export function isNum(num) {
    return typeof num === 'number';
}

export function toNum(str) {
    return isNum(str) ? str : parseInt(str.match(/^([0-9]+)(px|%)$/)[1], 10);
}

export function toPx(num) {
    return `${toNum(num)}px`;
}

export function toPerc(num) {
    return `${toNum(num)}%`;
}

export function toCSS(num) {
    return isPerc(num) ? num : toPx(num);
}

export function mathCSS(num, action) {
    return isPerc(num) ? toPerc(action(toNum(num))) : toPx(Math.floor(action(toNum(num))));
}

export function percOf(num, perc) {
    return parseInt(num * toNum(perc)  / 100, 10);
}

export function normalizeDimension(dim, max) {
    if (isPerc(dim)) {
        return percOf(max, dim);
    } else if (isPx(dim)) {
        return toNum(dim);
    }
}