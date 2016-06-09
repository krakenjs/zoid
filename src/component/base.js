import postRobot from 'post-robot/src';

import { b64encode, b64decode, extend } from '../lib';
import { CONSTANTS } from '../constants';
import { IntegrationError } from '../error';

/*  Internal Props
    --------------

    We define and use certain props by default, for configuration and events that are used at the framework level.
    These follow the same format as regular props, and are classed as reserved words that may not be overriden by users.
*/

export const internalProps = {

    // A custom url to use to render the component

    url: {
        type: 'string',
        required: false
    },

    // The desired env in which the component is being rendered. Used to determine the correct url to use from envUrls

    env: {
        type: 'string',
        required: false
    },

    // A millisecond timeout before onTimeout is called

    timeout: {
        type: 'number',
        required: false
    },

    // When we get an INIT message from the child

    onEnter: {
        type: 'function',
        required: false,
        noop: true
    },

    // When the user closes the component. Defaults to onError if no handler passed.

    onClose: {
        type: 'function',
        required: false,
        noop: true,
        once: true,
        defaultProp: 'onError'
    },

    // When we time-out before getting an INIT message from the child. Defaults to onError if no handler passed.

    onTimeout: {
        type: 'function',
        required: false,
        noop: true,
        once: true,
        defaultProp: 'onError'
    },

    // When the component experiences an error

    onError: {
        type: 'function',
        required: false,
        noop: true,
        once: true
    }
};


/*  Base Component
    --------------

    Methods that are common between child and parent components, but are not generic or uncoupled enough to live in
    a separate library.
*/

export class BaseComponent {


    /*  Register For Cleanup
        --------------------

        Register a method that will be called to do some cleanup whenever this.cleanup() is called
    */

    registerForCleanup(task) {
        this.cleanupTasks = this.cleanupTasks || [];
        this.cleanupTasks.push(task);
        return this;
    }


    /*  Cleanup
        -------

        Call all of the methods registered with this.registerForCleanup
    */

    cleanup() {
        if (this.cleanupTasks) {
            for (let task of this.cleanupTasks) {
                task();
            }
            this.cleanupTasks = [];
        }
    }


    /*  Set For Cleanup
        ---------------

        Set a key on this which will be auto-deleted when this.cleanup() is called
    */

    setForCleanup(key, value) {
        this[key] = value;
        this.registerForCleanup(() => {
            delete this[key];
        });
    }


    /*  Build Child Window Name
        -----------------------

        Build a name for our child window. This should identify the following things to the child:

        - That the window was created by, and is owned by xcomponent
        - The name of the child's parent. This is so the child can identify which window created it, even when we do a
          renderToParent, in which case the true parent may actually be a sibling frame in the window hierarchy

        We base64 encode the window name so IE doesn't die when it encounters any characters that it doesn't like.
    */

    buildChildWindowName(parent, props = {}) {
        return b64encode(JSON.stringify(extend({
            type:   CONSTANTS.XCOMPONENT,
            id: this.id,
            parent: parent
        }, props)));
    }


    /*  Parse Window Name
        -----------------

        The inverse of buildChildWindowName. Base64 decodes and json parses the window name to get the original props
        passed down, including the parent name. Only accepts window names built by xcomponent
    */

    parseWindowName(name) {
        let winProps;

        try {
            winProps = JSON.parse(b64decode(name));
        } catch (err) {
            return;
        }

        if (!winProps || winProps.type !== CONSTANTS.XCOMPONENT) {
            return;
        }

        return winProps;
    }


    /*  Try Catch
        ---------

        Returns a new method which wraps the original call in a try/catch, otherwise delegates to this.onError
    */

    tryCatch(method) {

        let self = this;
        let errored = false;

        return function wrapper() {

            if (errored) {
                return;
            }

            try {
                return method.apply(this, arguments);
            } catch (err) {
                errored = true;

                if (err instanceof IntegrationError) {
                    return self.error(err);
                }

                console.error(err.stack || err.toString());
                return self.error(new Error(`[${this.component.tag}] Child callback method threw an error`));
            }
        };
    }


    /*  Listen
        ------

        Listen for any post messages defined in this.listeners(). All (most) of our communication is done via
        post-messages, so this sets up an easy way to create a collection of listeners in one go.

        All post-messaging is done using post-robot.
    */

    listen(win) {

        if (!win) {
            throw new Error(`[${this.component.tag}] window to listen to not set`);
        }

        if (!this.listeners) {
            return;
        }

        let listeners = this.listeners();

        for (let listenerName of Object.keys(listeners)) {

            let listener = postRobot.on(listenerName, { window: win }, (source, data) => {
                return listeners[listenerName].call(this, source, data);
            });

            this.registerForCleanup(() => {
                listener.cancel();
            });
        }
    }


    /*  Validate Props
        --------------

        Validate user-defined props. Users can pass props down from the parent into the child component, but first we
        double check the values are what we expect, based on the props spec defined in the original component.
    */

    validateProps(props) {

        // First make sure all of the props we were sent are actually valid prop names

        for (let key of Object.keys(props)) {
            if (!this.component.props.hasOwnProperty(key)) {
                throw new Error(`[${this.component.tag}] Invalid prop: ${key}`);
            }
        }

        // Then loop over the props we expect, and make sure they're all present and valid

        for (let key of Object.keys(this.component.props)) {

            let prop = this.component.props[key];
            let value = props[key];

            let hasProp = props.hasOwnProperty(key) && value !== null && value !== undefined && value !== '';

            if (!hasProp) {

                // Props can either be optional, or specify a default value

                if (prop.required !== false && !prop.hasOwnProperty('def')) {
                    throw new Error(`[${this.component.tag}] Prop is required: ${key}`);
                }

                continue;
            }

            if (prop.type === 'function') {

                if (!(value instanceof Function)) {
                    throw new Error(`[${this.component.tag}] Prop is not of type function: ${key}`);
                }

            } else if (prop.type === 'string') {

                if (typeof value !== 'string') {
                    throw new Error(`[${this.component.tag}] Prop is not of type string: ${key}`);
                }

            } else if (prop.type === 'object') {

                // Since we're sending everything by post-message, everything must be json serializable

                try {
                    JSON.stringify(value);
                } catch (err) {
                    throw new Error(`[${this.component.tag}] Unable to serialize prop: ${key}`);
                }

            } else if (prop.type === 'number') {

                if (isNaN(parseInt(value, 10))) {
                    throw new Error(`[${this.component.tag}] Prop is not a number: ${key}`);
                }
            }
        }
    }
}