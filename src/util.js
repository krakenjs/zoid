
export function urlEncode(str) {
    return str.replace(/\?/g, '%3F').replace(/\&/g, '%26');
}

export function camelToDasherize(string) {
    return string.replace(/([A-Z])/g, function (g) {
        return `-${g.toLowerCase()}`;
    });
}

export function dasherizeToCamel(string) {
    return string.replace(/-([a-z])/g, function (g) {
        return g[1].toUpperCase();
    });
}

export function noop() {
    // pass
}