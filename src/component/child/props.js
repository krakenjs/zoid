/* @flow */

import { getDomain } from '../../lib';

import { type Component } from '../component';
import { type BuiltInPropsType } from '../component/props';

export function normalizeChildProp<T : mixed, P>(component : Component<P>, props : (BuiltInPropsType & P), key : string, value : T) : T  {

    let prop = component.getProp(key);

    if (!prop) {

        if (component.looseProps) {
            return value;
        }

        throw new Error(`Unrecognized prop: ${ key }`);
    }

    if (typeof prop.childDecorate === 'function') {
        value = prop.childDecorate(value);
    }

    return value;
}


export function normalizeChildProps<P>(component : Component<P>, props : (BuiltInPropsType & P), origin : string, required : boolean = true) : (BuiltInPropsType & P) {

    let result = {};

    for (let key of Object.keys(props)) {

        let prop = component.getProp(key);
        let value = props[key];

        if (prop && prop.sameDomain && origin !== getDomain(window)) {
            continue;
        }

        result[key] = normalizeChildProp(component, props, key, value);

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
