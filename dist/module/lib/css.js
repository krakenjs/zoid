'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isPerc = isPerc;
exports.isPx = isPx;
exports.toNum = toNum;
exports.toPx = toPx;
exports.toCSS = toCSS;
exports.percOf = percOf;
exports.normalizeDimension = normalizeDimension;
function isPerc(str) {
    return typeof str === 'string' && /^[0-9]+%$/.test(str);
}

function isPx(str) {
    return typeof str === 'string' && /^[0-9]+px$/.test(str);
}

function toNum(val) {

    if (typeof val === 'number') {
        return val;
    }

    var match = val.match(/^([0-9]+)(px|%)$/);

    if (!match) {
        throw new Error('Could not match css value from ' + val);
    }

    return parseInt(match[1], 10);
}

function toPx(val) {
    return toNum(val) + 'px';
}

function toCSS(val) {

    if (typeof val === 'number') {
        return toPx(val);
    }

    return isPerc(val) ? val : toPx(val);
}

function percOf(num, perc) {
    return parseInt(num * toNum(perc) / 100, 10);
}

function normalizeDimension(dim, max) {
    if (typeof dim === 'number') {
        return dim;
    } else if (isPerc(dim)) {
        return percOf(max, dim);
    } else if (isPx(dim)) {
        return toNum(dim);
    } else {
        throw new Error('Can not normalize dimension: ' + dim);
    }
}