
import { ChildComponent } from './child';
import { ParentComponent } from './parent';
import { internalProps } from './base';
import { extend, scanForJavascript } from '../lib';
import { PROP_TYPES_LIST, CONTEXT_TYPES_LIST } from '../constants';

import parentStyle from '../templates/parent.css';
import overlayTemplate from '../templates/overlay.htm';
import overlayStyle from '../templates/overlay.css';
import componentTemplate from '../templates/component.htm';
import componentStyle from '../templates/component.css';

import * as drivers from '../drivers';

export let components = {};

export class Component {

    constructor(options = {}) {
        this.validate(options);

        this.tag        = options.tag;
        this.props      = extend(options.props || {}, internalProps);
        this.dimensions = options.dimensions;

        this.defaultEnv = options.defaultEnv;
        this.envUrls    = options.envUrls || {};
        this.url        = options.url || options.envUrls[options.defaultEnv];

        this.contexts = options.contexts || {};
        for (let context of CONTEXT_TYPES_LIST) {
            this.contexts[context] = (this.contexts[context] === undefined) ? true : Boolean(this.contexts[context]);
        }

        this.defaultContext = options.defaultContext;

        this.singleton = options.singleton;

        this.parentStyle       = scanForJavascript(options.parentStyle)       || parentStyle;
        this.overlayTemplate   = scanForJavascript(options.overlayTemplate)   || overlayTemplate;
        this.overlayStyle      = scanForJavascript(options.overlayStyle)      || overlayStyle;
        this.componentTemplate = scanForJavascript(options.componentTemplate) || componentTemplate;
        this.componentStyle    = scanForJavascript(options.componentStyle)    || componentStyle;

        components[this.tag] = this;

        for (let driverName of Object.keys(drivers)) {
            let driver = drivers[driverName];
            if (driver.isActive()) {
                driver.register(this);
            }
        }
    }

    parent(options) {
        return new ParentComponent(this, options);
    }

    child(options) {
        return new ChildComponent(this, options);
    }

    attach(options) {
        var component = this.child(options);
        component.init();
        return component;
    }

    init(props) {
        return new ParentComponent(this, { props });
    }

    getByTag(tag) {
        return components[tag];
    }

    validate(options) {

        if (!options.tag || !options.tag.match(/^[a-z0-9-]+$/)) {
            throw new Error(`Invalid options.tag: ${options.tag}`);
        }

        if (!options.dimensions || !(typeof options.dimensions === 'object')) {
            throw new Error(`[${options.tag}] Expected options.dimensions to be an object`);
        }

        if (typeof options.dimensions.width !== 'number') {
            throw new Error(`[${options.tag}] Expected options.dimensions.width to be a number`);
        }

        if (typeof options.dimensions.height !== 'number') {
            throw new Error(`[${options.tag}] Expected options.dimensions.height to be a number`);
        }

        if (options.props && !(typeof options.props === 'object')) {
            throw new Error(`[${options.tag}] Expected options.props to be an object`);
        }

        if (options.props) {
            for (let key of Object.keys(options.props)) {
                let prop = options.props[key];

                if (internalProps.hasOwnProperty(key)) {
                    throw new Error(`[${options.tag}] Reserved prop name: ${key}`);
                }

                if (!prop || !(typeof prop === 'object')) {
                    throw new Error(`[${options.tag}] Expected options.props.${key} to be an object`);
                }

                if (!prop.type) {
                    throw new Error(`[${options.tag}] Expected prop.type`);
                }

                if (PROP_TYPES_LIST.indexOf(prop.type) === -1) {
                    throw new Error(`[${options.tag}] Expected prop.type to be one of ${PROP_TYPES_LIST.join(', ')}`);
                }

                if (prop.required && prop.def) {
                    throw new Error(`[${options.tag}] Required prop can not have a default value`);
                }
            }
        }


        if (options.contexts) {
            let anyEnabled = false;

            for (let context of Object.keys(options.contexts)) {

                if (CONTEXT_TYPES_LIST.indexOf(context) === -1) {
                    throw new Error(`[${options.tag}] Unsupported context type: ${context}`);
                }

                if (options.contexts[context] || options.contexts[context] === undefined) {
                    anyEnabled = true;
                }
            }

            if (!anyEnabled) {
                throw new Error(`[${options.tag}] No context type is enabled`);
            }
        }

        if (options.defaultContext) {
            if (CONTEXT_TYPES_LIST.indexOf(options.defaultContext) === -1) {
                throw new Error(`[${options.tag}] Unsupported context type: ${options.defaultContext}`);
            }

            if (options.contexts && !options.contexts[options.defaultContext]) {
                throw new Error(`[${options.tag}] Disallowed default context type: ${options.defaultContext}`);
            }
        }

        if (options.envUrls) {
            for (let env of Object.keys(options.envUrls)) {
                if (!options.envUrls[env]) {
                    throw new Error(`[${options.tag}] No url specified for env: ${env}`);
                }
            }
        }

        if (options.defaultEnv && !options.envUrls) {
            throw new Error(`[${options.tag}] options.envUrls must be set if passing in a defaultEnv`);
        }

        if (options.defaultEnv && !options.envUrls[options.defaultEnv]) {
            throw new Error(`[${options.tag}] Invalid default env: ${options.defaultEnv}`);
        }

        if (!options.url || !(typeof options.url === 'string')) {
            if (!options.defaultEnv || typeof options.defaultEnv !== 'string') {
                if (options.envUrls) {
                    throw new Error(`[${options.tag}] Expected options.url to be a string`);
                } else {
                    throw new Error(`[${options.tag}] Expected options.defaultEnv to be a string`);
                }
            }
        }
    }
}