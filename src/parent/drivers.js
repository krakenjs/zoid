/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { cleanUpWindow, ProxyWindow } from 'post-robot/src';
import { assertSameDomain } from 'cross-domain-utils/src';
import { iframe, popup, destroyElement, normalizeDimension, watchElementForClose,
    awaitFrameWindow, addClass, removeClass, uniqueID } from 'belter/src';

import { CONTEXT, CLASS } from '../constants';
import { getProxyElement, type ProxyElement } from '../lib';


export type ContextDriverType = {|
    renderedIntoContainer : boolean,
    callChildToClose : boolean,

    open : (?ProxyElement) => ZalgoPromise<{ proxyWin : ProxyWindow, proxyFrame? : ProxyElement }>,
    openPrerender : (ProxyWindow, ProxyElement) => ZalgoPromise<{ proxyPrerenderWin : ProxyWindow, proxyPrerenderFrame? : ProxyElement }>,

    resize? : ({ width : ?number, height : ?number }) => void,
    switchPrerender? : ({ proxyFrame : ProxyElement, proxyPrerenderFrame : ProxyElement }) => ZalgoPromise<void>,

    delegate : $ReadOnlyArray<string>
|};

/*  Render Drivers
    --------------

    There are various differences in how we treat:

    - Opening frames and windows
    - Rendering up to the parent
    - Resizing
    - etc.

    based on the context we're rendering to.

    These render drivers split this functionality out in a driver pattern, so our component code doesn't bunch up into a
    series of if-popup-then-else-if-iframe code.
*/

export const RENDER_DRIVERS : { [string] : ContextDriverType } = {};

// Iframe context is rendered inline on the page, without any kind of parent template. It's the one context that is designed
// to feel like a native element on the page.

RENDER_DRIVERS[CONTEXT.IFRAME] = {

    renderedIntoContainer: true,
    callChildToClose:      false,

    open(proxyElement) : ZalgoPromise<{ proxyWin : ProxyWindow, proxyFrame? : ProxyElement }> {
        if (!proxyElement) {
            throw new Error(`Expected container element to be passed`);
        }

        return proxyElement.getElement().then(element => {
            const frame = iframe({
                attributes: {
                    title: this.component.name,
                    ...this.component.attributes.iframe
                },
                class: [
                    CLASS.COMPONENT_FRAME,
                    CLASS.INVISIBLE
                ]
            }, element);
    
            return awaitFrameWindow(frame).then(win => {
                const iframeWatcher = watchElementForClose(frame, () => this.close());
                const elementWatcher = watchElementForClose(element, () => this.close());
    
                this.clean.register(() => {
                    iframeWatcher.cancel();
                    elementWatcher.cancel();
                    cleanUpWindow(win);
                    destroyElement(frame);
                });
    
                return {
                    proxyWin:   ProxyWindow.toProxyWindow(win),
                    proxyFrame: getProxyElement(frame)
                };
            });
        });
    },

    openPrerender(proxyWin : ProxyWindow, proxyElement : ProxyElement) : ZalgoPromise<{ proxyPrerenderWin : ProxyWindow, proxyPrerenderFrame? : ProxyElement }> {
        return proxyElement.getElement().then(element => {
            const prerenderIframe = iframe({
                attributes: {
                    name: `__zoid_prerender_frame__${ this.component.name }_${ uniqueID() }__`,
                    ...this.component.attributes.iframe
                },
                class: [
                    CLASS.PRERENDER_FRAME,
                    CLASS.VISIBLE
                ]
            }, element);

            return awaitFrameWindow(prerenderIframe).then(prerenderFrameWindow => {
                this.clean.register(() => destroyElement(prerenderIframe));
                return assertSameDomain(prerenderFrameWindow);
            }).then(win => {
                return {
                    proxyPrerenderWin:   ProxyWindow.toProxyWindow(win),
                    proxyPrerenderFrame: getProxyElement(prerenderIframe)
                };
            });
        });
    },

    switchPrerender({ proxyFrame, proxyPrerenderFrame } : { proxyFrame : ProxyElement, proxyPrerenderFrame : ProxyElement }) : ZalgoPromise<void> {
        return ZalgoPromise.all([
            proxyFrame.getElement(),
            proxyPrerenderFrame.getElement()
        ]).then(([ frame, prerenderFrame ]) => {
            addClass(prerenderFrame, CLASS.INVISIBLE);
            removeClass(prerenderFrame, CLASS.VISIBLE);
            addClass(frame, CLASS.VISIBLE);
            removeClass(frame, CLASS.INVISIBLE);
            setTimeout(() => destroyElement(prerenderFrame), 1);
        });
    },

    delegate: [
        'getProxyContainer',
        'renderContainer',
        'prerender',
        'switchPrerender',
        'open'
    ],

    resize({ width, height } : { width : ?number, height : ?number }) {
        this.proxyOutlet.resize({ width, height });
    }
};

if (__ZOID__.__POPUP_SUPPORT__) {
    RENDER_DRIVERS[CONTEXT.POPUP] = {
        
        renderedIntoContainer: false,
        callChildToClose:      true,

        open() : ZalgoPromise<{ proxyWin : ProxyWindow, proxyFrame? : ProxyElement }> {
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

                return {
                    proxyWin: ProxyWindow.toProxyWindow(win)
                };
            });
        },

        openPrerender(proxyWin : ProxyWindow) : ZalgoPromise<{ proxyPrerenderWin : ProxyWindow, proxyPrerenderFrame? : ProxyElement }> {
            return ZalgoPromise.try(() => {
                return {
                    proxyPrerenderWin: proxyWin
                };
            });
        },

        delegate: [
            'getProxyContainer',
            'renderContainer'
        ]
    };
}
