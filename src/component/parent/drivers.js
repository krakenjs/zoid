
import postRobot from 'post-robot/src';

import { PopupOpenError } from '../../error';
import { iframe, popup, getDomainFromUrl, getDomain, getElement, toCSS, isPerc, toNum } from '../../lib';
import { CONTEXT_TYPES, CLASS_NAMES, DELEGATE } from '../../constants';
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
    series of if-popup-then-else-if-lightbox code.
*/

export let RENDER_DRIVERS = {

    // Iframe context is rendered inline on the page, without any kind of parent template. It's the one context that is designed
    // to feel like a native element on the page.

    [ CONTEXT_TYPES.IFRAME ]: {

        parentTemplate: false,
        requiresElement: true,
        renderedIntoParentTemplate: false,
        destroyOnUnload: false,
        allowResize: true,
        openOnClick: false,

        open(element) {

            if (!element) {
                throw new Error(`[${this.component.tag}] Must specify element to render to iframe`);
            }

            if (!getElement(element)) {
                throw new Error(`[${this.component.tag}] Can not find element ${element}`);
            }

            this.iframe = iframe(null, {
                name: this.childWindowName,
                scrolling: this.component.scrolling === false ? 'no' : 'yes'
            }, element);

            let dimensions = this.props.dimensions || this.component.dimensions || {};
            this.resize(dimensions.width, dimensions.height);
            this.restyle();

            this.window = this.iframe.contentWindow;

            this.clean.register('destroyWindow', () => {

                this.window.close();
                delete this.window;

                if (this.iframe) {

                    if (this.iframe.parentNode) {
                        this.iframe.parentNode.removeChild(this.iframe);
                    }

                    delete this.iframe;
                }
            });
        },

        openBridge() {

        },
        
        renderToParentOverrides: {

            openContainer:           DELEGATE.CALL_DELEGATE,
            destroyComponent:        DELEGATE.CALL_DELEGATE,
            destroyContainer:        DELEGATE.CALL_DELEGATE,
            cancelContainerEvents:   DELEGATE.CALL_DELEGATE,
            createComponentTemplate: DELEGATE.CALL_DELEGATE,
            showContainer:           DELEGATE.CALL_DELEGATE,
            showComponent:           DELEGATE.CALL_DELEGATE,
            hideContainer:           DELEGATE.CALL_DELEGATE,
            hideComponent:           DELEGATE.CALL_DELEGATE,
            hide:                    DELEGATE.CALL_DELEGATE,
            resize:                  DELEGATE.CALL_DELEGATE,
            restyle:                 DELEGATE.CALL_DELEGATE,
            loadUrl:                 DELEGATE.CALL_DELEGATE,
            hijackSubmit:            DELEGATE.CALL_DELEGATE,

            open(original, override) {
                return function() {
                    return override.apply(this, arguments).then(() => {
                        this.window = postRobot.winutil.findFrameByName(getParentComponentWindow(), this.childWindowName);

                        if (!this.window) {
                            throw new Error(`Unable to find parent component iframe window`);
                        }
                    });
                };
            }
        },

        resize(width, height) {
            this.iframe.style.width  = toCSS(width);
            this.iframe.style.height = toCSS(height);
        },

        hide() {
            this.iframe.style.display = 'none';
        },

        restyle() {
            this.iframe.style.backgroundColor = 'transparent';
        },

        loadUrl(url) {
            this.iframe.src = url;
        }
    },

    // Popup context opens up a centered lightbox-like popup window on the page, with an overlay behind it.

    [ CONTEXT_TYPES.POPUP ]: {

        parentTemplate: true,
        focusable: true,
        requiresElement: false,
        renderedIntoParentTemplate: false,
        destroyOnUnload: true,
        allowResize: false,
        openOnClick: true,

        open() {

            let { width, height, x, y } = this.props.dimensions || this.component.dimensions || {};

            width  = isPerc(width)  ? parseInt(window.innerWidth  * toNum(width)  / 100, 10) : toNum(width);
            height = isPerc(height) ? parseInt(window.innerHeight * toNum(height) / 100, 10) : toNum(height);

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
                    delete this.window;
                }
            });

            // Sometimes we'll be blocked from opening the popup because we're not in a click event.

            if (postRobot.winutil.isWindowClosed(this.window)) {
                let err = new PopupOpenError(`[${this.component.tag}] Can not open popup window - blocked`);
                throw err;
            }

            this.resize(width, height);
        },

        openBridge() {

            let bridgeUrl = this.component.bridgeUrl;

            if (!bridgeUrl && this.component.bridgeUrls && this.props.env) {
                bridgeUrl = this.component.bridgeUrls[this.props.env];
            }

            if (bridgeUrl) {

                // No point loading a bridge if we're on the same domain. Maybe should move this logic to post-robot though?

                if (getDomainFromUrl(bridgeUrl) === getDomain(window)) {
                    return;
                }

                return postRobot.openBridge(bridgeUrl);
            }
        },

        resize(width, height) {

            if (width && height) {
                // this.window.resizeTo(width, height);
            }
        },

        hide() {
            throw new Error('Can not hide popup');
        },

        restyle() {
            // pass
        },

        renderToParentOverrides: {

            openContainer:          DELEGATE.CALL_DELEGATE,
            destroyContainer:       DELEGATE.CALL_DELEGATE,

            showContainer:          DELEGATE.CALL_DELEGATE,
            showComponent:          DELEGATE.CALL_DELEGATE,
            hideContainer:          DELEGATE.CALL_DELEGATE,
            hideComponent:          DELEGATE.CALL_DELEGATE,

            hide:                   DELEGATE.CALL_DELEGATE,

            cancelContainerEvents:  DELEGATE.CALL_DELEGATE,

            open:                    DELEGATE.CALL_ORIGINAL,
            loadUrl:                 DELEGATE.CALL_ORIGINAL,
            createComponentTemplate: DELEGATE.CALL_ORIGINAL,
            destroyComponent:        DELEGATE.CALL_ORIGINAL,
            resize:                  DELEGATE.CALL_ORIGINAL,
            restyle:                 DELEGATE.CALL_ORIGINAL
        },

        loadUrl(url) {
            this.window.location = url;
        }
    },

    // Lightbox context opens up a centered, iframe based lightbox on the page, with a template behind it.

    [ CONTEXT_TYPES.LIGHTBOX ]: {

        parentTemplate: true,
        requiresElement: false,
        renderedIntoParentTemplate: true,
        destroyOnUnload: false,
        allowResize: true,
        openOnClick: false,

        renderToParentOverrides: {

            openContainer:           DELEGATE.CALL_DELEGATE,
            destroyComponent:        DELEGATE.CALL_DELEGATE,
            destroyContainer:        DELEGATE.CALL_DELEGATE,
            createComponentTemplate: DELEGATE.CALL_DELEGATE,

            showContainer:           DELEGATE.CALL_DELEGATE,
            showComponent:           DELEGATE.CALL_DELEGATE,
            hideContainer:           DELEGATE.CALL_DELEGATE,
            hideComponent:           DELEGATE.CALL_DELEGATE,

            hide:                    DELEGATE.CALL_DELEGATE,
            resize:                  DELEGATE.CALL_DELEGATE,
            restyle:                 DELEGATE.CALL_DELEGATE,
            loadUrl:                 DELEGATE.CALL_DELEGATE,

            cancelContainerEvents: DELEGATE.CALL_DELEGATE,

            open(original, override) {
                return function() {
                    return override.apply(this, arguments).then(() => {
                        this.window = postRobot.winutil.findFrameByName(this.delegateWindow, this.childWindowName);

                        if (!this.window) {
                            throw new Error(`Unable to find parent component iframe window`);
                        }
                    });
                };
            }
        },

        open() {

            let element = this.parentTemplate.getElementsByClassName(CLASS_NAMES.ELEMENT)[0] || document.body;

            return RENDER_DRIVERS[CONTEXT_TYPES.IFRAME].open.call(this, element);
        },

        openBridge() {

        },

        resize(width, height) {

            let container = this.parentTemplate.getElementsByClassName(CLASS_NAMES.ELEMENT)[0] || this.iframe;

            container.style.width  = toCSS(width);
            container.style.height = toCSS(height);
        },

        hide() {
            this.iframe.style.display = 'none';
        },

        restyle() {
            // pass
        },

        loadUrl(url) {
            this.iframe.src = url;
        }
    }
};
