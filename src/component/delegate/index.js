/* @flow */

import { onCloseWindow, type CrossDomainWindowType } from 'cross-domain-utils/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { eventEmitter, type EventEmitterType } from 'belter/src';
import { ProxyWindow } from 'post-robot/src';

import { ParentComponent } from '../parent';
import { RENDER_DRIVERS, type ContextDriverType } from '../parent/drivers';
import type { Component } from '../component';
import type { CancelableType } from '../../types';
import { cleanup, type CleanupType } from '../../lib';

export type DelegatePropsType = {
    onClose : () => ?ZalgoPromise<void>,
    onDisplay : () => ?ZalgoPromise<void>,
    window : ?ProxyWindow
};

export type DelegateOptionsType = {
    context : string,
    props : DelegatePropsType,
    overrides : {
        userClose : (string) => ZalgoPromise<void>,
        error : (mixed) => ZalgoPromise<void>,
        on : (string, () => void) => CancelableType
    }
};

export type DelegateReturnType = {
    overrides : Object,
    destroy : () => ZalgoPromise<void>
};

export class DelegateComponent<P>  {

    component : Component<P>
    source : CrossDomainWindowType
    context : string
    props : DelegatePropsType
    event : EventEmitterType
    clean : CleanupType
    uid : string

    userClose : (string) => ZalgoPromise<void>
    getDomain : () => ZalgoPromise<string>
    error : (mixed) => ZalgoPromise<void>
    on : (string, () => void) => CancelableType

    constructor(component : Component<P>, source : CrossDomainWindowType, options : DelegateOptionsType) {
        this.component = component;
        this.context = options.context;
        this.clean = cleanup(this);
        this.event = eventEmitter();

        // $FlowFixMe
        this.destroyComponent = ParentComponent.prototype.destroyComponent;
        // $FlowFixMe
        this.resize = ParentComponent.prototype.resize;
        // $FlowFixMe
        this.renderTemplate = ParentComponent.prototype.renderTemplate;
        // $FlowFixMe
        this.registerActiveComponent = ParentComponent.prototype.registerActiveComponent;

        // $FlowFixMe
        this.props = {};
        for (let propName of this.component.getPropNames()) {
            if (options.props[propName] && this.component.getProp(propName).allowDelegate) {
                this.props[propName] = options.props[propName];
            }
        }

        this.userClose = options.overrides.userClose;
        this.error     = options.overrides.error;
        this.on        = options.overrides.on;

        // $FlowFixMe
        this.registerActiveComponent();

        this.watchForSourceClose(source);
    }

    getDelegate() : DelegateReturnType {
        return {
            overrides: this.getOverrides(),
            destroy:   () => this.destroy()
        };
    }

    get driver() : ContextDriverType {
        return RENDER_DRIVERS[this.context];
    }

    watchForSourceClose(source : CrossDomainWindowType) {
        let closeSourceWindowListener = onCloseWindow(source, () => this.destroy(), 3000);
        this.clean.register('destroyCloseSourceWindowListener', closeSourceWindowListener.cancel);
    }

    getOverrides() : { [string] : mixed } {
        let context = this.context;
        let delegateOverrides = RENDER_DRIVERS[context].delegateOverrides;

        let overrides = {};

        let self = this;

        for (let key of Object.keys(delegateOverrides)) {
            overrides[key] = function delegateOverride() : mixed {
                // $FlowFixMe
                return ParentComponent.prototype[key].apply(self, arguments);
            };
        }

        return overrides;
    }

    destroy() : ZalgoPromise<void> {
        return this.clean.all();
    }
}
