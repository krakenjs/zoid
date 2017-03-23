
import * as postRobot from 'post-robot/src';
import * as $logger from 'beaver-logger/client';
import { SyncPromise as Promise } from 'sync-browser-mocks/src/promise';

import { BaseComponent } from '../base';
import { ChildComponent } from '../child';
import { ParentComponent } from '../parent';
import { DelegateComponent } from '../delegate';
import { internalProps } from './props';
import { isXComponentWindow, getComponentMeta } from '../window';
import { CONTEXT_TYPES, CONTEXT_TYPES_LIST, POST_MESSAGE } from '../../constants';
import { RENDER_DRIVERS } from '../parent/drivers';
import { validate } from './validate';

import containerTemplate from './templates/container.htm';
import componentTemplate from './templates/component.htm';

import * as drivers from '../../drivers';

import { capitalizeFirstLetter, getDomainFromUrl } from '../../lib';

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

        this.addProp(options, 'sandboxContainer', true);

        this.addProp(options, 'bridgeUrl');
        this.addProp(options, 'bridgeUrls');

        this.addProp(options, 'bridgeDomain');
        this.addProp(options, 'bridgeDomains');

        // A url to use by default to render the component, if not using envs

        this.addProp(options, 'url');

        // The allowed contexts. For example { iframe: true, lightbox: false, popup: false }. Defaults to true for all.

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

        this.addProp(options, 'parentTemplate', containerTemplate);
        this.addProp(options, 'componentTemplate', componentTemplate);

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

        if (options && options.onEnter) {
            options.onEnter.call(window.xchild);
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
        context = this.getRenderContext(element, context);
        return new ParentComponent(this, context, { props });
    }


    delegate(source, options = {}) {
        return new DelegateComponent(this, source, options);
    }

    getRenderContext(element, context) {

        let tag = this.tag;
        let defaultContext = this.defaultContext;
        let contexts = this.contexts;

        if (element) {
            if (context && !RENDER_DRIVERS[context].requiresElement) {
                throw new Error(`[${tag}] ${context} context can not be rendered into element`);
            }

            context = CONTEXT_TYPES.IFRAME;
        }

        if (context) {

            if (!contexts[context]) {
                throw new Error(`[${tag}] ${context} context not allowed by component`);
            }

            if (RENDER_DRIVERS[context].requiresElement && !element) {
                throw new Error(`[${tag}] Must specify element to render to iframe`);
            }

            return context;
        }

        if (defaultContext) {
            return defaultContext;
        }

        for (let renderContext of [ CONTEXT_TYPES.LIGHTBOX, CONTEXT_TYPES.POPUP ]) {
            if (contexts[renderContext]) {
                return renderContext;
            }
        }

        throw new Error(`[${tag}] No context options available for render`);
    }


    /*  Render
        ------

        Shortcut to render a parent component
    */

    render(props, element, context) {
        return Promise.try(() => {
            context = this.getRenderContext(element, context);
            return new ParentComponent(this, context, { props }).render(element);
        });
    }

    renderTo(win, props, element, context) {
        return Promise.try(() => {
            context = this.getRenderContext(element, context);
            return new ParentComponent(this, context, { props }).renderTo(win, element);
        });
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

/*  Generate Render Methods
 -----------------------

 Autogenerate methods like renderIframe, renderPopupToParent
 */

for (let context of CONTEXT_TYPES_LIST) {

    let contextName = capitalizeFirstLetter(context);

    Component.prototype[`render${contextName}`] = function(props, element) {
        return this.render(props, element, context);
    };

    Component.prototype[`render${contextName}To`] = function(win, props, element) {
        return this.renderTo(win, props, element, context);
    };
}
