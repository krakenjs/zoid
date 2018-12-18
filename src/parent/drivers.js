/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { cleanUpWindow, ProxyWindow } from 'post-robot/src';
import { type CrossDomainWindowType, type SameDomainWindowType, assertSameDomain, isSameDomain } from 'cross-domain-utils/src';
import { iframe, popup, toCSS,
    destroyElement, normalizeDimension, watchElementForClose,
    awaitFrameWindow, addClass, removeClass, uniqueID } from 'belter/src';

import { CONTEXT, CLASS } from '../constants';


export type ContextDriverType = {|

    renderedIntoContainer : boolean,
    callChildToClose : boolean,

    open : () => ZalgoPromise<ProxyWindow>,
    resize? : ({ width : ?number, height : ?number }) => void,

    openPrerender : (CrossDomainWindowType) => ZalgoPromise<?SameDomainWindowType>,
    switchPrerender? : () => void,

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

    open() : ZalgoPromise<ProxyWindow> {

        const frame = iframe({
            attributes: {
                title: this.component.name,
                ...this.component.attributes.iframe
            },
            class: [
                CLASS.COMPONENT_FRAME,
                CLASS.INVISIBLE
            ]
        }, this.element);

        this.clean.set('iframe', frame);

        return awaitFrameWindow(frame).then(win => {
            const detectClose = () => {
                return this.close();
            };

            const iframeWatcher = watchElementForClose(frame, detectClose);
            const elementWatcher = watchElementForClose(this.element, detectClose);

            this.clean.register(() => {
                iframeWatcher.cancel();
                elementWatcher.cancel();
                cleanUpWindow(win);
                destroyElement(frame);
            });

            return ProxyWindow.toProxyWindow(win);
        });
    },

    openPrerender() : ZalgoPromise<?SameDomainWindowType> {

        const prerenderIframe = iframe({
            attributes: {
                name: `__zoid_prerender_frame__${ this.component.name }_${ uniqueID() }__`,
                ...this.component.attributes.iframe
            },
            class: [
                CLASS.PRERENDER_FRAME,
                CLASS.VISIBLE
            ]
        }, this.element);

        this.clean.set('prerenderIframe', prerenderIframe);

        return awaitFrameWindow(prerenderIframe).then(prerenderFrameWindow => {
            this.clean.register(() => destroyElement(prerenderIframe));
            return assertSameDomain(prerenderFrameWindow);
        });
    },

    switchPrerender() {
        addClass(this.prerenderIframe, CLASS.INVISIBLE);
        removeClass(this.prerenderIframe, CLASS.VISIBLE);

        if (this.iframe) {
            addClass(this.iframe, CLASS.VISIBLE);
            removeClass(this.iframe, CLASS.INVISIBLE);
        }

        setTimeout(() => destroyElement(this.prerenderIframe), 1);
    },

    delegate: [
        'renderContainer',
        'prerender',
        'resize',
        'openPrerender',
        'switchPrerender',
        'open'
    ],

    resize({ width, height } : { width : ?number, height : ?number }) {

        if (typeof width === 'number') {
            this.element.style.width   = toCSS(width);
        }

        if (typeof height === 'number') {
            this.element.style.height = toCSS(height);
        }
    }
};

if (__ZOID__.__POPUP_SUPPORT__) {
    RENDER_DRIVERS[CONTEXT.POPUP] = {
        
        renderedIntoContainer: false,
        callChildToClose:      true,

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

                return ProxyWindow.toProxyWindow(win);
            });
        },

        openPrerender(win : CrossDomainWindowType) : ZalgoPromise<?SameDomainWindowType> {
            return ZalgoPromise.try(() => {
                if (isSameDomain(win)) {
                    return assertSameDomain(win);
                }
            });
        },

        delegate: [
            'renderContainer'
        ]
    };
}
