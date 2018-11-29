import { getDomain, isSameDomain } from 'cross-domain-utils/src';

export function normalizeChildProp(component, props, key, value) {

    // $FlowFixMe
    var prop = component.getProp(key);

    if (!prop) {
        return value;
    }

    if (typeof prop.childDecorate === 'function') {
        return prop.childDecorate(value);
    }

    return value;
}

export function normalizeChildProps(parentComponentWindow, component, props, origin) {
    var required = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;


    var result = {};

    // $FlowFixMe

    for (var _i2 = 0, _Object$keys2 = Object.keys(props), _length2 = _Object$keys2 == null ? 0 : _Object$keys2.length; _i2 < _length2; _i2++) {
        var key = _Object$keys2[_i2];
        var prop = component.getProp(key);

        if (prop && prop.sameDomain && (origin !== getDomain(window) || !isSameDomain(parentComponentWindow))) {
            continue;
        }

        var value = props[key];
        result[key] = normalizeChildProp(component, props, key, value);

        if (prop && prop.alias && !result[prop.alias]) {
            result[prop.alias] = value;
        }
    }

    if (required) {
        for (var _i4 = 0, _component$getPropNam2 = component.getPropNames(), _length4 = _component$getPropNam2 == null ? 0 : _component$getPropNam2.length; _i4 < _length4; _i4++) {
            var _key = _component$getPropNam2[_i4];
            if (!props.hasOwnProperty(_key)) {
                result[_key] = normalizeChildProp(component, props, _key, props[_key]);
            }
        }
    }

    // $FlowFixMe
    return result;
}