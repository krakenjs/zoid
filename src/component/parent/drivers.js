/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { cleanUpWindow } from 'post-robot/src';
import { findFrameByName, isSameDomain } from 'cross-domain-utils/src';

import { iframe, popup, toCSS, showElement, hideElement,
    destroyElement, normalizeDimension, watchElementForClose,
    awaitFrameWindow, addClass, removeClass, noop } from '../../lib';
import { CONTEXT_TYPES, DELEGATE, CLOSE_REASONS, CLASS_NAMES, DEFAULT_DIMENSIONS } from '../../constants';
import { getPosition, getParentComponentWindow } from '../window';


export type ContextDriverType = {

    focusable : boolean,
    renderedIntoContainerTemplate : boolean,
    allowResize : boolean,
    openOnClick : boolean,
    needsBridge : boolean,

    open : (?string) => ZalgoPromise<void>,
    resize : (?(number | string), ?(number | string)) => void,
    show : () => void,
    hide : () => void,
    loadUrl : (string) => void,

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

    focusable:                     false,
    renderedIntoContainerTemplate: true,
    allowResize:                   true,
    openOnClick:                   false,
    needsBridge:                   false,

    open(url : ?string) : ZalgoPromise<void> {

        let attributes = this.component.attributes.iframe || {};

        this.iframe = iframe({
            url,
            attributes: {
                name:      this.childWindowName,
                title:     this.component.name,
                scrolling: this.component.scrolling ? 'yes' : 'no',
                ...attributes
            },
            class: [
                CLASS_NAMES.COMPONENT_FRAME,
                CLASS_NAMES.INVISIBLE
            ]
        }, this.element);

        return awaitFrameWindow(this.iframe).then(frameWindow => {

            this.window = frameWindow;

            let detectClose = () => {
                return ZalgoPromise.try(() => {
                    return this.props.onClose(CLOSE_REASONS.CLOSE_DETECTED);
                }).finally(() => {
                    return this.destroy();
                });
            };

            let iframeWatcher = watchElementForClose(this.iframe, detectClose);
            let elementWatcher = watchElementForClose(this.element, detectClose);

            this.clean.register('destroyWindow', () => {

                iframeWatcher.cancel();
                elementWatcher.cancel();

                cleanUpWindow(this.window);

                delete this.window;

                if (this.iframe) {
                    destroyElement(this.iframe);
                    delete this.iframe;
                }
            });
        });
    },

    openPrerender() : ZalgoPromise<void> {

        let attributes = this.component.attributes.iframe || {};

        this.prerenderIframe = iframe({
            attributes: {
                name:      `__prerender__${ this.childWindowName }`,
                scrolling: this.component.scrolling ? 'yes' : 'no',
                ...attributes
            },
            class: [
                CLASS_NAMES.PRERENDER_FRAME,
                CLASS_NAMES.VISIBLE
            ]
        }, this.element);

        return awaitFrameWindow(this.prerenderIframe).then(prerenderFrameWindow => {

            this.prerenderWindow = prerenderFrameWindow;

            this.clean.register('destroyPrerender', () => {

                if (this.prerenderIframe) {
                    destroyElement(this.prerenderIframe);
                    delete this.prerenderIframe;
                }
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

        renderTemplate:          DELEGATE.CALL_ORIGINAL,
        openContainerFrame:      DELEGATE.CALL_ORIGINAL,
        getOutlet:               DELEGATE.CALL_ORIGINAL,

        open(original : () => ZalgoPromise<void>, override : () => ZalgoPromise<void>) : () => ZalgoPromise<void> {
            return function overrideOpen() : ZalgoPromise<void> {
                return override.apply(this, arguments).then(() => {
                    this.clean.set('window', findFrameByName(getParentComponentWindow(), this.childWindowName));

                    if (!this.window) {
                        throw new Error(`Unable to find parent component iframe window`);
                    }
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
    },

    loadUrl(url : string) {
        this.iframe.setAttribute('src', url);
    }
};

if (__ZOID__.__POPUP_SUPPORT__) {

    // Popup context opens up a centered popup window on the page.

    RENDER_DRIVERS[CONTEXT_TYPES.POPUP] = {

        focusable:                     true,
        renderedIntoContainerTemplate: false,
        allowResize:                   false,
        openOnClick:                   true,
        needsBridge:                   true,

        open(url : ?string = '') : ZalgoPromise<void> {
            return ZalgoPromise.try(() => {

                let {
                    width = DEFAULT_DIMENSIONS.WIDTH,
                    height = DEFAULT_DIMENSIONS.HEIGHT
                } = this.component.dimensions || {};

                width = normalizeDimension(width, window.outerWidth);
                height = normalizeDimension(height, window.outerWidth);

                let { x, y } = getPosition({ width, height });

                let attributes = this.component.attributes.popup || {};

                this.window = popup(url || '', {
                    name:       this.childWindowName,
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

                this.prerenderWindow = this.window;

                this.clean.register('destroyWindow', () => {
                    if (this.window) {
                        this.window.close();
                        cleanUpWindow(this.window);
                        delete this.window;
                        delete this.prerenderWindow;
                    }
                });

                this.resize(width, height);
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
        },

        loadUrl(url : string) {

            if (isSameDomain(this.window)) {
                try {
                    if (this.window.location && this.window.location.replace) {
                        this.window.location.replace(url);
                        return;
                    }
                } catch (err) {
                    // pass
                }
            }

            this.window.location = url;
        }
    };
}
