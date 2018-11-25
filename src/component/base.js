/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { eventEmitter, type EventEmitterType, stringifyError, noop } from 'belter/src';

import type { CancelableType } from '../types';

import type { Component } from './component';

type CleanupType<T : mixed> = {
    set : (string, T) => T,
    register : (string | Function, ?Function) => void,
    hasTasks : () => boolean,
    all : () => ZalgoPromise<void>,
    run : (string) => ZalgoPromise<void>
};

function cleanup(obj : Object) : CleanupType<*> {

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

    clean : CleanupType<*>
    event : EventEmitterType
    component : Component<P>

    constructor() {
        this.clean = cleanup(this);
        this.event = eventEmitter();
    }

    on(eventName : string, handler : () => void) : CancelableType {
        return this.event.on(eventName, handler);
    }
    
    error(err : mixed) : ZalgoPromise<void> {
        throw new Error(`Expected error to be implemented - got ${ stringifyError(err) }`);
    }
}
