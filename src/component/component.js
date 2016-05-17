
import { ChildComponent } from './child';
import { ParentComponent } from './parent';
import { pop, noop } from '../util';

import * as drivers from '../drivers';

const PROP_TYPES = [
    'string',
    'object',
    'function',
    'boolean'
];

export class Component {

    constructor(options = {}) {
        this.validate(options);

        this.tag = options.tag;
        this.url = options.url;
        this.props = options.props;

        this.singleton = options.singleton;

        for (let driverName of Object.keys(drivers)) {
            let driver = drivers[driverName];
            if (driver.isActive()) {
                driver.register(this);
            }
        }
    }

    validate(options) {

        if (!options.tag || !options.tag.match(/^[a-z0-9-]+$/)) {
            throw new Error(`Invalid options.tag: ${options.tag}`)
        }

        if (!options.url || !(typeof options.url === 'string')) {
            throw new Error(`Expected options.url to be a string`);
        }

        if (!options.props || !(options.props instanceof Object)) {
            throw new Error(`Expected options.props to be an object`);
        }

        for (let key of Object.keys(options.props)) {
            let prop = options.props[key];

            if (!prop || !(prop instanceof Object)) {
                throw new Error(`Expected options.props.${key} to be an object`);
            }

            if (!prop.type) {
                throw new Error(`Expected prop.type`);
            }

            if (PROP_TYPES.indexOf(prop.type) === -1) {
                throw new Error(`Expected prop.type to be one of ${PROP_TYPES.join(', ')}`);
            }

            if (prop.required && prop.def) {
                throw new Error(`Required prop can not have a default value`);
            }
        }
    }

    attach(options) {
        return new ChildComponent(this, options);
    }

    init(options) {
        return new ParentComponent(this, options);
    }

    initFromProps(props) {

        return new ParentComponent(this, {

            props,

            onEnter: pop(props, 'onEnter', noop),
            onExit:  pop(props, 'onExit', noop),
            onClose: pop(props, 'onClose', noop),
            onError: pop(props, 'onError', noop),

            timeout: parseInt(pop(props, 'timeout', 0), 10)
        });
    }
}