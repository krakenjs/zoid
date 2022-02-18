/* @flow */

import { getDomain, isSameDomain, type CrossDomainWindowType } from 'cross-domain-utils/src';

import type { PropsDefinitionType, PropsType, ChildPropsType } from '../component/props';

import type { ChildHelpers } from './index';

// $FlowFixMe
export function normalizeChildProp<P, T, X>(propsDef : PropsDefinitionType<P, X>, props : PropsType<P>, key : string, value : ?T, helpers : ChildHelpers<P, X>) : ?T  {
    if (!propsDef.hasOwnProperty(key)) {
        return value;
    }

    const prop = propsDef[key];

    if (typeof prop.childDecorate === 'function') {
        const { uid, tag, close, focus, onError, onProps, resize, getParent, getParentDomain, show, hide, export: xport, getSiblings } = helpers;
        const decoratedValue = prop.childDecorate({ value, uid, tag, close, focus, onError, onProps, resize, getParent, getParentDomain, show, hide, export: xport, getSiblings });

        // $FlowFixMe
        return decoratedValue;
    }

    return value;
}

// eslint-disable-next-line max-params
export function normalizeChildProps<P, X>(parentComponentWindow : CrossDomainWindowType, propsDef : PropsDefinitionType<P, X>, props : PropsType<P>, origin : string, helpers : ChildHelpers<P, X>, isUpdate : boolean = false) : ChildPropsType<P, X> {

    const result = {};

    for (const key of Object.keys(props)) {
        const prop = propsDef[key];

        if (prop && prop.sameDomain && (origin !== getDomain(window) || !isSameDomain(parentComponentWindow))) {
            continue;
        }

        // $FlowFixMe
        const value = normalizeChildProp(propsDef, props, key, props[key], helpers);

        result[key] = value;
        if (prop && prop.alias && !result[prop.alias]) {
            result[prop.alias] = value;
        }
    }

    if (!isUpdate) {
        for (const key of Object.keys(propsDef)) {
            if (!props.hasOwnProperty(key)) {
                result[key] = normalizeChildProp(propsDef, props, key, undefined, helpers);
            }
        }
    }

    // $FlowFixMe
    return result;
}
