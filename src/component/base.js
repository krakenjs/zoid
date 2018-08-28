/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { on } from 'post-robot/src';
import { type CrossDomainWindowType } from 'cross-domain-utils/src';

import { copyProp, eventEmitter, type EventEmitterType, stringifyError, noop } from '../lib';
import type { CancelableType } from '../types';

import type { Component } from './component';

type CleanupType = {
    set : <T : mixed >(string, T) => T, // eslint-disable-line no-undef
    register : (string | Function, ?Function) => void,
    hasTasks : () => boolean,
    all : () => ZalgoPromise<void>,
    run : (string) => ZalgoPromise<void>
};

function cleanup(obj : Object) : CleanupType {

    let tasks = [];
    let cleaned = false;

    return {

        set<T : mixed>(name : string, item : T) : T {

            if (cleaned) {
                return item;
            }

            obj[name] = item;
            this.register(() => {
                delete obj[name];
            });
            return item;
        },

        register(name : string | Function, method : ?Function) {

            if (typeof name === 'function') {
                method = name;
                name = '<anonymous-cleanup-handler>';
            }

            if (typeof method !== 'function') {
                throw new TypeError(`Expected to be passed function to clean.register`);
            }

            if (cleaned) {
                method();
                return;
            }

            tasks.push({
                complete: false,

                name,

                run() {

                    if (this.complete) {
                        return;
                    }

                    this.complete = true;

                    if (method) {
                        method();
                    }
                }
            });
        },

        hasTasks() : boolean {
            return Boolean(tasks.filter(item => !item.complete).length);
        },

        all() : ZalgoPromise<void> {
            let results = [];

            cleaned = true;

            while (tasks.length) {
                results.push(tasks.pop().run());
            }

            return ZalgoPromise.all(results).then(() => { /* pass */ });
        },

        run(name : string) : ZalgoPromise<void> {
            let results = [];

            for (let item of tasks) {
                if (item.name === name) {
                    results.push(item.run());
                }
            }

            return ZalgoPromise.all(results).then(noop);
        }
    };
}


/*  Base Component
    --------------

    Methods that are common between child and parent components, but are not generic or uncoupled enough to live in
    a separate library.
*/

export class BaseComponent<P> {

    clean : CleanupType
    event : EventEmitterType
    component : Component<P>

    constructor() {
        this.clean = cleanup(this);
        this.event = eventEmitter();
    }

    addProp(options : Object, name : string, def : mixed) {
        copyProp(options, this, name, def);
    }

    on(eventName : string, handler : () => void) : CancelableType {
        return this.event.on(eventName, handler);
    }

    listeners() {
        throw new Error(`Expected listeners to be implemented`);
    }

    error(err : mixed) : ZalgoPromise<void> {
        throw new Error(`Expected error to be implemented - got ${ stringifyError(err) }`);
    }

    /*  Listen
        ------

        Listen for any post messages defined in this.listeners(). All (most) of our communication is done via
        post-messages, so this sets up an easy way to create a collection of listeners in one go.

        All post-messaging is done using post-robot.
    */

    listen(win : CrossDomainWindowType, domain : string | RegExp) {

        if (!win) {
            throw this.component.createError(`window to listen to not set`);
        }

        if (!domain) {
            throw new Error(`Must pass domain to listen to`);
        }

        if (!this.listeners) {
            return;
        }

        let listeners = this.listeners();

        for (let listenerName of Object.keys(listeners)) {

            let name = listenerName.replace(/^zoid_/, '');

            let errorHandler = (err) => {
                this.error(err);
            };

            let listener = on(listenerName, { window: win, domain, errorHandler }, ({ source, data }) => {
                this.component.log(`listener_${ name }`);
                return listeners[listenerName].call(this, source, data);
            });

            let errorListener = on(listenerName, { window: win, errorHandler }, ({ origin }) => {
                this.component.logError(`unexpected_listener_${ name }`, { origin, domain: domain.toString() });
                this.error(new Error(`Unexpected ${ name } message from domain ${ origin } -- expected message from ${ domain.toString() }`));
            });

            this.clean.register(() => {
                listener.cancel();
                errorListener.cancel();
            });
        }
    }
}
