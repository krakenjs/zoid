/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { isWindowClosed, type CrossDomainWindowType, type SameDomainWindowType } from 'cross-domain-utils/src';
import { createElement, destroyElement } from 'belter/src';

export function onWindowOpen({ win = window, time = 500 } : { win? : SameDomainWindowType, time? : number } = {}) : ZalgoPromise<SameDomainWindowType> {
    return new ZalgoPromise((resolve, reject) => {

        const winOpen = win.open;
        const documentCreateElement = win.document.createElement;
        
        const reset = () => {
            win.document.createElement = documentCreateElement;
        };

        win.open = function patchedWindowOpen() : CrossDomainWindowType {
            const popup = winOpen.apply(this, arguments);
            resolve(popup);
            return popup;
        };

        // $FlowFixMe
        document.createElement = function docCreateElement(tagName) : HTMLElement {
            const el = documentCreateElement.apply(this, arguments);

            if (tagName && tagName.toLowerCase() === 'iframe') {

                // eslint-disable-next-line prefer-const
                let timeout;

                const interval = setInterval(() => {
                    if (el.contentWindow) {
                        reset();
                        clearTimeout(timeout);
                        clearInterval(interval);
                        resolve(el.contentWindow);
                    }
                }, 10);

                timeout = setTimeout(() => {
                    clearInterval(interval);
                    return reject(new Error(`Window not opened in ${ time }ms`));
                }, time);
            }

            return el;
        };
    }).then(openedWindow => {

        if (!openedWindow || isWindowClosed(openedWindow)) {
            throw new Error(`Expected win to be open`);
        }

        return openedWindow;
    });
}

let isClick = false;
let clickTimeout;

function doClick() {
    isClick = true;

    clearTimeout(clickTimeout);
    clickTimeout = setTimeout(() => {
        isClick = false;
    }, 1);
}


const HTMLElementClick = window.HTMLElement.prototype.click;
window.HTMLElement.prototype.click = function overrideHTMLElementClick() : void {
    doClick();
    return HTMLElementClick.apply(this, arguments);
};

const windowOpen = window.open;
window.open = function patchedWindowOpen() : CrossDomainWindowType {

    if (!isClick) {
        const win : Object = {
            closed: true,
            close() {
                // pass
            },
            location: {
                href:     '',
                pathname: '',
                protocol: '',
                host:     '',
                hostname: ''
            }
        };

        win.parent = win.top = win;
        win.opener = window;

        return win;
    }

    return windowOpen.apply(this, arguments);
};

export function runOnClick<T>(handler : () => T) : T {
    const testButton = createElement('button', { id: 'testButton' }, document.body);
    let didError = false;
    let result;
    let error;
    testButton.addEventListener('click', () => {
        try {
            result = handler();
        } catch (err) {
            didError = true;
            error = err;
        }
    });
    testButton.click();
    destroyElement(testButton);
    if (didError) {
        throw error;
    } else {
        // $FlowFixMe
        return result;
    }
}
