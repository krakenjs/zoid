
import { ZalgoPromise } from 'zalgo-promise/src'; 

import { getDomain } from '../../lib';

export function normalizeChildProp(component, props, key, value) {

    let prop = component.props[key];

    if (!prop) {

        if (component.looseProps) {
            return value;
        }

        return;
    }

    if (typeof prop.childDef === 'function') {
        if (!value) {
            if (prop.getter) {
                return function() {
                    return ZalgoPromise.resolve(prop.childDef.call());
                };
            } else {
                return prop.childDef.call();
            }
        } else if (prop.getter) {
            let val = value;
            return function() {
                return val.apply(this, arguments).then(res => {
                    return res ? res : prop.childDef.call();
                });
            };
        }
    }

    return value;
}


export function normalizeChildProps(component, props, origin, required = true) {

    let result = {};

    for (let key of Object.keys(props)) {

        let prop = component.props[key];
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
        for (let key of Object.keys(component.props)) {
            if (!props.hasOwnProperty(key)) {
                result[key] = normalizeChildProp(component, props, key, props[key]);
            }
        }
    }

    return result;
}
