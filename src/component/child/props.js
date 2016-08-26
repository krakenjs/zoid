
import { getQueryParam } from '../../lib';
import { PROP_DEFER_TO_URL } from '../../constants';

export function normalizeChildProps(component, props) {

    let result = {};

    for (let key of Object.keys(props)) {

        let prop = component.props[key];
        let value = props[key];

        let queryParam = (typeof prop.queryParam === 'string') ? prop.queryParam : key;

        if (value === PROP_DEFER_TO_URL) {
            value = getQueryParam(queryParam);
        }

        if (prop.getter && value) {
            let val = value;
            value = function() {
                return val().then(res => {
                    if (res === PROP_DEFER_TO_URL) {
                        return getQueryParam(queryParam);
                    }
                    return result;
                });
            };
        }

        result[key] = value;
    }

    return result;
}


