/* @flow */

import { onCloseWindow, type CrossDomainWindowType } from 'cross-domain-utils/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { eventEmitter, type EventEmitterType } from 'belter/src';

import { ParentComponent } from '../parent';
import { RENDER_DRIVERS, type ContextDriverType } from '../parent/drivers';
import type { Component } from '../component';
import type { CancelableType, DimensionsType } from '../../types';
import { cleanup, type CleanupType } from '../../lib';

export type DelegatePropsType = {
    uid : string,
    dimensions : DimensionsType,
    onClose : () => ?ZalgoPromise<void>,
    onDisplay : () => ?ZalgoPromise<void>
};

export type DelegateOptionsType = {
    context : string,
    props : DelegatePropsType,
    overrides : {
        userClose : (string) => ZalgoPromise<void>,
        getDomain : () => ZalgoPromise<string>,
        error : (mixed) => ZalgoPromise<void>,
        on : (string, () => void) => CancelableType
    }
};

export class DelegateComponent<P>  {

    component : Component<P>
    source : CrossDomainWindowType
    context : string
    props : DelegatePropsType
    event : EventEmitterType
    clean : CleanupType

    userClose : (string) => ZalgoPromise<void>
    getDomain : () => ZalgoPromise<string>
    error : (mixed) => ZalgoPromise<void>
    on : (string, () => void) => CancelableType

    constructor(component : Component<P>, source : CrossDomainWindowType, options : DelegateOptionsType) {
        this.component = component;
        this.context = options.context;
        this.clean = cleanup(this);
        this.event = eventEmitter();

        this.props = {
            uid:        options.props.uid,
            dimensions: options.props.dimensions,
            onClose:    options.props.onClose,
            onDisplay:  options.props.onDisplay
        };

        for (let propName of component.getPropNames()) {
            // $FlowFixMe
            let prop = this.component.getProp(propName);

            if (prop.allowDelegate) {
                this.props[propName] = options.props[propName];
            }
        }

        this.userClose = options.overrides.userClose;
        this.getDomain = options.overrides.getDomain;
        this.error     = options.overrides.error;
        this.on        = options.overrides.on;

        let delegateOverrides = RENDER_DRIVERS[options.context].delegateOverrides;

        for (let key of Object.keys(delegateOverrides)) {
            // $FlowFixMe
            this[key] = ParentComponent.prototype[key];
        }

        ParentComponent.prototype.registerActiveComponent.call(this);

        this.watchForClose(source);
    }

    get driver() : ContextDriverType {

        if (!this.context) {
            throw new Error('Context not set');
        }

        return RENDER_DRIVERS[this.context];
    }

    watchForClose(source : CrossDomainWindowType) {
        let closeWindowListener = onCloseWindow(source, () => this.destroy(), 3000);
        this.clean.register('destroyCloseWindowListener', closeWindowListener.cancel);
    }

    getOverrides(context : string) : { [string] : mixed } {

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
