/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';

export type ProxyObject<T> = {|
    get : () => ZalgoPromise<T>
|};

export function getProxyObject<T>(obj : T) : ProxyObject<T> {
    return {
        get() : ZalgoPromise<T> {
            return ZalgoPromise.try(() => {
                if (this.source && this.source !== window) {
                    throw new Error(`Can not call get on proxy object from a remote window`);
                }
    
                return obj;
            });
        }
    };
}
