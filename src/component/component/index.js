
import { on } from 'post-robot/src';
import { BaseComponent } from '../base';
import { ChildComponent } from '../child';
import { ParentComponent } from '../parent';
import { DelegateComponent } from '../delegate';
import { internalProps } from './props';
import { isXComponentWindow, getComponentMeta } from '../window';
import { CONTEXT_TYPES, POST_MESSAGE, WILDCARD } from '../../constants';
import { validate } from './validate';

export { containerTemplate } from './templates/container';
export { componentTemplate } from './templates/component';

import * as drivers from '../../drivers';

import { getDomainFromUrl, promise, info, error, warn, setLogLevel } from '../../lib';

export let components = {};


/*  Component
    ---------

    This is the spec for the component. The idea is, when I call xcomponent.create(), it will create a new instance
    of Component with the blueprint needed to set up ParentComponents and ChildComponents.

    This is the one portion of code which is required by -- and shared to -- both the parent and child windows, and
    contains all of the configuration needed for them to set themselves up.
*/

export class Component extends BaseComponent {

    constructor(options = {}) {
        super(options);

        // The tag name of the component. Used by some drivers (e.g. angular) to turn the component into an html element,
        // e.g. <my-component>

        this.addProp(options, 'tag');

        this.addProp(options, 'defaultLogLevel', 'info');

        this.addProp(options, 'allowedParentDomains', WILDCARD);

        // initially set log level to default log level configured when creating component
        setLogLevel(this.defaultLogLevel);

        if (components[this.tag]) {
            throw new Error(`Can not register multiple components with the same tag`);
        }

        this.validate(options);

        // Name of the component, used for logging. Auto-generated from the tag name by default.

        this.addProp(options, 'name', this.tag.replace(/-/g, '_'));

        // A json based spec describing what kind of props the component accepts. This is used to validate any props before
        // they are passed down to the child.

        this.props = {
            ...internalProps,
            ...(options.props || {})
        };

        if (!options.props) {
            this.looseProps = true;
        }

        // The dimensions of the component, e.g. { width: '300px', height: '150px' }

        this.addProp(options, 'dimensions');
        this.addProp(options, 'scrolling');

        this.addProp(options, 'version', 'latest');

        // The default environment we should render to if none is specified in the parent

        this.addProp(options, 'defaultEnv');

        // A mapping of env->url, used to determine which url to load for which env

        this.addProp(options, 'buildUrl');

        this.addProp(options, 'sandboxContainer', false);

        this.addProp(options, 'url');
        this.addProp(options, 'domain');

        this.addProp(options, 'bridgeUrl');
        this.addProp(options, 'bridgeDomain');

        // A url to use by default to render the component, if not using envs



        // The allowed contexts. For example { iframe: true, popup: false }

        this.addProp(options, 'contexts', { iframe: true, popup: false });

        // The default context to render to

        this.addProp(options, 'defaultContext');

        // Auto Resize option

        this.addProp(options, 'getInitialDimensions');
        this.addProp(options, 'autoResize', false);

        // Templates and styles for the parent page and the initial rendering of the component

        this.addProp(options, 'containerTemplate', ({ id, CLASS }) => `
            <style>
                #${id} .${ CLASS.ELEMENT } {
                    height: 150px;
                    width: 300px;
                }

                #${id} .${ CLASS.ELEMENT } iframe {
                    height: 100%;
                    width: 100%;
                }
            </style>

            <div class="${ CLASS.ELEMENT }"></div>
        `);

        this.addProp(options, 'componentTemplate');

        this.addProp(options, 'sacrificialComponentTemplate', false);
        this.addProp(options, 'validate');

        // A mapping of tag->component so we can reference components by string tag name

        components[this.tag] = this;

        // Register all of the drivers for instantiating components. The model used is -- there's a standard javascript
        // way of rendering a component, then each other technology (e.g. react) needs to hook into that interface.
        // This makes us a little more pluggable and loosely coupled.

        this.registerDrivers();
        this.registerChild();
        this.listenDelegate();
    }

    registerDrivers() {
        this.driverCache = {};

        for (let driverName of Object.keys(drivers)) {
            let driver = drivers[driverName];
            let glob = driver.global();
            if (glob) {
                this.driver(driverName, glob);
            }
        }
    }

    driver(name, glob) {
        if (!drivers[name]) {
            throw new Error(`Could not find driver for framework: ${name}`);
        }

        if (!this.driverCache[name]) {
            this.driverCache[name] = drivers[name].register(this, glob);
        }

        return this.driverCache[name];
    }

    registerChild() {
        if (isXComponentWindow()) {
            let componentMeta = getComponentMeta();

            if (componentMeta.tag === this.tag) {
                window.xchild = new ChildComponent(this);
                window.xprops = window.xchild.props;
            }
        }
    }

    listenDelegate() {
        on(`${POST_MESSAGE.DELEGATE}_${this.name}`, ({ source, origin, data }) => {

            let domain = this.getDomain(null, { env: data.env || this.defaultEnv });

            if (!domain) {
                throw new Error(`Could not determine domain to allow remote render`);
            }

            if (domain !== origin) {
                throw new Error(`Can not render from ${origin} - expected ${domain}`);
            }

            let delegate = this.delegate(source, data.options);

            return {
                overrides: delegate.getOverrides(data.context),
                destroy:   () => delegate.destroy()
            };
        });
    }


    getValidDomain(url) {

        if (!url) {
            return;
        }

        let domain = getDomainFromUrl(url);

        if (typeof this.domain === 'string' && domain === this.domain) {
            return domain;
        }

        if (this.domain && typeof this.domain === 'object') {
            for (let env of Object.keys(this.domain)) {

                if (env === 'test') {
                    continue;
                }

                if (domain === this.domain[env]) {
                    return domain;
                }
            }
        }
    }


    getDomain(url, props = {}) {

        let domain = this.getValidDomain(url);

        if (domain) {
            return domain;
        }

        domain = this.getForEnv(this.domain, props.env);

        if (domain) {
            return domain;
        }

        let envUrl = this.getForEnv(this.url, props.env);

        if (envUrl) {
            return getDomainFromUrl(envUrl);
        }

        if (url) {
            return getDomainFromUrl(url);
        }
    }

    getBridgeUrl(env) {
        return this.getForEnv(this.bridgeUrl, env);
    }

    getForEnv(item, env) {

        if (!item) {
            return;
        }

        if (typeof item === 'string') {
            return item;
        }

        if (!env) {
            env = this.defaultEnv;
        }

        if (!env) {
            return;
        }

        if (env && typeof item === 'object' && item[env]) {
            return item[env];
        }
    }

    getBridgeDomain(env) {

        let bridgeDomain = this.getForEnv(this.bridgeDomain, env);

        if (bridgeDomain) {
            return bridgeDomain;
        }

        let bridgeUrl = this.getBridgeUrl(env);

        if (bridgeUrl) {
            return getDomainFromUrl(bridgeUrl);
        }
    }

    getUrl(env, props) {

        let url = this.getForEnv(this.url, env);

        if (url) {
            return url;
        }

        if (this.buildUrl) {
            return this.buildUrl(props);
        }
    }

    isXComponent() {
        return isXComponentWindow();
    }

    isChild() {
        return isXComponentWindow() && getComponentMeta().tag === this.tag;
    }


    /*  Parent
        ------

        Get an instance of the parent for this component (lives on the parent page which contains the component)
    */

    parent(options) {
        return new ParentComponent(this, null, options);
    }


    /*  Child
        -----

        Get an instance of the child for this component (lives on the child component page which lives in the parent)
    */

    child(options) {

        if (!window.xchild) {
            throw new Error(`Child not instantiated`);
        }

        if (window.xchild.component !== this) {
            // throw new Error(`Child instantiated from a different component: ${window.xchild.tag}`);
        }

        return window.xchild;
    }


    /*  Attach
        ------

        Shortcut to instantiate a child in a child component window
    */

    attach(options) {
        return this.child(options);
    }

    error(message, tag) {
        return new Error(`[${this.tag || tag}] ${message}`);
    }


    /*  Init
        ----

        Shortcut to instantiate a component on a parent page, with props
    */

    init(props, context, element) {
        context = this.getRenderContext(element);
        return new ParentComponent(this, context, { props });
    }


    delegate(source, options = {}) {
        return new DelegateComponent(this, source, options);
    }

    validateRenderContext(context) {
        if (!this.contexts[context]) {
            throw new Error(`[${this.tag}] Can not render to ${context}`);
        }

    }

    getRenderContext(element) {

        if (element) {
            this.validateRenderContext(CONTEXT_TYPES.IFRAME);
            return CONTEXT_TYPES.IFRAME;
        } else if (this.defaultContext) {
            return this.defaultContext;
        } else if (this.contexts[CONTEXT_TYPES.IFRAME]) {
            return CONTEXT_TYPES.IFRAME;
        } else if (this.contexts[CONTEXT_TYPES.POPUP]) {
            return CONTEXT_TYPES.POPUP;
        }

        throw new Error(`[${this.tag}] No context options available for render`);
    }


    /*  Render
        ------

        Shortcut to render a parent component
    */

    @promise
    render(props, element) {
        return new ParentComponent(this, this.getRenderContext(element), { props }).render(element || document.body);
    }

    @promise
    renderIframe(props, element = document.body) {
        this.validateRenderContext(CONTEXT_TYPES.IFRAME);
        return new ParentComponent(this, CONTEXT_TYPES.IFRAME, { props }).render(element);
    }

    @promise
    renderPopup(props) {
        this.validateRenderContext(CONTEXT_TYPES.POPUP);
        return new ParentComponent(this, CONTEXT_TYPES.POPUP, { props }).render();
    }

    @promise
    renderTo(win, props, element) {
        return new ParentComponent(this, this.getRenderContext(element), { props }).renderTo(win, element);
    }

    @promise
    renderIframeTo(win, props, element) {
        this.validateRenderContext(CONTEXT_TYPES.IFRAME);
        return new ParentComponent(this, CONTEXT_TYPES.IFRAME, { props }).renderTo(win, element);
    }

    @promise
    renderPopupTo(win, props) {
        this.validateRenderContext(CONTEXT_TYPES.POPUP);
        return new ParentComponent(this, CONTEXT_TYPES.POPUP, { props }).renderTo(win);
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
        return validate(this, options);
    }


    /*  Log
        ---

        Log an event using the component name
    */

    log(event, payload = {}) {
        info(this.name, event, payload);
    }


    /*  Log Warning
        -----------

        Log a warning
    */

    logWarning(event, payload) {
        warn(this.name, event, payload);
    }


    /*  Log Error
        ---------

        Log an error
    */

    logError(event, payload) {
        error(this.name, event, payload);
    }
}


export function getByTag(tag) {
    return components[tag];
}
