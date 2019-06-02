/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { isWindowClosed, type CrossDomainWindowType, type SameDomainWindowType } from 'cross-domain-utils/src';

export function onWindowOpen({ win = window, time = 500 } : { win? : SameDomainWindowType, time? : number } = {}) : ZalgoPromise<CrossDomainWindowType> {
    return new ZalgoPromise((resolve, reject) => {

        const winOpen = window.open;
        const documentCreateElement = win.document.createElement;

        const reset = () => {
            win.open = winOpen;
            win.document.createElement = documentCreateElement;
        };

        win.open = function patchedWindowOpen() : CrossDomainWindowType {
            const popup = winOpen.apply(this, arguments);
            reset();
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
