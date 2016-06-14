
import { ChildComponent } from './child';
import { ParentComponent } from './parent';
import { internalProps } from './props';
import { scanForJavascript } from '../lib';
import { PROP_TYPES_LIST, CONTEXT_TYPES_LIST } from '../constants';

import parentStyle from '../templates/parent.css';
import overlayTemplate from '../templates/overlay.htm';
import overlayStyle from '../templates/overlay.css';
import componentTemplate from '../templates/component.htm';
import componentStyle from '../templates/component.css';

import * as drivers from '../drivers';

export let components = {};


/*  Component
    ---------

    This is the spec for the component. The idea is, when I call xcomponent.create(), it will create a new instance
    of Component with the blueprint needed to set up ParentComponents and ChildComponents.

    This is the one portion of code which is required by -- and shared to -- both the parent and child windows, and
    contains all of the configuration needed for them to set themselves up.
*/

export class Component {

    constructor(options = {}) {

        if (!options.dimensions || !(typeof options.dimensions === 'object')) {

            options.dimensions = {
                width : 0,
                height : 0
            };

        }
        
        this.validate(options);
        
        // The tag name of the component. Used by some drivers (e.g. angular) to turn the component into an html element,
        // e.g. <my-component>

        this.tag = options.tag;

        // A json based spec describing what kind of props the component accepts. This is used to validate any props before
        // they are passed down to the child.

        this.props = {
            ...options.props,
            ...internalProps
        };

        // The dimensions of the component, e.g. { width: 500, height: 200 }

        this.dimensions = options.dimensions;

        // The default environment we should render to if none is specified in the parent

        this.defaultEnv = options.defaultEnv;

        // A mapping of env->url, used to determine which url to load for which env

        this.envUrls = options.envUrls || {};

        // A url to use by default to render the component, if not using envs

        this.url = options.url     || options.envUrls[options.defaultEnv];

        // The allowed contexts. For example { iframe: true, lightbox: false, popup: false }. Defaults to true for all.

        this.contexts = options.contexts || {};
        for (let context of CONTEXT_TYPES_LIST) {
            this.contexts[context] = (this.contexts[context] === undefined) ? true : Boolean(this.contexts[context]);
        }

        // The default context to render to

        this.defaultContext = options.defaultContext;

        // Should this be a singleton component? Do I want to allow it to be rendered more than once on the same page?

        this.singleton = options.singleton;

        // Templates and styles for the parent page and the initial rendering of the component

        this.parentStyle       = scanForJavascript(options.parentStyle)       || parentStyle;
        this.overlayTemplate   = scanForJavascript(options.overlayTemplate)   || overlayTemplate;
        this.overlayStyle      = scanForJavascript(options.overlayStyle)      || overlayStyle;
        this.componentTemplate = scanForJavascript(options.componentTemplate) || componentTemplate;
        this.componentStyle    = scanForJavascript(options.componentStyle)    || componentStyle;

        // A mapping of tag->component so we can reference components by string tag name

        components[this.tag] = this;

        // Register all of the drivers for instantiating components. The model used is -- there's a standard javascript
        // way of rendering a component, then each other technology (e.g. react) needs to hook into that interface.
        // This makes us a little more pluggable and loosely coupled.

        for (let driverName of Object.keys(drivers)) {
            let driver = drivers[driverName];
            if (driver.isActive()) {
                driver.register(this);
            }
        }
    }


    /*  Parent
        ------

        Get an instance of the parent for this component (lives on the parent page which contains the component)
    */

    parent(options) {
        return new ParentComponent(this, options);
    }


    /*  Child
        -----

        Get an instance of the child for this component (lives on the child component page which lives in the parent)
    */

    child(options) {
        return new ChildComponent(this, options);
    }


    /*  Attach
        ------

        Shortcut to instantiate a child in a child component window
    */

    attach(options) {
        let component = this.child(options);
        component.init();
        return component;
    }


    /*  Init
        ----

        Shortcut to instantiate a component on a parent page, with props
    */

    init(props) {
        return new ParentComponent(this, { props });
    }


    /*  Get By Tag
        ----------

        Get a component instance by tag name
    */

    getByTag(tag) {
        return components[tag];
    }


    /*  Validate
        --------

        Validate any options passed into Component
    */

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
                    throw new Error(`[${options.tag}] Expected options.defaultEnv to be a string`);
                } else {
                    throw new Error(`[${options.tag}] Expected options.url to be a string`);
                }
            }
        }
    }
}