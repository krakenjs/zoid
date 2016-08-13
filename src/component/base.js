import postRobot from 'post-robot/src';

import { once } from '../lib';


/*  Base Component
    --------------

    Methods that are common between child and parent components, but are not generic or uncoupled enough to live in
    a separate library.
*/

export class BaseComponent {

    addProp(options, name, def) {

        if (options.hasOwnProperty(name)) {
            let descriptor = Object.getOwnPropertyDescriptor(options, name);
            Object.defineProperty(this, name, descriptor);

        } else {
            this[name] = def;
        }
    }


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
        while (this.cleanupTasks && this.cleanupTasks.length) {
            let task = this.cleanupTasks.pop();
            task();
        }
    }


    /*  Has Cleanup Tasks
        -----------------

        Returns whether or not there is any state to be cleaned up
    */

    hasCleanupTasks() {
        return Boolean(this.cleanupTasks.length);
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
                return self.error(err);
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
                this.component.log(`listener_${listenerName.replace(/^xcomponent_/, '')}`);
                return listeners[listenerName].call(this, source, data);
            });

            this.registerForCleanup(() => {
                listener.cancel();
            });
        }
    }
}
