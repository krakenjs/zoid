/* @flow */

import { onCloseWindow, type CrossDomainWindowType } from 'cross-domain-utils/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { ProxyWindow } from 'post-robot/src';
import { cleanup, type CleanupType, type EventEmitterType } from 'belter/src';

import { ParentComponent } from '../parent';
import { RENDER_DRIVERS, type ContextDriverType } from '../parent/drivers';
import type { Component } from '../component';

export type DelegatePropsType = {|
    onClose : () => ?ZalgoPromise<void>,
    onDisplay : () => ?ZalgoPromise<void>,
    window : ?ProxyWindow
|};

export type DelegateOptionsType = {|
    context : string,
    props : DelegatePropsType,
    overrides : {
        close : () => ZalgoPromise<void>,
        onError : (mixed) => ZalgoPromise<void>,
        event : EventEmitterType
    }
|};

export type DelegateReturnType = {|
    overrides : Object,
    destroy : () => ZalgoPromise<void>
|};

export class DelegateComponent<P>  {

    component : Component<P>
    source : CrossDomainWindowType
    context : string
    driver : ContextDriverType
    props : DelegatePropsType
    clean : CleanupType

    focus : () => ZalgoPromise<void>
    resize : ({ width? : ?number, height? : ?number }) => ZalgoPromise<void>
    renderTemplate : Function

    close : () => ZalgoPromise<void>
    onError : (mixed) => ZalgoPromise<void>
    event : EventEmitterType

    constructor(component : Component<P>, source : CrossDomainWindowType, options : DelegateOptionsType) {
        this.component = component;
        this.context = options.context;
        this.driver = RENDER_DRIVERS[options.context];
        this.clean = cleanup(this);
        
        this.focus = ParentComponent.prototype.focus;
        this.resize = ParentComponent.prototype.resize;
        this.renderTemplate = ParentComponent.prototype.renderTemplate;

        // $FlowFixMe
        this.props = {};
        
        for (const propName of Object.keys(options.props)) {
            const propDef = this.component.getPropDefinition(propName);
            if (propDef && propDef.allowDelegate && options.props[propName]) {
                // $FlowFixMe
                this.props[propName] = options.props[propName];
            }
        }

        this.close   = options.overrides.close;
        this.onError = options.overrides.onError;
        this.event   = options.overrides.event;

        this.component.registerActiveComponent(this);
        this.clean.register(() => this.component.destroyActiveComponent(this));

        this.watchForSourceClose(source);
    }

    getDelegate() : DelegateReturnType {
        return {
            overrides: this.getOverrides(),
            destroy:   () => this.destroy()
        };
    }

    watchForSourceClose(source : CrossDomainWindowType) {
        const closeSourceWindowListener = onCloseWindow(source, () => this.destroy(), 3000);
        this.clean.register(closeSourceWindowListener.cancel);
    }

    getOverrides() : { [string] : mixed } {
        const overrides = {};
        const self = this;

        for (const key of this.driver.delegate) {
            overrides[key] = function delegateOverride() : mixed {
                // $FlowFixMe
                return ParentComponent.prototype[key].apply(self, arguments);
            };
            overrides[key].__name__ = key;
        }

        return overrides;
    }

    destroy() : ZalgoPromise<void> {
        return this.clean.all();
    }
}
