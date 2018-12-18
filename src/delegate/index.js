/* @flow */

import { onCloseWindow, type CrossDomainWindowType } from 'cross-domain-utils/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { ProxyWindow } from 'post-robot/src';
import { cleanup, type CleanupType } from 'belter/src';

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
        focus : () => ZalgoPromise<void>
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

    close : () => ZalgoPromise<void>
    onError : (mixed) => ZalgoPromise<void>
    focus : () => ZalgoPromise<void>

    constructor(component : Component<P>, source : CrossDomainWindowType, options : DelegateOptionsType) {
        this.component = component;
        this.context = options.context;
        this.driver = RENDER_DRIVERS[options.context];
        this.clean = cleanup(this);

        // $FlowFixMe
        this.close = ParentComponent.prototype.close;
        // $FlowFixMe
        this.resize = ParentComponent.prototype.resize;
        // $FlowFixMe
        this.renderTemplate = ParentComponent.prototype.renderTemplate;

        // $FlowFixMe
        this.props = {};
        for (const propName of Object.keys(options.props)) {
            if (options.props[propName] && this.component.getPropDefinition(propName) && this.component.getPropDefinition(propName).allowDelegate) {
                this.props[propName] = options.props[propName];
            }
        }

        this.close     = options.overrides.close;
        this.onError   = options.overrides.onError;
        this.focus     = options.overrides.focus;
        
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
        }

        return overrides;
    }

    destroy() : ZalgoPromise<void> {
        return this.clean.all();
    }
}
