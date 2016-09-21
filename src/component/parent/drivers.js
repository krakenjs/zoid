
import postRobot from 'post-robot/src';

import { PopupOpenError } from '../../error';
import { iframe, popup, isWindowClosed, getDomainFromUrl, getDomain } from '../../lib';
import { CONTEXT_TYPES, CLASS_NAMES } from '../../constants';
import { getPosition } from '../window';


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

        render(element) {
            if (!element) {
                throw new Error(`[${this.component.tag}] Must specify element to render to iframe`);
            }
        },

        open(element) {

            if (!element) {
                throw new Error(`[${this.component.tag}] Must specify element to render to iframe`);
            }

            this.iframe = iframe(element, null, {
                name: this.childWindowName,
                scrolling: this.component.scrolling === false ? 'no' : 'yes'
            });

            let dimensions = this.props.dimensions || this.component.dimensions || {};
            this.resize(dimensions.width, dimensions.height);
            this.restyle();

            this.window = this.iframe.contentWindow;

            this.registerForCleanup(() => {

                this.window.close();
                delete this.window;

                if (this.iframe) {

                    if (this.iframe.parentNode) {
                        this.iframe.parentNode.removeChild(this.iframe);
                    }

                    delete this.iframe;
                }
            });

            return this;
        },

        openBridge() {

        },

        resize(width, height) {
            this.iframe.style.width = `${width}px`;
            this.iframe.style.height = `${height}px`;
        },

        hide() {
            this.iframe.style.display = 'none';
        },

        restyle() {
            this.iframe.style.backgroundColor = 'transparent';
        },

        renderToParent(element, options) {

            if (!element) {
                throw new Error(`[${this.component.tag}] Must specify element to render to iframe`);
            }

            return this.renderToParentRemote(element, CONTEXT_TYPES.IFRAME, options);
        },

        loadUrl(url) {
            this.iframe.src = url;
        }
    },

    // Popup context opens up a centered lightbox-like popup window on the page, with an overlay behind it.

    [ CONTEXT_TYPES.POPUP ]: {

        parentTemplate: true,
        focusable: true,

        render() {
            // pass
        },

        open() {

            let dimensions = this.props.dimensions || this.component.dimensions || {};

            let pos = getPosition({
                x:            dimensions.x,
                y:            dimensions.y,
                width:        dimensions.width,
                height:       dimensions.height
            });

            this.window = popup('', {
                name: this.childWindowName,
                width: dimensions.width,
                height: dimensions.height,
                top: pos.y,
                left: pos.x,
                location: 1,
                status: 1,
                toolbar: 0,
                menubar: 0,
                resizable: 1,
                scrollbars: 1
            });

            this.registerForCleanup(() => {
                if (this.window) {
                    this.window.close();
                    delete this.window;
                }
            });

            // Sometimes we'll be blocked from opening the popup because we're not in a click event.

            if (isWindowClosed(this.window)) {
                let err = new PopupOpenError(`[${this.component.tag}] Can not open popup window - blocked`);
                throw err;
            }

            this.resize(dimensions.width, dimensions.height);

            return this;
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

        renderToParent(element, options) {

            return this.renderToParentLocal(element, CONTEXT_TYPES.POPUP, options);
        },

        loadUrl(url) {
            this.window.location = url;
        }
    },

    // Lightbox context opens up a centered, iframe based lightbox on the page, with a template behind it.

    [ CONTEXT_TYPES.LIGHTBOX ]: {

        parentTemplate: true,

        render() {
            // pass
        },

        renderToParent(element, options) {

            return this.renderToParentRemote(element, CONTEXT_TYPES.LIGHTBOX, options);
        },

        open() {

            let element = this.parentTemplate.getElementsByClassName(CLASS_NAMES.ELEMENT)[0] || document.body;

            RENDER_DRIVERS[CONTEXT_TYPES.IFRAME].open.call(this, element);

            return this;
        },

        openBridge() {

        },

        resize(width, height) {

            width = Math.min(width, window.innerWidth - 20);
            height = Math.min(height, window.innerHeight - 20);

            let container = this.parentTemplate.getElementsByClassName(CLASS_NAMES.ELEMENT)[0] || this.iframe;

            container.style.position = 'fixed';

            this.iframe.style.width  = '100%';
            this.iframe.style.height = '100%';

            if (width) {
                this.parentTemplate.className += ' set-width';
                container.style.width      = `${width}px`;
                container.style.left       = '50%';
                container.style.marginLeft = `-${Math.floor(width / 2)}px`;
            } else {
                this.parentTemplate.className += ' max-width';
                container.style.width      = '100%';
                container.style.left       = 0;
                container.style.marginLeft = 0;
                container.width            = '100%';
            }

            if (height) {
                this.parentTemplate.className += ' set-height';
                container.style.height    = `${height}px`;
                container.style.top       = '50%';
                container.style.marginTop = `-${Math.floor(height / 2)}px`;
            } else {
                this.parentTemplate.className += ' max-height';
                container.style.height    = '100%';
                container.style.top       = 0;
                container.style.marginTop = 0;
                container.height          = '100%';
            }
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