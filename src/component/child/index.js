
import * as $logger from 'beaver-logger/client';
import { isSameDomain, getOpener, getAllFramesInWindow } from 'post-robot/src/lib/windows';
import { send } from 'post-robot/src';

import { SyncPromise as Promise } from 'sync-browser-mocks/src/promise';
import { BaseComponent } from '../base';
import { getParentComponentWindow, getComponentMeta, getParentDomain, getParentRenderWindow, isXComponentWindow } from '../window';
import { extend, onCloseWindow, deserializeFunctions, get, onDimensionsChange, trackDimensions, dimensionsMatchViewport,
         cycle, getDomain, globalFor, setLogLevel, getElement, documentReady } from '../../lib';
import { POST_MESSAGE, CONTEXT_TYPES, CLOSE_REASONS, INITIAL_PROPS } from '../../constants';
import { normalizeChildProps } from './props';


/*  Child Component
    ---------------

    This is the portion of code which runs inside the frame or popup window containing the component's implementation.

    When the component author calls myComponent.attach(), it creates a new instance of ChildComponent, which is then
    responsible for managing the state and messaging back up to the parent, and providing props for the component to
    utilize.
*/

export class ChildComponent extends BaseComponent {

    constructor(component) {
        super(component);
        this.component = component;

        this.sendLogsToOpener();

        this.component.log(`construct_child`);

        // The child can specify some default props if none are passed from the parent. This often makes integrations
        // a little more seamless, as applicaiton code can call props.foo() without worrying about whether the parent
        // has provided them or not, and fall-back to some default behavior.

        this.onPropHandlers = [];

        this.setProps(this.getInitialProps(), getParentDomain());

        // update logLevel with prop.logLevel to override defaultLogLevel configured when creating component
        setLogLevel(this.props.logLevel);

        this.component.log(`init_child`);

        this.setWindows();

        // Send an init message to our parent. This gives us an initial set of data to use that we can use to function.
        //
        // For example:
        //
        // - What context are we
        // - What props has the parent specified

        this.onInit = this.sendToParent(POST_MESSAGE.INIT, {

            exports: this.exports()

        }).then(({ origin, data }) => {

            this.context = data.context;

            window.xprops = this.props = {};
            this.setProps(data.props, origin);

            this.watchForResize();

            return this;

        }).catch(err => {

            this.error(err);
            throw err;
        });
    }


    init() {
        return this.onInit;
    }

    getParentDomain() {
        return getParentDomain();
    }

    onProps(handler) {
        this.onPropHandlers.push(handler);
    }

    getParentComponentWindow() {
        return getParentComponentWindow();
    }

    getParentRenderWindow() {
        return getParentRenderWindow();
    }

    getInitialProps() {
        let componentMeta = getComponentMeta();

        if (componentMeta) {
            let props = componentMeta.props;

            if (props.type === INITIAL_PROPS.RAW) {
                props = props.value;
            } else if (props.type === INITIAL_PROPS.UID) {

                let parentComponentWindow = getParentComponentWindow();

                if (!isSameDomain(parentComponentWindow)) {

                    if (window.location.protocol === 'file:') {
                        throw new Error(`Can not get props from file:// domain`);
                    }

                    throw new Error(`Parent component window is on a different domain - expected ${getDomain()} - can not retrieve props`);
                }

                props = globalFor(parentComponentWindow).props[componentMeta.uid];

            } else {
                throw new Error(`Unrecognized props type: ${props.type}`);
            }

            if (!props) {
                throw new Error(`Initial props not found`);
            }

            return deserializeFunctions(props, ({ fullKey, self, args }) => {
                return this.onInit.then(() => {
                    return get(this.props, fullKey).apply(self, args);
                });
            });
        }
    }


    setProps(props = {}, origin, required = true) {
        window.xprops = this.props = this.props || {};
        extend(this.props, normalizeChildProps(this.component, props, origin, required));
        // this.props.onError = (err) => this.error(err);
        for (let handler of this.onPropHandlers) {
            handler.call(this, this.props);
        }
    }


    /*  Send to Parent
        --------------

        Send a post message to our parent window.
    */

    sendToParent(name, data) {
        let parentWindow = getParentComponentWindow();

        if (!parentWindow) {
            throw new Error(`Can not find parent component window to message`);
        }

        this.component.log(`send_to_parent_${name}`);

        return send(getParentComponentWindow(), name, data, { domain: getParentDomain() });
    }


    /*  Set Windows
        -----------

        Determine the parent window, and the parent component window. Note -- these may be different, if we were
        rendered using renderTo.
    */

    setWindows() {


        // Ensure we do not try to .attach() multiple times for the same component on the same page

        if (window.__activeXComponent__) {
            throw this.component.error(`Can not attach multiple components to the same window`);
        }

        window.__activeXComponent__ = this;

        // Get the direct parent window

        if (!getParentComponentWindow()) {
            throw this.component.error(`Can not find parent window`);
        }

        let componentMeta = getComponentMeta();

        if (componentMeta.tag !== this.component.tag) {
            throw this.component.error(`Parent is ${componentMeta.tag} - can not attach ${this.component.tag}`);
        }

        // Note -- getting references to other windows is probably one of the hardest things to do. There's basically
        // only a few ways of doing it:
        //
        // - The window is a direct parent, in which case you can use window.parent or window.opener
        // - The window is an iframe owned by you or one of your parents, in which case you can use window.frames
        // - The window sent you a post-message, in which case you can use event.source
        //
        // If we didn't rely on winProps.parent here from the window name, we'd have to relay all of our messages through
        // our actual parent. Which is no fun at all, and pretty error prone even with the help of post-robot. So this
        // is the lesser of two evils until browsers give us something like getWindowByName(...)

        // If the parent window closes, we need to close ourselves. There's no point continuing to run our component
        // if there's no parent to message to.

        this.watchForClose();
    }


    sendLogsToOpener() {
        if (__SEND_POPUP_LOGS_TO_OPENER__) {
            try {
                let opener = getOpener(window);

                if (!opener || !window.console) {
                    return;
                }

                for (let frame of getAllFramesInWindow(opener)) {

                    if (!isSameDomain(frame) || !frame.console || frame === window) {
                        continue;
                    }

                    for (let level of [ 'log', 'debug', 'info', 'warn', 'error' ]) {
                        let original = window.console[level];

                        if (!original) {
                            continue;
                        }

                        try {

                            window.console[level] = function() {

                                try {
                                    return frame.console[level].apply(frame.console, arguments);
                                } catch (err3) {
                                    // pass
                                }

                                return original.apply(this, arguments);
                            };

                        } catch (err2) {
                            // pass
                        }
                    }

                    return;
                }

            } catch (err) {
                // pass
            }
        }
    }


    /*  Watch For Close
        ---------------

        Watch both the parent window and the parent component window, if they close, close this window too.
    */

    watchForClose() {

        onCloseWindow(getParentComponentWindow(), () => {

            this.component.log(`parent_window_closed`);

            // We only need to close ourselves if we're a popup -- otherwise our parent window closing will automatically
            // close us, if we're an iframe

            if (this.context === CONTEXT_TYPES.POPUP) {
                return this.destroy();
            }
        });
    }

    enableAutoResize({ width = true, height = true } = {}) {
        this.autoResize = { width, height };
        this.watchForResize();
    }

    getAutoResize() {

        let width = false;
        let height = false;

        let autoResize = this.autoResize || this.component.autoResize;

        if (typeof autoResize === 'object') {
            width = Boolean(autoResize.width);
            height = Boolean(autoResize.height);
        } else if (autoResize) {
            width = true;
            height = true;
        }

        let element;

        if (autoResize.element) {
            element = getElement(autoResize.element);
        }

        if (!element) {
            // Believe me, I struggled. There's no other way.
            if (window.navigator.userAgent.match(/MSIE (9|10)\./)) {
                element = document.body;
            } else {
                element = document.documentElement;
            }
        }

        return { width, height, element };
    }

    watchForResize() {

        let { width, height, element } = this.getAutoResize();

        if (!width && !height) {
            return;
        }

        if (this.context === CONTEXT_TYPES.POPUP) {
            return;
        }

        if (this.watchingForResize) {
            return;
        }

        this.watchingForResize = true;

        return Promise.try(() => {

            return documentReady;

        }).then(() => {

            if (!dimensionsMatchViewport(element, { width, height })) {
                return this.resizeToElement(element, { width, height });
            }

        }).then(() => {

            return cycle(() => {
                return onDimensionsChange(element, { width, height }).then(dimensions => {
                    return this.resizeToElement(element, { width, height });
                });
            });
        });
    }


    exports() {

        let self = this;

        return {
            updateProps(props) {
                return self.setProps(props, this.origin, false);
            },

            close() {
                return self.destroy();
            }
        };
    }


    /*  Resize
        ------

        Resize the child window. Must be done on a user action like a click if we're in a popup
    */

    resize(width, height) {
        return Promise.resolve().then(() => {

            this.component.log(`resize`, { width, height });

            if (this.context === CONTEXT_TYPES.POPUP) {
                return; // window.resizeTo(width, height);
            }

            return this.sendToParent(POST_MESSAGE.RESIZE, { width, height });
        });
    }


    resizeToElement(el, { width, height }) {

        let history = [];

        let resize = () => {
            return Promise.try(() => {

                let tracker = trackDimensions(el, { width, height });
                let { dimensions } = tracker.check();

                for (let size of history) {

                    let widthMatch = !width || size.width === dimensions.width;
                    let heightMatch = !height || size.height === dimensions.height;

                    if (widthMatch && heightMatch) {
                        return;
                    }
                }

                history.push({ width: dimensions.width, height: dimensions.height });

                return this.resize(width ? dimensions.width : null, height ? dimensions.height : null).then(() => {

                    if (tracker.check().changed) {
                        return resize();
                    }
                });
            });
        };

        return resize();
    }


    /*  Hide
        ----

        Hide the window and any parent template
    */

    hide() {
        return this.sendToParent(POST_MESSAGE.HIDE);
    }

    show() {
        return this.sendToParent(POST_MESSAGE.SHOW);
    }

    userClose() {
        return this.close(CLOSE_REASONS.USER_CLOSED);
    }


    /*  Close
        -----

        Close the child window
    */

    close(reason = CLOSE_REASONS.CHILD_CALL) {

        this.component.log(`close_child`);

        // Ask our parent window to close us

        this.sendToParent(POST_MESSAGE.CLOSE, { reason }, {
            fireAndForget: true
        });
    }


    destroy() {
        $logger.flush().then(() => {
            window.close();
        });
    }


    /*  Focus
        -----

        Focus the child window. Must be done on a user action like a click
    */

    focus() {
        this.component.log(`focus`);

        window.focus();
    }


    /*  Error
        -----

        Send an error back to the parent
    */

    error(err) {

        this.component.logError(`error`, { error: err.stack || err.toString() });

        return this.sendToParent(POST_MESSAGE.ERROR, {
            error: err.stack || err.toString()
        });
    }
}

if (__CHILD_WINDOW_ENFORCE_LOG_LEVEL__) {

    if (isXComponentWindow() && window.console) {
        let logLevels = $logger.logLevels;

        for (let level of logLevels) {

            try {

                let original = window.console[level];

                if (!original || !original.apply) {
                    continue;
                }

                window.console[level] = function() {
                    try {
                        let logLevel = window.LOG_LEVEL;

                        if (!logLevel || logLevels.indexOf(logLevel) === -1) {
                            return original.apply(this, arguments);
                        }

                        if (logLevels.indexOf(level) > logLevels.indexOf(logLevel)) {
                            return;
                        }

                        return original.apply(this, arguments);

                    } catch (err2) {
                        // pass
                    }
                };

                if (level === 'info') {
                    window.console.log = window.console[level];
                }

            } catch (err) {
                // pass
            }
        }
    }
}
