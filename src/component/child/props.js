
import { SyncPromise as Promise } from 'sync-browser-mocks/src/promise';
import { getQueryParam } from '../../lib';
import { PROP_DEFER_TO_URL } from '../../constants';

export function normalizeChildProps(component, props) {

    let result = {};

    for (let key of Object.keys(props)) {

        let prop = component.props[key];
        let value = props[key];

        if (!prop) {
            continue;
        }

        let queryParam = (typeof prop.queryParam === 'string') ? prop.queryParam : key;

        if (value === PROP_DEFER_TO_URL) {
            let actualValue = getQueryParam(queryParam);
            if (prop.getter) {
                value = function() {
                    return Promise.resolve(actualValue);
                };
            } else {
                value = actualValue;
            }
        } else if (prop.getter && value) {
            let val = value;
            value = function() {
                return val().then(res => {
                    if (res === PROP_DEFER_TO_URL) {
                        return getQueryParam(queryParam);
                    }
                    return res;
                });
            };
        }

        result[key] = value;

        if (prop.alias && !result[prop.alias]) {
            result[prop.alias] = value;
        }
    }

    return result;
}


