
import { PROP_TYPES_LIST, CONTEXT_TYPES_LIST } from '../../constants';
import { isPerc, isPx } from '../../lib';

function validateProps(options) {

    if (options.props && !(typeof options.props === 'object')) {
        throw new Error(`[${options.tag}] Expected options.props to be an object`);
    }

    if (options.props) {
        for (let key of Object.keys(options.props)) {
            let prop = options.props[key];

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
}

export function validate(options) { // eslint-ignore-line

    if (!options.tag || !options.tag.match(/^[a-z0-9-]+$/)) {
        throw new Error(`Invalid options.tag: ${options.tag}`);
    }

    validateProps(options);

    if (options.dimensions) {
        if (!isPx(options.dimensions.width) && !isPerc(options.dimensions.width)) {
            throw new Error(`[${options.tag}] Expected options.dimensions.width to be a px or % string value`);
        }

        if (!isPx(options.dimensions.height) && !isPerc(options.dimensions.height)) {
            throw new Error(`[${options.tag}] Expected options.dimensions.height to be a px or % string value`);
        }
    }

    if (options.contexts) {

        if (options.contexts.popup && !__POPUP_SUPPORT__) {
            throw new Error(`Popups not supported in this build -- please use the full xcomponent.js build`);
        }

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

    if (!options.url && !options.buildUrl) {
        throw new Error(`[${options.tag}] Expected options.url to be passed`);
    }

    if (options.url && options.buildUrl) {
        throw new Error(`[${options.tag}] Can not pass options.url and options.buildUrl`);
    }

    if (options.defaultEnv) {
        if (typeof options.defaultEnv !== 'string') {
            throw new Error(`[${options.tag}] Expected options.defaultEnv to be a string`);
        }

        if (typeof options.url !== 'object') {
            throw new Error(`[${options.tag}] Expected options.url to be an object mapping env->url`);
        }

        if (options.url && typeof options.url === 'object' && !options.url[options.defaultEnv]) {
            throw new Error(`[${options.tag}] No url found for default env: ${options.defaultEnv}`);
        }
    }

    if (options.url && typeof options.url === 'object') {

        if (!options.defaultEnv) {
            throw new Error(`[${options.tag}] Must pass options.defaultEnv with env->url mapping`);
        }

        for (let env of Object.keys(options.url)) {
            if (!options.url[env]) {
                throw new Error(`[${options.tag}] No url specified for env: ${env}`);
            }
        }
    }

    if (options.componentTemplate && typeof options.componentTemplate !== 'function') {
        throw new Error(`[${options.tag}] Expected options.componentTemplate to be a function`);
    }

    if (options.containerTemplate && typeof options.containerTemplate !== 'function') {
        throw new Error(`[${options.tag}] Expected options.containerTemplate to be a function`);
    }
}