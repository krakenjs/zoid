/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { cleanUpWindow, ProxyWindow } from 'post-robot/src';
import { type CrossDomainWindowType, type SameDomainWindowType, assertSameDomain, isSameDomain } from 'cross-domain-utils/src';
import { iframe, popup, toCSS, showElement, hideElement,
    destroyElement, normalizeDimension, watchElementForClose,
    awaitFrameWindow, addClass, removeClass, uniqueID } from 'belter/src';

import { CONTEXT_TYPES, DELEGATE, CLOSE_REASONS, CLASS_NAMES, DEFAULT_DIMENSIONS } from '../../constants';


export type ContextDriverType = {

    renderedIntoContainer : boolean,

    open : () => ZalgoPromise<ProxyWindow>,
    resize : (?(number | string), ?(number | string)) => void,
    show : () => void,
    hide : () => void,

    delegateOverrides : {
        [string] : string | Function
    },

    openPrerender : (CrossDomainWindowType) => ZalgoPromise<?SameDomainWindowType>,
    switchPrerender? : () => void
};

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

export let RENDER_DRIVERS : { [string] : ContextDriverType } = {};

// Iframe context is rendered inline on the page, without any kind of parent template. It's the one context that is designed
// to feel like a native element on the page.

RENDER_DRIVERS[CONTEXT_TYPES.IFRAME] = {

    renderedIntoContainer: true,

    open() : ZalgoPromise<ProxyWindow> {

        let attributes = this.component.attributes.iframe || {};

        let frame = iframe({
            attributes: {
                title: this.component.name,
                ...attributes
            },
            class: [
                CLASS_NAMES.COMPONENT_FRAME,
                CLASS_NAMES.INVISIBLE
            ]
        }, this.element);

        this.clean.set('iframe', frame);

        return awaitFrameWindow(frame).then(win => {

            let detectClose = () => {
                return ZalgoPromise.try(() => {
                    return this.props.onClose(CLOSE_REASONS.CLOSE_DETECTED);
                }).finally(() => {
                    return this.destroy();
                });
            };

            let iframeWatcher = watchElementForClose(frame, detectClose);
            let elementWatcher = watchElementForClose(this.element, detectClose);

            this.clean.register('destroyWindow', () => {
                iframeWatcher.cancel();
                elementWatcher.cancel();
                cleanUpWindow(win);
                destroyElement(frame);
            });

            return ProxyWindow.toProxyWindow(win);
        });
    },

    openPrerender() : ZalgoPromise<?SameDomainWindowType> {

        let attributes = this.component.attributes.iframe || {};

        let prerenderIframe = iframe({
            attributes: {
                name: `__zoid_prerender_frame__${ this.component.name }_${ uniqueID() }__`,
                ...attributes
            },
            class: [
                CLASS_NAMES.PRERENDER_FRAME,
                CLASS_NAMES.VISIBLE
            ]
        }, this.element);

        this.clean.set('prerenderIframe', prerenderIframe);

        return awaitFrameWindow(prerenderIframe).then(prerenderFrameWindow => {

            this.clean.register('destroyPrerender', () => {
                destroyElement(prerenderIframe);
            });

            return assertSameDomain(prerenderFrameWindow);
        });
    },

    switchPrerender() {

        addClass(this.prerenderIframe, CLASS_NAMES.INVISIBLE);
        removeClass(this.prerenderIframe, CLASS_NAMES.VISIBLE);

        addClass(this.iframe, CLASS_NAMES.VISIBLE);
        removeClass(this.iframe, CLASS_NAMES.INVISIBLE);

        setTimeout(() => {
            if (this.prerenderIframe) {
                destroyElement(this.prerenderIframe);
            }
        }, 1000);
    },

    delegateOverrides: {
        openContainer:           DELEGATE.CALL_DELEGATE,
        destroyComponent:        DELEGATE.CALL_DELEGATE,
        destroyContainer:        DELEGATE.CALL_DELEGATE,
        cancelContainerEvents:   DELEGATE.CALL_DELEGATE,
        prerender:               DELEGATE.CALL_DELEGATE,
        elementReady:            DELEGATE.CALL_DELEGATE,
        showContainer:           DELEGATE.CALL_DELEGATE,
        showComponent:           DELEGATE.CALL_DELEGATE,
        hideContainer:           DELEGATE.CALL_DELEGATE,
        hideComponent:           DELEGATE.CALL_DELEGATE,
        hide:                    DELEGATE.CALL_DELEGATE,
        show:                    DELEGATE.CALL_DELEGATE,
        resize:                  DELEGATE.CALL_DELEGATE,
        loadUrl:                 DELEGATE.CALL_DELEGATE,
        openPrerender:           DELEGATE.CALL_DELEGATE,
        switchPrerender:         DELEGATE.CALL_DELEGATE,
        setWindowName:           DELEGATE.CALL_DELEGATE,
        open:                    DELEGATE.CALL_DELEGATE,

        renderTemplate:          DELEGATE.CALL_ORIGINAL,
        openContainerFrame:      DELEGATE.CALL_ORIGINAL,
        getOutlet:               DELEGATE.CALL_ORIGINAL
    },

    resize(width : ?(number | string), height : ?(number | string)) {

        if (width) {
            this.container.style.width = toCSS(width);
            this.element.style.width   = toCSS(width);
        }

        if (height) {
            this.container.style.height = toCSS(height);
            this.element.style.height = toCSS(height);
        }
    },

    show() {
        showElement(this.element);
    },

    hide() {
        hideElement(this.element);
    }
};

if (__ZOID__.__POPUP_SUPPORT__) {

    // Popup context opens up a centered popup window on the page.

    RENDER_DRIVERS[CONTEXT_TYPES.POPUP] = {
        
        renderedIntoContainer: false,

        open() : ZalgoPromise<ProxyWindow> {
            return ZalgoPromise.try(() => {

                let {
                    width = DEFAULT_DIMENSIONS.WIDTH,
                    height = DEFAULT_DIMENSIONS.HEIGHT
                } = this.component.dimensions || {};

                width = normalizeDimension(width, window.outerWidth);
                height = normalizeDimension(height, window.outerWidth);

                let attributes = this.component.attributes.popup || {};
                let win = popup('', { width, height, ...attributes });

                this.clean.register('destroyWindow', () => {
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

        resize() {
            // pass
        },

        hide() {
            throw new Error('Can not hide popup');
        },

        show() {
            throw new Error('Can not show popup');
        },

        delegateOverrides: {

            openContainer:          DELEGATE.CALL_DELEGATE,
            destroyContainer:       DELEGATE.CALL_DELEGATE,

            elementReady:           DELEGATE.CALL_DELEGATE,

            showContainer:          DELEGATE.CALL_DELEGATE,
            showComponent:          DELEGATE.CALL_DELEGATE,
            hideContainer:          DELEGATE.CALL_DELEGATE,
            hideComponent:          DELEGATE.CALL_DELEGATE,

            hide:                   DELEGATE.CALL_DELEGATE,
            show:                   DELEGATE.CALL_DELEGATE,

            cancelContainerEvents:  DELEGATE.CALL_DELEGATE,

            open:                    DELEGATE.CALL_ORIGINAL,
            loadUrl:                 DELEGATE.CALL_ORIGINAL,
            prerender:               DELEGATE.CALL_ORIGINAL,
            destroyComponent:        DELEGATE.CALL_ORIGINAL,
            resize:                  DELEGATE.CALL_ORIGINAL,
            renderTemplate:          DELEGATE.CALL_ORIGINAL,
            openContainerFrame:      DELEGATE.CALL_ORIGINAL,
            getOutlet:               DELEGATE.CALL_ORIGINAL
        }
    };
}
