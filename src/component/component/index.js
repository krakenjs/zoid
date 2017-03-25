
import * as postRobot from 'post-robot/src';
import * as $logger from 'beaver-logger/client';

import { BaseComponent } from '../base';
import { ChildComponent } from '../child';
import { ParentComponent } from '../parent';
import { DelegateComponent } from '../delegate';
import { internalProps } from './props';
import { isXComponentWindow, getComponentMeta } from '../window';
import { CONTEXT_TYPES, CONTEXT_TYPES_LIST, POST_MESSAGE } from '../../constants';
import { validate } from './validate';

export { containerTemplate } from './templates/container';
export { componentTemplate } from './templates/component';

import * as drivers from '../../drivers';

import { getDomainFromUrl, promise } from '../../lib';

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

        this.validate(options);

        // The tag name of the component. Used by some drivers (e.g. angular) to turn the component into an html element,
        // e.g. <my-component>

        this.addProp(options, 'tag');

        // Name of the component, used for logging. Auto-generated from the tag name by default.

        this.addProp(options, 'name', this.tag.replace(/-/g, '_'));

        // A json based spec describing what kind of props the component accepts. This is used to validate any props before
        // they are passed down to the child.

        this.props = {
            ...internalProps,
            ...options.props
        };

        // The dimensions of the component, e.g. { width: 500, height: 200 }

        this.addProp(options, 'dimensions');
        this.addProp(options, 'scrolling');

        this.addProp(options, 'version', 'latest');

        // The default environment we should render to if none is specified in the parent

        this.addProp(options, 'defaultEnv');

        // A mapping of env->url, used to determine which url to load for which env

        this.addProp(options, 'envUrls');

        this.addProp(options, 'buildUrl');

        this.addProp(options, 'sandboxContainer', false);

        this.addProp(options, 'bridgeUrl');
        this.addProp(options, 'bridgeUrls');

        this.addProp(options, 'bridgeDomain');
        this.addProp(options, 'bridgeDomains');

        // A url to use by default to render the component, if not using envs

        this.addProp(options, 'url');

        // The allowed contexts. For example { iframe: true, popup: false }. Defaults to true for all.

        this.addProp(options, 'contexts', {});
        for (let context of CONTEXT_TYPES_LIST) {
            this.contexts[context] = (this.contexts[context] === undefined) ? true : Boolean(this.contexts[context]);
        }

        // The default context to render to

        this.addProp(options, 'defaultContext');

        // Should this be a singleton component? Do I want to allow it to be rendered more than once on the same page?

        this.addProp(options, 'singleton');

        // Auto Resize option

        this.addProp(options, 'autoResize', false);

        // Templates and styles for the parent page and the initial rendering of the component

        this.addProp(options, 'containerTemplate');
        this.addProp(options, 'componentTemplate');

        this.addProp(options, 'validateProps');

        this.addProp(options, 'domain');
        this.addProp(options, 'domains');

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
        for (let driverName of Object.keys(drivers)) {
            let driver = drivers[driverName];
            if (driver.isActive()) {
                driver.register(this);
            }
        }
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
        postRobot.on(`${POST_MESSAGE.DELEGATE}_${this.name}`, ({ source, origin, data }) => {

            let domain = this.getDomain(null, { env: data.env });

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

        if (this.domain) {
            if (domain === this.domain) {
                return domain;
            }
        }

        if (this.domains) {
            for (let env of Object.keys(this.domains)) {

                if (env === 'test') {
                    continue;
                }

                if (domain === this.domains[env]) {
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

        if (this.domain) {
            return this.domain;
        }

        if (this.domains && props.env && this.domains[props.env]) {
            return this.domains[props.env];
        }

        if (this.envUrls && props.env && this.envUrls[props.env]) {
            return getDomainFromUrl(this.envUrls[props.env]);
        }

        if (this.envUrls && this.defaultEnv && this.envUrls[this.defaultEnv]) {
            return getDomainFromUrl(this.envUrls[this.defaultEnv]);
        }

        if (this.url) {
            return getDomainFromUrl(this.url);
        }

        if (url) {
            let urlDomain = getDomainFromUrl(url);

            if (urlDomain) {
                return urlDomain;
            }
        }
    }

    getBridgeUrl(env) {

        if (this.bridgeUrl) {
            return this.bridgeUrl;
        }

        if (this.bridgeUrls && env && this.bridgeUrls[env]) {
            return this.bridgeUrls[env];
        }
    }

    getBridgeDomain(env) {

        if (this.bridgeDomain) {
            return this.bridgeDomain;
        }

        if (this.bridgeDomains && env && this.bridgeDomains[this.props.env]) {
            return this.bridgeDomains[env];
        }

        let bridgeUrl = this.getBridgeUrl(env);

        if (bridgeUrl) {
            return getDomainFromUrl(bridgeUrl);
        }
    }

    getUrl(env, props) {

        if (env && this.envUrls) {
            return this.envUrls[env];
        }

        if (this.defaultEnv && this.envUrls) {
            return this.envUrls[this.defaultEnv];
        }

        if (this.buildUrl) {
            return this.buildUrl(props);
        }

        if (this.url) {
            return this.url;
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
        return validate(options);
    }


    /*  Log
        ---

        Log an event using the component name
    */

    log(event, payload = {}) {
        $logger.info(`xc_${this.name}_${event}`, payload);
    }


    /*  Log Warning
        -----------

        Log a warning
    */

    logWarning(event, payload) {
        $logger.warn(`xc_${this.name}_${event}`, payload);
    }


    /*  Log Error
        ---------

        Log an error
    */

    logError(event, payload) {
        $logger.error(`xc_${this.name}_${event}`, payload);
    }
}


export function getByTag(tag) {
    return components[tag];
}