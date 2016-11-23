
import { logger } from '../../lib';

import postRobot from 'post-robot/src';
import { SyncPromise as Promise } from 'sync-browser-mocks/src/promise';
import { BaseComponent } from '../base';
import { getParentComponentWindow, getComponentMeta, getParentDomain } from '../window';
import { extend, onCloseWindow, replaceObject, get, onDimensionsChange, trackDimensions } from '../../lib';
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

        this.component.log(`construct_child`);

        // The child can specify some default props if none are passed from the parent. This often makes integrations
        // a little more seamless, as applicaiton code can call props.foo() without worrying about whether the parent
        // has provided them or not, and fall-back to some default behavior.

        this.onPropHandlers = [];

        this.setProps(this.getInitialProps(), getParentDomain());

        this.component.log(`init_child`);

        this.setWindows();

        this.sendLogsToOpener();

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

            if (this.component.autoResize) {
                this.watchForResize();
            }

            return this;

        });
    }


    init() {
        return this.onInit;
    }


    onProps(handler) {
        this.onPropHandlers.push(handler);
    }


    getInitialProps() {
        let componentMeta = getComponentMeta();
        let self = this;

        if (componentMeta) {
            let props = componentMeta.props;

            if (props.type === INITIAL_PROPS.RAW) {
                props = props.value;
            } else if (props.type === INITIAL_PROPS.UID) {
                props = getParentComponentWindow().__xcomponent__.props[props.value];
            } else {
                throw new Error(`Unrecognized props type: ${props.type}`);
            }

            if (!props) {
                throw new Error(`Initial props not found`);
            }

            return replaceObject(props, (value, key, fullKey) => {
                if (value && value.__type__ === '__function__') {
                    return function() {
                        return self.onInit.then(() => {
                            let original = get(self.props, fullKey);
                            return original.apply(this, arguments);
                        });
                    };
                }
            });
        }
    }


    setProps(props = {}, origin) {
        window.xprops = this.props = this.props || {};
        extend(this.props, normalizeChildProps(this.component, props, origin));
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

        return postRobot.send(getParentComponentWindow(), name, data, { domain: getParentDomain() });
    }


    /*  Set Windows
        -----------

        Determine the parent window, and the parent component window. Note -- these may be different, if we were
        rendered using renderToParent.
    */

    setWindows() {


        // Ensure we do not try to .attach() multiple times for the same component on the same page

        if (window.__activeXComponent__) {
            throw new Error(`[${this.component.tag}] Can not attach multiple components to the same window`);
        }

        window.__activeXComponent__ = this;

        // Get the direct parent window

        if (!getParentComponentWindow()) {
            throw new Error(`[${this.component.tag}] Can not find parent window`);
        }

        let componentMeta = getComponentMeta();

        if (componentMeta.tag !== this.component.tag) {
            throw new Error(`[${this.component.tag}] Parent is ${componentMeta.tag} - can not attach ${this.component.tag}`);
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
        try {
            let opener = postRobot.winutil.getOpener(window);

            if (!opener || !window.console) {
                return;
            }

            for (let frame of postRobot.winutil.getAllFramesInWindow(opener)) {

                if (!postRobot.winutil.isSameDomain(frame) || !frame.console) {
                    continue;
                }

                for (let level of [ 'log', 'debug', 'info', 'warn', 'error' ]) {
                    let original = window.console[level];

                    if (!original) {
                        continue;
                    }

                    window.console[level] = function() {

                        try {
                            frame.console[level].apply(frame, arguments);
                        } catch (err2) {
                            // pass
                        }

                        return original.apply(this, arguments);
                    };
                }

                return;
            }

        } catch (err) {
            // pass
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

    watchForResize() {

        if (!this.component.dimensions) {
            return;
        }

        if (this.context === CONTEXT_TYPES.POPUP) {
            return;
        }

        let el = document.documentElement;

        // Believe me, I strugged. There's no other way.
        if (window.navigator.userAgent.match(/MSIE (9|10)\./)) {
            el = document.body;
        }

        let resize = (width, height, history = []) => {
            return Promise.try(() => {

                for (let size of history) {
                    if (size.width === width && size.height === height) {
                        return;
                    }
                }

                history.push({ width, height });

                let tracker = trackDimensions(el);

                return this.resize(width, height).then(() => {

                    let { changed, dimensions } = tracker.check();

                    if (changed) {
                        return resize(dimensions.width, dimensions.height, history);
                    }
                });
            });


        };

        let watcher = () => {
            onDimensionsChange(el).then(dimensions => {
                return resize(dimensions.width, dimensions.height);

            }).then(() => {
                watcher();
            });
        };

        watcher();
    }


    exports() {

        let self = this;

        return {
            updateProps(props) {
                return self.setProps(props, this.origin);
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


    /*  Hide
        ----

        Hide the window and any parent template
    */

    hide() {
        return this.sendToParent(POST_MESSAGE.HIDE);
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
        logger.flush().then(() => {
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

        this.component.log(`error`, { error: err.stack || err.toString() });

        return this.sendToParent(POST_MESSAGE.ERROR, {
            error: err.stack || err.toString()
        });
    }
}
