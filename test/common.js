/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { isWindowClosed, type CrossDomainWindowType } from 'cross-domain-utils/src';

export function onWindowOpen({ time = 500 } : { time? : number } = {}) : ZalgoPromise<CrossDomainWindowType> {
    return new ZalgoPromise((resolve, reject) => {

        let winOpen = window.open;
        let documentCreateElement = document.createElement;

        let reset = () => {
            window.open = winOpen;
            // $FlowFixMe
            document.createElement = documentCreateElement;
        };

        window.open = function patchedWindowOpen() : CrossDomainWindowType {
            let win = winOpen.apply(this, arguments);
            reset();
            resolve(win);
            return win;
        };

        // $FlowFixMe
        document.createElement = function docCreateElement(tagName) : HTMLElement {
            let el = documentCreateElement.apply(this, arguments);

            if (tagName && tagName.toLowerCase() === 'iframe') {

                let interval;
                let timeout;

                interval = setInterval(() => {
                    // $FlowFixMe
                    if (el.contentWindow) {
                        reset();
                        clearTimeout(timeout);
                        clearInterval(interval);
                        // $FlowFixMe
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
    }).then(win => {

        if (!win || isWindowClosed(win)) {
            throw new Error(`Expected win to be open`);
        }

        return win;
    });
}
