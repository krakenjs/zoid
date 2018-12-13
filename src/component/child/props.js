/* @flow */

import { getDomain, isSameDomain, type CrossDomainWindowType } from 'cross-domain-utils/src';

import type { Component } from '../component';
import type { BuiltInPropsType, MixedPropDefinitionType } from '../component/props';

export function normalizeChildProp<T, P>(component : Component<P>, props : (BuiltInPropsType & P), key : string, value : T) : ?T  {

    // $FlowFixMe
    let prop : MixedPropDefinitionType<P> = component.getProp(key);

    if (!prop) {
        return value;
    }

    if (typeof prop.childDecorate === 'function') {
        return prop.childDecorate(value);
    }

    return value;
}


export function normalizeChildProps<P>(parentComponentWindow : CrossDomainWindowType, component : Component<P>, props : (BuiltInPropsType & P), origin : string, required : boolean = true) : (BuiltInPropsType & P) {

    let result = {};

    // $FlowFixMe
    for (let key of Object.keys(props)) {
        let prop = component.getProp(key);

        if (prop && prop.sameDomain && (origin !== getDomain(window) || !isSameDomain(parentComponentWindow))) {
            continue;
        }

        let value = normalizeChildProp(component, props, key, props[key]);

        result[key] = value;
        if (prop && prop.alias && !result[prop.alias]) {
            result[prop.alias] = value;
        }
    }

    if (required) {
        for (let key of component.getPropNames()) {
            if (!props.hasOwnProperty(key)) {
                result[key] = normalizeChildProp(component, props, key, props[key]);
            }
        }
    }

    // $FlowFixMe
    return result;
}
