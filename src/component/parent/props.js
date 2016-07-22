
import { SyncPromise as Promise } from 'sync-browser-mocks/src/promise';
import { validateProp } from './validate';
import { urlEncode } from '../../lib';
import { normalizeProps } from '../props';
import { PROP_DEFER_TO_URL, CLOSE_REASONS } from '../../constants';


/*  Props to Query
    --------------

    Turn props into an initial query string to open the component with

    string -> string
    bool   -> 1
    object -> json
    number -> string
*/

export function propsToQuery(propsDef, props) {

    let params = [];

    return Promise.all(Object.keys(props).map(key => {

        let prop = propsDef[key];
        let queryParam = key;

        if (typeof prop.queryParam === 'string') {
            queryParam = prop.queryParam;
        }

        return Promise.resolve().then(() => {

            let value = props[key];

            if (!value) {
                return;
            }

            if (prop.queryParam === false) {
                return;
            }

            if (value === PROP_DEFER_TO_URL) {
                return;
            }

            if (prop.getter) {
                return value.call().then(result => {
                    validateProp(prop, key, result);
                    return result;
                });
            }

        }).then(value => {

            if (!value) {
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

            params.push(`${urlEncode(queryParam)}=${urlEncode(result)}`);
        });

    })).then(() => {
        return params.join('&');
    });
}



export function normalizeParentProps(component, instance, props) {
    props = normalizeProps(component, instance, props);

    for (let key of Object.keys(props)) {
        let value = props[key];

        if (value) {
            let prop = component.props[key];

            if (prop.autoClose) {
                props[key] = function() {
                    instance.component.log(`autoclose`, { prop: key });
                    return instance.close(CLOSE_REASONS.AUTOCLOSE).then(() => {
                        return value.apply(this, arguments);
                    });
                };
            }
        }
    }

    return props;
}