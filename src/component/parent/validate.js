/* @flow */

import type { Component } from '../component';
import type { PropDefinitionType, PropsType, PropDefinitionTypeEnum, PropTypeEnum } from '../component/props';

export function validateProp<T : PropTypeEnum, P, S : PropDefinitionTypeEnum>(prop : PropDefinitionType<T, P, S>, key : string, value : ?T, props : (PropsType & P), required : boolean = true) {

    let hasProp = value !== null && value !== undefined && value !== '';

    if (!hasProp) {
        if (required && prop.required !== false && !prop.hasOwnProperty('def')) {
            throw new Error(`Prop is required: ${key}`);
        }

        return;
    }

    if (value && typeof value.then === 'function' && prop.promise) {
        return;
    }

    if (prop.type === 'function') {

        if (!(typeof value === 'function')) {
            throw new Error(`Prop is not of type function: ${key}`);
        }

    } else if (prop.type === 'string') {

        if (typeof value !== 'string') {
            throw new Error(`Prop is not of type string: ${key}`);
        }

    } else if (prop.type === 'object') {

        // Since we're sending everything by post-message, everything must be json serializable

        try {
            JSON.stringify(value);
        } catch (err) {
            throw new Error(`Unable to serialize prop: ${key}`);
        }

    } else if (prop.type === 'number') {

        if (isNaN(parseInt(value, 10))) {
            throw new Error(`Prop is not a number: ${key}`);
        }
    }

    if (typeof prop.validate === 'function' && value) {
        prop.validate(value, props);
    }
}


/*  Validate Props
    --------------

    Validate user-defined props. Users can pass props down from the parent into the child component, but first we
    double check the values are what we expect, based on the props spec defined in the original component.
*/

export function validateProps<P>(component : Component<P>, props : PropsType, required : boolean = true) {

    props = props || {};

    if (props.env && typeof component.url === 'object' && !component.url[props.env]) {
        throw new Error(`Invalid env: ${props.env}`);
    }

    // Set aliases

    for (let key of component.getPropNames()) {

        // $FlowFixMe
        let prop = component.getProp(key);

        if (prop.alias && props.hasOwnProperty(prop.alias)) {

            let value = props[prop.alias];
            delete props[prop.alias];

            if (!props[key]) {
                props[key] = value;
            }
        }
    }

    // First make sure all of the props we were sent are actually valid prop names

    /*

    if (!component.looseProps) {
        for (let key of Object.keys(props)) {
            if (component.getPropNames().indexOf(key) === -1) {
                throw component.error(`Invalid prop: ${key}`);
            }
        }
    }

    */

    // Then loop over the props we expect, and make sure they're all present and valid

    for (let key of Object.keys(props)) {

        // $FlowFixMe
        let prop : PropDefinitionType<*, P> = component.getProp(key);
        let value = props[key];

        if (prop) {
            validateProp(prop, key, value, props, required);
        }
    }

    for (let key of component.getPropNames()) {

        // $FlowFixMe
        let prop : PropDefinitionType<*, P, *> = component.getProp(key);
        let value = props[key];

        if (prop && !props.hasOwnProperty(key)) {
            validateProp(prop, key, value, props, required);
        }
    }
}
