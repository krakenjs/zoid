import postRobot from 'post-robot/src';

import { b64encode, b64decode, extend, uniqueID } from '../util';
import { CONSTANTS } from '../constants';
import { IntegrationError } from '../error';

export class BaseComponent {

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

            this.postListeners = this.postListeners || [];
            this.postListeners.push(listener);
        }
    }

    cleanupListeners() {
        for (let listener of this.postListeners) {
            listener.cancel();
        }

        this.postListeners = [];
    }
}