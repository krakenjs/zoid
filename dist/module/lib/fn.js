export function getCurrentScriptDir() {
    // eslint-disable-next-line no-console
    console.warn('Do not use zoid.getCurrentScriptDir() in production -- browser support is limited');

    // eslint-disable-next-line compat/compat
    if (document.currentScript) {
        // eslint-disable-next-line compat/compat
        return document.currentScript.src.split('/').slice(0, -1).join('/');
    }

    return '.';
}