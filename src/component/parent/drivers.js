
import { PopupOpenError } from '../../error';
import { iframe, popup, isWindowClosed } from '../../lib';
import { CONTEXT_TYPES, MAX_Z_INDEX, CLASS_NAMES } from '../../constants';
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
                name: this.childWindowName
            });

            let dimensions = this.component.dimensions || {};
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

        resize(width, height) {
            this.iframe.style.width = `${width}px`;
            this.iframe.style.height = `${height}px`;
        },

        restyle() {
            this.iframe.style.backgroundColor = 'transparent';
        },

        renderToParent(element) {
            if (!element) {
                throw new Error(`[${this.component.tag}] Must specify element to render to iframe`);
            }
        },

        loadUrl(url) {
            this.iframe.src = url;
        }
    },

    // Popup context opens up a centered lightbox-like popup window on the page, with an overlay behind it.

    [ CONTEXT_TYPES.POPUP ]: {

        parentTemplate: true,

        open() {

            let dimensions = this.component.dimensions || {};

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
                left: pos.x
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

            return this;
        },

        resize() {
            // pass
        },

        restyle() {
            // pass
        },

        renderToParent() {

            // Popups are the only case where we need to do anything special to render to parent.
            // Because we need a click event, we have to open up the popup from the child the moment it's requested,
            // Then message up and continue the rendering process from the parent as with any other renderToParent.

            this.open(null, CONTEXT_TYPES.POPUP);
            this.createComponentTemplate();
        },

        loadUrl(url) {
            this.window.location = url;
        }
    },

    // Lightbox context opens up a centered, iframe based lightbox on the page, with a template behind it.

    [ CONTEXT_TYPES.LIGHTBOX ]: {

        parentTemplate: true,

        open() {

            let element = this.parentTemplate.getElementsByClassName(CLASS_NAMES.ELEMENT)[0] || document.body;

            RENDER_DRIVERS[CONTEXT_TYPES.IFRAME].open.call(this, element);

            this.iframe.style.zIndex   = MAX_Z_INDEX;
            this.iframe.style.position = 'fixed';
            this.iframe.className = 'xcomponent-lightbox-open';

            return this;
        },

        resize(width, height) {

            if (width) {
                this.iframe.style.width      = `${width}px`;
                this.iframe.style.left       = '50%';
                this.iframe.style.marginLeft = `-${Math.floor(width / 2)}px`;
            } else {
                this.iframe.style.left       = 0;
                this.iframe.style.width      = '100%';
                this.iframe.style.marginLeft = '0px';
                this.iframe.width            = '100%';
            }

            if (height) {
                this.iframe.style.height    = `${height}px`;
                this.iframe.style.top       = '50%';
                this.iframe.style.marginTop = `-${Math.floor(height / 2)}px`;
            } else {
                this.iframe.style.top       = 0;
                this.iframe.style.height    = '100%';
                this.iframe.style.marginTop = '0px';
                this.iframe.height          = '100%';
            }
        },

        restyle() {
            // pass
        },

        loadUrl(url) {
            this.iframe.src = url;
        }
    }
};