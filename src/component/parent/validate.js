
export function validateProp(prop, key, value, required = true) {

    let hasProp = value !== null && value !== undefined && value !== '';

    if (!hasProp) {
        if (required && prop.required !== false && !prop.hasOwnProperty('def')) {
            throw new Error(`Prop is required: ${key}`);
        }

        return;
    }

    if (value.then && prop.promise) {
        return;
    }

    if (prop.type === 'function') {

        if (!(value instanceof Function)) {
            throw new Error(`Prop is not of type function: ${key}`);
        }

    } else if (prop.type === 'string') {

        if (typeof value !== 'string') {

            if (!(prop.getter && (value instanceof Function || (value && value.then)))) {
                throw new Error(`Prop is not of type string: ${key}`);
            }
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

    if (typeof prop.validate === 'function') {
        prop.validate(value);
    }
}


/*  Validate Props
    --------------

    Validate user-defined props. Users can pass props down from the parent into the child component, but first we
    double check the values are what we expect, based on the props spec defined in the original component.
*/

export function validateProps(component, props, required = true) {

    props = props || {};

    // Set aliases

    for (let key of Object.keys(component.props)) {
        let prop = component.props[key];

        if (prop.alias && props.hasOwnProperty(prop.alias)) {

            let value = props[prop.alias];
            delete props[prop.alias];

            if (!props[key]) {
                props[key] = value;
            }
        }
    }

    // First make sure all of the props we were sent are actually valid prop names

    for (let key of Object.keys(props)) {
        if (!component.props.hasOwnProperty(key)) {
            throw new Error(`[${component.tag}] Invalid prop: ${key}`);
        }
    }

    // Then loop over the props we expect, and make sure they're all present and valid

    for (let key of Object.keys(component.props)) {

        let prop = component.props[key];
        let value = props[key];

        validateProp(prop, key, value, required);
    }
}


/*  Validate
    --------

    Validate parent component options
*/

export function validate(component, options) {

    let props = options.props || {};

    if (props.env && component.envUrls && !component.envUrls[props.env]) {
        throw new Error(`Invalid env: ${props.env}`);
    }
}