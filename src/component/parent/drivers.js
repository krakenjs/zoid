
import { cleanUpWindow } from 'post-robot/src';
import { findFrameByName } from 'post-robot/src/lib/windows';

import { iframe, popup, getElement, toCSS, showElement, hideElement, destroyElement, normalizeDimension } from '../../lib';
import { CONTEXT_TYPES, DELEGATE } from '../../constants';
import { getPosition, getParentComponentWindow } from '../window';

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

export let RENDER_DRIVERS = {};

    // Iframe context is rendered inline on the page, without any kind of parent template. It's the one context that is designed
    // to feel like a native element on the page.

RENDER_DRIVERS[CONTEXT_TYPES.IFRAME] = {

    renderedIntoContainerTemplate: true,
    allowResize: true,
    openOnClick: false,
    errorOnCloseDuringInit: true,

    open(element) {

        if (element && !getElement(element)) {
            throw this.component.error(`Can not find element ${element}`);
        }

        let options = {
            attributes: {
                name: this.childWindowName,
                scrolling: this.component.scrolling === false ? 'no' : 'yes'
            }
        };

        let frame = this.iframe = iframe(null, options, this.element);
        this.window = frame.contentWindow;

        frame.addEventListener('error', (err) => this.error(err));

        hideElement(this.element);

        let sacrificialIframe;

        if (this.component.sacrificialComponentTemplate) {
            sacrificialIframe = iframe(null, options, this.element);
            this.componentTemplateWindow = sacrificialIframe.contentWindow;
            hideElement(frame);

            frame.addEventListener('load', () => {
                setTimeout(() => {
                    hideElement(sacrificialIframe);
                    destroyElement(sacrificialIframe);
                    showElement(frame);
                }, 50);
            });
        }

        this.clean.register('destroyWindow', () => {

            this.window.close();

            cleanUpWindow(this.window);

            delete this.window;

            if (sacrificialIframe) {
                destroyElement(sacrificialIframe);
            }

            if (this.iframe) {
                destroyElement(this.iframe);
                delete this.iframe;
            }
        });
    },

    delegateOverrides: {

        openContainer:           DELEGATE.CALL_DELEGATE,
        destroyComponent:        DELEGATE.CALL_DELEGATE,
        destroyContainer:        DELEGATE.CALL_DELEGATE,
        cancelContainerEvents:   DELEGATE.CALL_DELEGATE,
        createComponentTemplate: DELEGATE.CALL_DELEGATE,
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

        getInitialDimensions:    DELEGATE.CALL_ORIGINAL,
        renderTemplate:          DELEGATE.CALL_ORIGINAL,

        open(original, override) {
            return function() {
                return override.apply(this, arguments).then(() => {
                    this.clean.set('window', findFrameByName(getParentComponentWindow(), this.childWindowName));

                    if (!this.window) {
                        throw new Error(`Unable to find parent component iframe window`);
                    }
                });
            };
        }
    },

    resize(width, height) {

        if (width) {
            this.element.style.width  = toCSS(width);
        }

        if (height) {
            this.element.style.height = toCSS(height);
        }
    },

    hide() {
        showElement(this.element);
    },

    show() {
        hideElement(this.element);
    },

    loadUrl(url) {
        this.iframe.src = url;
    }
};

if (__POPUP_SUPPORT__) {

    // Popup context opens up a centered popup window on the page.

    RENDER_DRIVERS[CONTEXT_TYPES.POPUP] = {

        focusable: true,
        renderedIntoContainerTemplate: false,
        allowResize: false,
        openOnClick: true,
        errorOnCloseDuringInit: false,

        open() {

            let { width, height, x, y } = this.getInitialDimensions();

            width = normalizeDimension(width, window.outerWidth);
            height = normalizeDimension(height, window.outerWidth);

            let pos = getPosition({ width, height, x, y });

            this.window = popup('', {
                name: this.childWindowName,
                width,
                height,
                top: pos.y,
                left: pos.x,
                location: 1,
                status: 1,
                toolbar: 0,
                menubar: 0,
                resizable: 1,
                scrollbars: 1
            });

            this.clean.register('destroyWindow', () => {
                if (this.window) {
                    this.window.close();
                    cleanUpWindow(this.window);
                    delete this.window;
                }
            });

            this.resize(width, height);
        },

        resize(width, height) {

            if (width && height) {
                // this.window.resizeTo(width, height);
            }
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
            createComponentTemplate: DELEGATE.CALL_ORIGINAL,
            destroyComponent:        DELEGATE.CALL_ORIGINAL,
            resize:                  DELEGATE.CALL_ORIGINAL,
            getInitialDimensions:    DELEGATE.CALL_ORIGINAL,
            renderTemplate:          DELEGATE.CALL_ORIGINAL
        },

        loadUrl(url) {
            this.window.location = url;
        }
    };
}
