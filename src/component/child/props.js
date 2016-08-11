
import { SyncPromise as Promise } from 'sync-browser-mocks/src/promise';
import { getQueryParam } from '../../lib';
import { PROP_DEFER_TO_URL } from '../../constants';

export function normalizeChildProps(component, props) {

    let result = {};

    for (let key of Object.keys(props)) {

        let prop = component.props[key];
        let value = props[key];

        if (value === PROP_DEFER_TO_URL) {

            let queryParam = key;

            if (typeof prop.queryParam === 'string') {
                queryParam = prop.queryParam;
            }

            value = getQueryParam(queryParam);
            if (prop.getter) {
                let val = Promise.resolve(value);
                value = function()  {
                    return val;
                };
            }
        }

        result[key] = value;
    }

    return result;
}


