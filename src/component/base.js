import postRobot from 'post-robot/src';

import { once, copyProp } from '../lib';


function cleanup(obj) {

    let tasks = [];

    return {

        set(name, item) {
            obj[name] = item;
            this.register(() => {
                delete obj[name];
            });
            return item;
        },

        register(name, method) {

            if (!method) {
                method = name;
                name = undefined;
            }

            tasks.push({
                complete: false,

                name,

                run(err) {

                    if (this.complete) {
                        return;
                    }

                    method(err);

                    this.complete = true;
                }
            });
        },

        hasTasks() {
            return Boolean(tasks.filter(item => !item.complete).length);
        },

        all(err) {
            while (tasks.length) {
                tasks.pop().run(err);
            }
        },

        run(name, err) {
            for (let item of tasks) {
                if (item.name === name) {
                    item.run(err);
                }
            }
        }
    };
}



/*  Base Component
    --------------

    Methods that are common between child and parent components, but are not generic or uncoupled enough to live in
    a separate library.
*/

export class BaseComponent {

    constructor() {
        this.clean = cleanup(this);
    }

    addProp(options, name, def) {
        copyProp(options, this, name, def);
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

    listen(win, domain) {

        if (!win) {
            throw new Error(`[${this.component.tag}] window to listen to not set`);
        }

        if (!domain) {
            throw new Error(`Must pass domain to listen to`);
        }

        if (!this.listeners) {
            return;
        }

        let listeners = this.listeners();

        for (let listenerName of Object.keys(listeners)) {

            let listener = postRobot.on(listenerName, { window: win, domain, errorHandler: err => this.error(err) }, ({ source, data }) => {
                this.component.log(`listener_${listenerName.replace(/^xcomponent_/, '')}`);
                return listeners[listenerName].call(this, source, data);
            });

            this.clean.register(() => {
                listener.cancel();
            });
        }
    }
}
