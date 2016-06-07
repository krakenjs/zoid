import postRobot from 'post-robot/src';

import { b64encode, b64decode, extend, uniqueID } from '../lib';
import { CONSTANTS } from '../constants';
import { IntegrationError } from '../error';

export class BaseComponent {

    registerForCleanup(task) {
        this.cleanupTasks = this.cleanupTasks || [];
        this.cleanupTasks.push(task);
        return this;
    }

    cleanup() {
        if (this.cleanupTasks) {
            for (let task of this.cleanupTasks) {
                task();
            }
            this.cleanupTasks = [];
        }
    }

    setForCleanup(key, value) {
        this[key] = value;
        this.registerForCleanup(() => {
            delete this[key];
        });
    }

    getChildWindowName(props = {}) {
        return b64encode(JSON.stringify(extend({
            type: CONSTANTS.XCOMPONENT,
            parent: window.name,
            id: uniqueID()
        }, props)));
    }

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

    getWindowProps() {
        let winProps;

        try {
            winProps = JSON.parse(b64decode(window.name));
        } catch (err) {
            return;
        }

        if (!winProps || winProps.type !== CONSTANTS.XCOMPONENT) {
            return;
        }

        return winProps;
    }

    listen(win) {

        if (!win) {
            throw new Error(`[${this.component.tag}] window to listen to not set`);
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

    validateProps(props) {

        for (let key of Object.keys(this.component.props)) {

            let prop = this.component.props[key];
            let value = props[key];

            let hasProp = props.hasOwnProperty(key) && value !== null && value !== undefined && value !== '';

            if (!hasProp) {

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