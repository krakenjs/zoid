/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { toCSS } from 'belter/src';

export type ProxyElement = {|
    resize : ({ width : ?number, height : ?number }) => void,
    getElement : () => ZalgoPromise<HTMLElement>
|};

export function getProxyElement(element : HTMLElement) : ProxyElement {
    return {
        resize({ width, height } : { width : ?number, height : ?number }) {
            if (typeof width === 'number') {
                element.style.width = toCSS(width);
            }
    
            if (typeof height === 'number') {
                element.style.height = toCSS(height);
            }
        },

        getElement() : ZalgoPromise<HTMLElement> {
            return ZalgoPromise.try(() => {
                if (this.source && this.source !== window) {
                    throw new Error(`Can not call getElement from a remote window`);
                }
    
                return element;
            });
        }
    };
}
