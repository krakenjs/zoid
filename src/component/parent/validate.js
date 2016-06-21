

/*  Validate Props
    --------------

    Validate user-defined props. Users can pass props down from the parent into the child component, but first we
    double check the values are what we expect, based on the props spec defined in the original component.
*/

export function validateProps(component, props) {

    props = props || {};

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

        let hasProp = props.hasOwnProperty(key) && value !== null && value !== undefined && value !== '';

        if (!hasProp) {

            // Props can either be optional, or specify a default value

            if (prop.required !== false && !prop.hasOwnProperty('def')) {
                throw new Error(`[${component.tag}] Prop is required: ${key}`);
            }

            continue;
        }

        if (prop.type === 'function') {

            if (!(value instanceof Function)) {
                throw new Error(`[${component.tag}] Prop is not of type function: ${key}`);
            }

        } else if (prop.type === 'string') {

            if (typeof value !== 'string') {
                throw new Error(`[${component.tag}] Prop is not of type string: ${key}`);
            }

        } else if (prop.type === 'object') {

            // Since we're sending everything by post-message, everything must be json serializable

            try {
                JSON.stringify(value);
            } catch (err) {
                throw new Error(`[${component.tag}] Unable to serialize prop: ${key}`);
            }

        } else if (prop.type === 'number') {

            if (isNaN(parseInt(value, 10))) {
                throw new Error(`[${component.tag}] Prop is not a number: ${key}`);
            }
        }
    }
}


/*  Validate
    --------

    Validate parent component options
*/

export function validate(component, options) {
    return validateProps(component, options.props || {});
}