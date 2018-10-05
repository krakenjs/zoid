/* @flow */

import { isPerc, isPx } from 'belter/src';

import { PROP_TYPES_LIST, CONTEXT_TYPES_LIST } from '../../constants';

import type { ComponentOptionsType } from './index';

function validatePropDefinitions<P>(options : ComponentOptionsType<P>) {

    if (options.props && !(typeof options.props === 'object')) {
        throw new Error(`Expected options.props to be an object`);
    }

    if (options.props) {
        for (let key of Object.keys(options.props)) {

            // $FlowFixMe
            let prop = options.props[key];

            if (!prop || !(typeof prop === 'object')) {
                throw new Error(`Expected options.props.${ key } to be an object`);
            }

            if (!prop.type) {
                throw new Error(`Expected prop.type`);
            }

            if (PROP_TYPES_LIST.indexOf(prop.type) === -1) {
                throw new Error(`Expected prop.type to be one of ${ PROP_TYPES_LIST.join(', ') }`);
            }

            if (prop.required && prop.def) {
                throw new Error(`Required prop can not have a default value`);
            }
        }
    }
}

// eslint-disable-next-line complexity
export function validate<P>(options : ?ComponentOptionsType<P>) { // eslint-ignore-line

    if (!options) {
        throw new Error(`Expected options to be passed`);
    }

    if (!options.tag || !options.tag.match(/^[a-z0-9-]+$/)) {
        throw new Error(`Invalid options.tag: ${ options.tag }`);
    }

    validatePropDefinitions(options);

    if (options.dimensions) {
        if (options.dimensions && !isPx(options.dimensions.width) && !isPerc(options.dimensions.width)) {
            throw new Error(`Expected options.dimensions.width to be a px or % string value`);
        }

        if (options.dimensions && !isPx(options.dimensions.height) && !isPerc(options.dimensions.height)) {
            throw new Error(`Expected options.dimensions.height to be a px or % string value`);
        }
    }

    if (options.contexts) {

        if (options.contexts.popup && !__ZOID__.__POPUP_SUPPORT__) {
            throw new Error(`Popups not supported in this build -- please use the full zoid.js build`);
        }

        let anyEnabled = false;

        for (let context of Object.keys(options.contexts)) {

            if (CONTEXT_TYPES_LIST.indexOf(context) === -1) {
                throw new Error(`Unsupported context type: ${ context }`);
            }

            if ((options.contexts && options.contexts[context]) || (options.contexts && options.contexts[context] === undefined)) {
                anyEnabled = true;
            }
        }

        if (!anyEnabled) {
            throw new Error(`No context type is enabled`);
        }
    }

    if (options.defaultContext) {
        if (CONTEXT_TYPES_LIST.indexOf(options.defaultContext) === -1) {
            throw new Error(`Unsupported context type: ${ options.defaultContext || 'unknown' }`);
        }

        if (options.contexts && options.defaultContext && !options.contexts[options.defaultContext]) {
            throw new Error(`Disallowed default context type: ${ options.defaultContext || 'unknown' }`);
        }
    }

    if (options.url && options.buildUrl) {
        throw new Error(`Can not pass both options.url and options.buildUrl`);
    }

    if (options.defaultEnv) {
        if (typeof options.defaultEnv !== 'string') {
            throw new TypeError(`Expected options.defaultEnv to be a string`);
        }

        if (!options.buildUrl && typeof options.url !== 'object') {
            throw new Error(`Expected options.url to be an object mapping env->url`);
        }

        if (options.url && typeof options.url === 'object' && !options.url[options.defaultEnv]) {
            throw new Error(`No url found for default env: ${ options.defaultEnv }`);
        }
    }

    if (options.url && typeof options.url === 'object') {

        if (!options.defaultEnv) {
            throw new Error(`Must pass options.defaultEnv with env->url mapping`);
        }

        for (let env of Object.keys(options.url)) {
            if (!options.url[env]) {
                throw new Error(`No url specified for env: ${ env }`);
            }
        }
    }

    if (options.prerenderTemplate && typeof options.prerenderTemplate !== 'function') {
        throw new Error(`Expected options.prerenderTemplate to be a function`);
    }

    if (options.containerTemplate && typeof options.containerTemplate !== 'function') {
        throw new Error(`Expected options.containerTemplate to be a function`);
    }
}
