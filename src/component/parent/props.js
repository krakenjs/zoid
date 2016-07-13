
import { urlEncode } from '../../lib';
import { normalizeProps } from '../props';


/*  Props to Query
    --------------

    Turn props into an initial query string to open the component with

    string -> string
    bool   -> 1
    object -> json
    number -> string
*/

export function propsToQuery(propsDef, props) {

    return Object.keys(props).map(key => {

        let value = props[key];

        if (!value) {
            return;
        }

        if (propsDef[key].queryParam === false) {
            return;
        }

        let result;

        if (typeof value === 'boolean') {
            result = '1';
        } else if (typeof value === 'string') {
            result = value.toString();
        } else if (typeof value === 'function') {
            return;
        } else if (typeof value === 'object') {
            result = JSON.stringify(value);
        } else if (typeof value === 'number') {
            result = value.toString();
        }

        return `${urlEncode(key)}=${urlEncode(result)}`;

    }).filter(Boolean).join('&');
}



export function normalizeParentProps(component, instance, props) {
    props = normalizeProps(component, instance, props);

    for (let key of Object.keys(props)) {
        let value = props[key];

        if (value) {
            let prop = component.props[key];

            if (prop.precall) {
                let result = value.call();
                props[key] = () => {
                    return result;
                };
            }

            if (prop.autoClose) {
                props[key] = function() {
                    instance.component.log(`autoclose`, { prop: key });
                    return instance.close().then(() => {
                        return value.apply(this, arguments);
                    });
                };
            }
        }
    }

    return props;
}