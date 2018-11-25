/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { cleanUpWindow, ProxyWindow } from 'post-robot/src';
import { findFrameByName, type CrossDomainWindowType } from 'cross-domain-utils/src';
import { iframe, popup, toCSS, showElement, hideElement,
    destroyElement, normalizeDimension, watchElementForClose,
    awaitFrameWindow, addClass, removeClass, noop, uniqueID } from 'belter/src';

import { CONTEXT_TYPES, DELEGATE, CLOSE_REASONS, CLASS_NAMES, DEFAULT_DIMENSIONS } from '../../constants';
import { getPosition, getParentComponentWindow } from '../window';


export type ContextDriverType = {

    renderedIntoContainer : boolean,

    open : () => ZalgoPromise<CrossDomainWindowType>,
    resize : (?(number | string), ?(number | string)) => void,
    show : () => void,
    hide : () => void,

    delegateOverrides : {
        [string] : string | Function
    },

    openPrerender : () => ZalgoPromise<void>,
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

    open() : ZalgoPromise<CrossDomainWindowType> {

        let attributes = this.component.attributes.iframe || {};

        let frame = iframe({
            attributes: {
                title:     this.component.name,
                scrolling: this.component.scrolling ? 'yes' : 'no',
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

            return win;
        });
    },

    openPrerender() : ZalgoPromise<void> {

        let attributes = this.component.attributes.iframe || {};

        let prerenderIframe = iframe({
            attributes: {
                name:      `__zoid_prerender_frame__${ this.component.name }_${ uniqueID() }__`,
                scrolling: this.component.scrolling ? 'yes' : 'no',
                ...attributes
            },
            class: [
                CLASS_NAMES.PRERENDER_FRAME,
                CLASS_NAMES.VISIBLE
            ]
        }, this.element);

        this.clean.set('prerenderIframe', prerenderIframe);

        return awaitFrameWindow(prerenderIframe).then(prerenderFrameWindow => {

            this.clean.set('prerenderWindow', prerenderFrameWindow);

            this.clean.register('destroyPrerender', () => {
                destroyElement(prerenderIframe);
            });
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
        createPrerenderTemplate: DELEGATE.CALL_DELEGATE,
        elementReady:            DELEGATE.CALL_DELEGATE,
        showContainer:           DELEGATE.CALL_DELEGATE,
        showComponent:           DELEGATE.CALL_DELEGATE,
        hideContainer:           DELEGATE.CALL_DELEGATE,
        hideComponent:           DELEGATE.CALL_DELEGATE,
        hide:                    DELEGATE.CALL_DELEGATE,
        show:                    DELEGATE.CALL_DELEGATE,
        resize:                  DELEGATE.CALL_DELEGATE,
        loadUrl:                 DELEGATE.CALL_DELEGATE,
        hijackSubmit:            DELEGATE.CALL_DELEGATE,
        openPrerender:           DELEGATE.CALL_DELEGATE,
        switchPrerender:         DELEGATE.CALL_DELEGATE,
        setWindowName:           DELEGATE.CALL_DELEGATE,

        renderTemplate:          DELEGATE.CALL_ORIGINAL,
        openContainerFrame:      DELEGATE.CALL_ORIGINAL,
        getOutlet:               DELEGATE.CALL_ORIGINAL,

        open(original : () => ZalgoPromise<string>, override : () => ZalgoPromise<ProxyWindow>) : () => ZalgoPromise<CrossDomainWindowType> {
            return function overrideOpen() : ZalgoPromise<CrossDomainWindowType> {
                return override.apply(this, arguments).then((proxyWindow : ProxyWindow) => {
                    let windowName = `__zoid_frame__${ this.component.name }_${ uniqueID() }__`;

                    return proxyWindow.setName(windowName).then(() => {
                        let win = findFrameByName(getParentComponentWindow(), windowName);

                        if (!win) {
                            throw new Error(`Unable to find remote iframe window`);
                        }

                        return win;
                    });
                });
            };
        }
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

        open() : ZalgoPromise<CrossDomainWindowType> {
            return ZalgoPromise.try(() => {

                let {
                    width = DEFAULT_DIMENSIONS.WIDTH,
                    height = DEFAULT_DIMENSIONS.HEIGHT
                } = this.component.dimensions || {};

                width = normalizeDimension(width, window.outerWidth);
                height = normalizeDimension(height, window.outerWidth);

                let { x, y } = getPosition({ width, height });

                let attributes = this.component.attributes.popup || {};

                let win = popup('', {
                    width,
                    height,
                    top:        y,
                    left:       x,
                    status:     1,
                    toolbar:    0,
                    menubar:    0,
                    resizable:  1,
                    scrollbars: 1,
                    ...attributes
                });
                
                this.clean.set('prerenderWindow', win);

                this.clean.register('destroyWindow', () => {
                    win.close();
                    cleanUpWindow(win);
                });

                this.resize(width, height);

                return win;
            });
        },

        openPrerender() : ZalgoPromise<void> {
            return ZalgoPromise.try(noop);
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
            createPrerenderTemplate: DELEGATE.CALL_ORIGINAL,
            destroyComponent:        DELEGATE.CALL_ORIGINAL,
            resize:                  DELEGATE.CALL_ORIGINAL,
            renderTemplate:          DELEGATE.CALL_ORIGINAL,
            openContainerFrame:      DELEGATE.CALL_ORIGINAL,
            getOutlet:               DELEGATE.CALL_ORIGINAL
        }
    };
}
