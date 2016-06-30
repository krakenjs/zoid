
import { urlEncode } from '../../lib';


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