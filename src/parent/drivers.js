/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { send, cleanUpWindow, ProxyWindow } from 'post-robot/src';
import { assertSameDomain } from 'cross-domain-utils/src';
import { iframe, popup, destroyElement, normalizeDimension, watchElementForClose,
    awaitFrameWindow, uniqueID } from 'belter/src';

import { CONTEXT } from '../constants';
import { getProxyElement, type ProxyElement } from '../lib';


export type ContextDriverType = {|
    openOnClick : boolean,
    openFrame? : () => ProxyElement<HTMLIFrameElement>,
    open : (?ProxyElement<HTMLIFrameElement>) => ZalgoPromise<ProxyWindow>,
    openPrerenderFrame? : () => ProxyElement<HTMLIFrameElement>,
    openPrerender : (ProxyWindow, ?ProxyElement<HTMLIFrameElement>) => ZalgoPromise<ProxyWindow>,
    resize? : ({ width : ?number, height : ?number }) => void,
    delegate : $ReadOnlyArray<string>
|};

export const RENDER_DRIVERS : { [string] : ContextDriverType } = {};

RENDER_DRIVERS[CONTEXT.IFRAME] = {
    openOnClick: false,

    openFrame() : ProxyElement<HTMLIFrameElement> {
        return getProxyElement(iframe({
            attributes: {
                title: this.component.name,
                ...this.component.attributes.iframe
            }
        }));
    },

    open(proxyFrame : ?ProxyElement<HTMLIFrameElement>) : ZalgoPromise<ProxyWindow> {
        if (!proxyFrame) {
            throw new Error(`Expected proxy frame to be passed`);
        }

        return proxyFrame.getElement().then(frame => {
            return awaitFrameWindow(frame).then(win => {

                const frameWatcher = watchElementForClose(frame, () => this.close());
                this.clean.register(() => frameWatcher.cancel());
                this.clean.register(() => destroyElement(frame));
                this.clean.register(() => cleanUpWindow(win));

                return ProxyWindow.toProxyWindow(win, { send });
            });
        });
    },

    openPrerenderFrame() : ProxyElement<HTMLIFrameElement> {
        return getProxyElement(iframe({
            attributes: {
                name:  `__zoid_prerender_frame__${ this.component.name }_${ uniqueID() }__`,
                title: `prerender__${ this.component.name }`,
                ...this.component.attributes.iframe
            }
        }));
    },

    openPrerender(proxyWin : ProxyWindow, proxyPrerenderFrame : ?ProxyElement<HTMLIFrameElement>) : ZalgoPromise<ProxyWindow> {
        if (!proxyPrerenderFrame) {
            throw new Error(`Expected proxy frame to be passed`);
        }
        
        return proxyPrerenderFrame.getElement().then(prerenderFrame => {
            this.clean.register(() => destroyElement(prerenderFrame));

            return awaitFrameWindow(prerenderFrame).then(prerenderFrameWindow => {
                return assertSameDomain(prerenderFrameWindow);
            }).then(win => {
                return ProxyWindow.toProxyWindow(win, { send });
            });
        });
    },

    delegate: [
        'getProxyContainer',
        'renderContainer',
        'openFrame',
        'openPrerenderFrame',
        'prerender',
        'open',
        'openPrerender'
    ],

    resize({ width, height } : { width : ?number, height : ?number }) {
        this.proxyFrame.resize({ width, height });
        this.proxyPrerenderFrame.resize({ width, height });
    }
};

if (__ZOID__.__POPUP_SUPPORT__) {
    RENDER_DRIVERS[CONTEXT.POPUP] = {
        openOnClick: true,

        open() : ZalgoPromise<ProxyWindow> {
            return ZalgoPromise.try(() => {
                let { width, height } = this.component.dimensions;

                width = normalizeDimension(width, window.outerWidth);
                height = normalizeDimension(height, window.outerWidth);

                const win = popup('', {
                    width,
                    height,
                    ...this.component.attributes.popup
                });

                this.clean.register(() => {
                    win.close();
                    cleanUpWindow(win);
                });

                return ProxyWindow.toProxyWindow(win, { send });
            });
        },

        openPrerender(proxyWin : ProxyWindow) : ZalgoPromise<ProxyWindow> {
            return ZalgoPromise.try(() => {
                return proxyWin;
            });
        },

        delegate: [
            'getProxyContainer',
            'renderContainer',
            'setProxyWin'
        ]
    };
}
