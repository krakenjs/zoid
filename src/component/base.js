import postRobot from 'post-robot/src';

import { once } from '../lib';
import { IntegrationError } from '../error';


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


    /*  Try Catch
        ---------

        Returns a new method which wraps the original call in a try/catch, otherwise delegates to this.onError
    */

    tryCatch(method, doOnce) {

        let self = this;
        let errored = false;

        let wrapper = function wrapper() {

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

                return self.error(new Error(`[${this.component.tag}] Child lifecycle method threw an error`));
            }
        };

        if (doOnce !== false) {
            wrapper = once(wrapper);
        }

        return wrapper;
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

            let listener = postRobot.on(listenerName, { window: win, errorHandler: err => this.error(err) }, (source, data) => {
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