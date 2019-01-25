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

    open : (?ProxyElement) => ZalgoPromise<{ proxyWin : ProxyWindow, proxyFrame? : ProxyElement }>,
    openPrerender : (ProxyWindow, ProxyElement) => ZalgoPromise<{ proxyPrerenderWin : ProxyWindow, proxyPrerenderFrame? : ProxyElement }>,

    resize? : ({ width : ?number, height : ?number }) => void,
    switchPrerender? : ({ proxyFrame : ProxyElement, proxyPrerenderFrame : ProxyElement }) => ZalgoPromise<void>,

    delegate : $ReadOnlyArray<string>
|};

export const RENDER_DRIVERS : { [string] : ContextDriverType } = {};

RENDER_DRIVERS[CONTEXT.IFRAME] = {
    renderedIntoContainer: true,

    open(proxyOutlet) : ZalgoPromise<{ proxyWin : ProxyWindow, proxyFrame? : ProxyElement }> {
        if (!proxyOutlet) {
            throw new Error(`Expected container element to be passed`);
        }

        return proxyOutlet.getElement().then(outlet => {
            const frame = iframe({
                attributes: {
                    title: this.component.name,
                    ...this.component.attributes.iframe
                },
                class: [
                    CLASS.COMPONENT_FRAME,
                    CLASS.INVISIBLE
                ]
            }, outlet);

            const frameWatcher = watchElementForClose(frame, () => this.close());
            this.clean.register(() => frameWatcher.cancel());
            this.clean.register(() => destroyElement(frame));
    
            return awaitFrameWindow(frame).then(win => {
                this.clean.register(() => cleanUpWindow(win));

                return {
                    proxyWin:   ProxyWindow.toProxyWindow(win),
                    proxyFrame: getProxyElement(frame)
                };
            });
        });
    },

    openPrerender(proxyWin : ProxyWindow, proxyElement : ProxyElement) : ZalgoPromise<{ proxyPrerenderWin : ProxyWindow, proxyPrerenderFrame? : ProxyElement }> {
        return proxyElement.getElement().then(element => {
            const prerenderFrame = iframe({
                attributes: {
                    name: `__zoid_prerender_frame__${ this.component.name }_${ uniqueID() }__`,
                    ...this.component.attributes.iframe
                },
                class: [
                    CLASS.PRERENDER_FRAME,
                    CLASS.VISIBLE
                ]
            }, element);

            this.clean.register(() => destroyElement(prerenderFrame));

            return awaitFrameWindow(prerenderFrame).then(prerenderFrameWindow => {
                return assertSameDomain(prerenderFrameWindow);
            }).then(win => {
                return {
                    proxyPrerenderWin:   ProxyWindow.toProxyWindow(win),
                    proxyPrerenderFrame: getProxyElement(prerenderFrame)
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
        'open',
        'saveProxyWin'
    ],

    resize({ width, height } : { width : ?number, height : ?number }) {
        this.proxyOutlet.resize({ width, height });
    }
};

if (__ZOID__.__POPUP_SUPPORT__) {
    RENDER_DRIVERS[CONTEXT.POPUP] = {
        renderedIntoContainer: false,

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
            'renderContainer',
            'saveProxyWin'
        ]
    };
}
