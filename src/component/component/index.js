/* @flow */
/* eslint max-lines: 0 */

import { on, send } from 'post-robot/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { getDomainFromUrl, type CrossDomainWindowType } from 'cross-domain-utils/src';
import { memoize, isRegex, toCSS } from 'belter/src';
import { type ElementNode } from 'jsx-pragmatic/src';

import { ChildComponent } from '../child';
import { ParentComponent, type RenderOptionsType } from '../parent';
import { DelegateComponent, type DelegateOptionsType } from '../delegate';
import { isZoidComponentWindow, parseChildWindowName } from '../window';
import { CONTEXT, POST_MESSAGE, WILDCARD, DEFAULT_DIMENSIONS } from '../../constants';
import { angular, angular2, glimmer, react, vue } from '../../drivers/index';
import { info, error, warn } from '../../lib';
import type { CssDimensionsType, StringMatcherType, ElementRefType, EnvString } from '../../types';

import { validate } from './validate';
import { defaultContainerTemplate, defaultPrerenderTemplate } from './templates';
import { getInternalProps, type UserPropsDefinitionType, type BuiltInPropsDefinitionType, type PropsType, type BuiltInPropsType, type MixedPropDefinitionType } from './props';

const drivers = { angular, angular2, glimmer, react, vue };

/*  Component
    ---------

    This is the spec for the component. The idea is, when I call zoid.create(), it will create a new instance
    of Component with the blueprint needed to set up ParentComponents and ChildComponents.

    This is the one portion of code which is required by -- and shared to -- both the parent and child windows, and
    contains all of the configuration needed for them to set themselves up.
*/

export type ComponentOptionsType<P> = {

    tag : string,

    url : EnvString | (props : BuiltInPropsType & P) => string,
    buildUrl? : (props : BuiltInPropsType & P) => string,
    domain? : EnvString | RegExp,
    bridgeUrl? : EnvString,

    props? : UserPropsDefinitionType<P>,

    dimensions? : CssDimensionsType,
    autoResize? : { width? : boolean, height? : boolean, element? : string },

    allowedParentDomains? : StringMatcherType,

    defaultEnv? : string,

    attributes? : {
        iframe? : { [string] : string },
        popup? : { [string] : string }
    },

    contexts? : { iframe? : boolean, popup? : boolean },
    defaultContext? : string,

    containerTemplate? : (RenderOptionsType<P>) => HTMLElement | ElementNode,
    prerenderTemplate? : (RenderOptionsType<P>) => HTMLElement | ElementNode,

    validate? : (Component<P>, (PropsType & P)) => void
};

export type ComponentDriverType<P, T : mixed> = {
    global : () => ?T,
    register : (Component<P>, T) => mixed
};

export class Component<P> {

    tag : string
    name : string
    
    url : void | EnvString | (props : BuiltInPropsType & P) => string
    domain : void | EnvString | RegExp
    bridgeUrl : void | EnvString

    props : UserPropsDefinitionType<P>
    builtinProps : BuiltInPropsDefinitionType<P>

    dimensions : void | CssDimensionsType
    autoResize : void | { width? : boolean, height? : boolean, element? : string }

    allowedParentDomains : StringMatcherType

    defaultEnv : void | string

    contexts : { iframe? : boolean, popup? : boolean }
    defaultContext : string
    
    attributes : {
        iframe? : { [string] : string },
        popup? : { [string] : string }
    }

    containerTemplate : (RenderOptionsType<P>) => HTMLElement | ElementNode
    prerenderTemplate : (RenderOptionsType<P>) => HTMLElement | ElementNode

    validate : void | (Component<P>, (PropsType & P)) => void

    driverCache : { [string] : mixed }

    xchild : ?ChildComponent<P>
    xprops : ?P

    constructor(options : ComponentOptionsType<P>) {
        validate(options);

        // The tag name of the component. Used by some drivers (e.g. angular) to turn the component into an html element,
        // e.g. <my-component>

        this.tag = options.tag;
        this.name = this.tag.replace(/-/g, '_');

        this.allowedParentDomains = options.allowedParentDomains || WILDCARD;

        if (Component.components[this.tag]) {
            throw new Error(`Can not register multiple components with the same tag`);
        }

        // A json based spec describing what kind of props the component accepts. This is used to validate any props before
        // they are passed down to the child.

        this.builtinProps = getInternalProps();
        this.props = options.props || {};

        // The dimensions of the component, e.g. { width: '300px', height: '150px' }

        let { width = DEFAULT_DIMENSIONS.WIDTH, height = DEFAULT_DIMENSIONS.HEIGHT } = options.dimensions || {};
        this.dimensions = { width: toCSS(width), height: toCSS(height) };

        this.defaultEnv = options.defaultEnv;
        this.url = options.url || options.buildUrl;
        this.domain = options.domain;
        this.bridgeUrl = options.bridgeUrl;

        this.attributes = options.attributes || {};
        this.contexts = options.contexts || { iframe: true, popup: false };
        this.defaultContext = options.defaultContext || CONTEXT.IFRAME;

        this.autoResize = (typeof options.autoResize === 'object')
            ? options.autoResize
            : { width: Boolean(options.autoResize), height: Boolean(options.autoResize), element: 'body' };

        this.containerTemplate = options.containerTemplate || defaultContainerTemplate;
        this.prerenderTemplate = options.prerenderTemplate || defaultPrerenderTemplate;

        this.validate = options.validate;

        Component.components[this.tag] = this;

        // Register all of the drivers for instantiating components. The model used is -- there's a standard javascript
        // way of rendering a component, then each other technology (e.g. react) needs to hook into that interface.
        // This makes us a little more pluggable and loosely coupled.
        this.registerDrivers();
        this.registerChild();
        this.listenDelegate();
    }

    @memoize
    getPropNames() : Array<string> {
        let props = Object.keys(this.props);

        for (let key of Object.keys(this.builtinProps)) {
            if (props.indexOf(key) === -1) {
                props.push(key);
            }
        }

        return props;
    }

    // $FlowFixMe
    getProp(name : string) : MixedPropDefinitionType<P> {
        // $FlowFixMe
        return this.props[name] || this.builtinProps[name];
    }

    registerDrivers() {
        this.driverCache = {};

        for (let driverName of Object.keys(drivers)) {
            if (driverName.indexOf('_') === 0) {
                continue;
            }

            let driver = drivers[driverName];
            let glob = driver.global();
            if (glob) {
                this.driver(driverName, glob);
            }
        }
    }

    driver(name : string, dep : mixed) : mixed {
        if (!drivers[name]) {
            throw new Error(`Could not find driver for framework: ${ name }`);
        }

        if (!this.driverCache[name]) {
            this.driverCache[name] = drivers[name].register(this, dep);
        }

        return this.driverCache[name];
    }

    registerChild() : ZalgoPromise<?ChildComponent<P>> {
        return ZalgoPromise.try(() => {
            if (this.isChild()) {
                return new ChildComponent(this);
            }
        });
    }

    listenDelegate() {
        on(`${ POST_MESSAGE.ALLOW_DELEGATE }_${ this.name }`, () => {
            return true;
        });

        on(`${ POST_MESSAGE.DELEGATE }_${ this.name }`, ({ source, data: { context, props, overrides } }) => {
            return this.delegate(source, { context, props, overrides }).getDelegate();
        });
    }

    canRenderTo(win : CrossDomainWindowType) : ZalgoPromise<boolean> {
        return send(win, `${ POST_MESSAGE.ALLOW_DELEGATE }_${ this.name }`).then(({ data }) => {
            return data;
        }).catch(() => {
            return false;
        });
    }

    getUrl(props : BuiltInPropsType & P) : string {
        if (typeof this.url === 'function') {
            return this.url(props);
        }

        if (typeof this.url === 'string') {
            return this.url;
        }

        let env = props.env || this.defaultEnv;
        if (env && typeof this.url === 'object' && this.url[env]) {
            return this.url[env];
        }

        throw new Error(`Can not find url`);
    }

    getInitialDomain(props : BuiltInPropsType & P) : string {
        if (typeof this.domain === 'string') {
            // $FlowFixMe
            return this.domain;
        }

        let env = props.env || this.defaultEnv;
        // $FlowFixMe
        if (env && typeof this.domain === 'object' && !isRegex(this.domain) && this.domain[env]) {
            return this.domain[env];
        }

        return getDomainFromUrl(this.getUrl(props));
    }

    getDomain(props : BuiltInPropsType & P) : string | RegExp {
        if (isRegex(this.domain)) {
            // $FlowFixMe
            return this.domain;
        }

        return this.getInitialDomain(props);
    }

    getBridgeUrl(props : BuiltInPropsType & P) : ?string {
        if (this.bridgeUrl) {
            if (typeof this.bridgeUrl === 'string') {
                return this.bridgeUrl;
            }
    
            let env = props.env || this.defaultEnv;
            if (env && typeof this.bridgeUrl === 'object' && this.bridgeUrl[env]) {
                return this.bridgeUrl[env];
            }
        }
    }

    isZoidComponent() : boolean {
        return isZoidComponentWindow();
    }

    isChild() : boolean {
        return isZoidComponentWindow() && parseChildWindowName().tag === this.tag;
    }


    createError(message : string, tag : ?string) : Error {
        return new Error(`[${ tag || this.tag  }] ${ message }`);
    }


    /*  Init
        ----

        Shortcut to instantiate a component on a parent page, with props
    */

    init(props : (PropsType & P), context : ?string, element : ElementRefType) : ParentComponent<P> {
        return new ParentComponent(this, this.getRenderContext(context, element), { props });
    }


    delegate(source : CrossDomainWindowType, options : DelegateOptionsType) : DelegateComponent<P> {
        return new DelegateComponent(this, source, options);
    }

    validateRenderContext(context : ?string, element : ?ElementRefType) {
        if (context && !this.contexts[context]) {
            throw new Error(`[${ this.tag }] Can not render to ${ context }`);
        }

        if (!element && context === CONTEXT.IFRAME) {
            throw new Error(`[${ this.tag }] Context type ${ CONTEXT.IFRAME } requires an element selector`);
        }
    }

    getDefaultContext() : string {
        if (this.defaultContext && this.contexts[this.defaultContext]) {
            return this.defaultContext;
        } else if (this.contexts[CONTEXT.IFRAME]) {
            return CONTEXT.IFRAME;
        } else if (this.contexts[CONTEXT.POPUP]) {
            return CONTEXT.POPUP;
        }

        throw new Error(`Can not determine default context`);
    }

    getRenderContext(context : ?string, element : ?ElementRefType) : string {
        context = context || this.getDefaultContext();
        this.validateRenderContext(context, element);
        return context;
    }


    /*  Render
        ------

        Shortcut to render a parent component
    */

    render(props : (PropsType & P), element : ?ElementRefType) : ZalgoPromise<ParentComponent<P>> {
        return ZalgoPromise.try(() => {
            let context = this.getRenderContext(null, element);
            return new ParentComponent(this, context, { props }).render(context, element);
        });
    }

    renderIframe(props : (PropsType & P), element : ElementRefType) : ZalgoPromise<ParentComponent<P>> {
        return ZalgoPromise.try(() => {
            let context = this.getRenderContext(CONTEXT.IFRAME, element);
            return new ParentComponent(this, context, { props }).render(context, element);
        });
    }

    renderPopup(props : (PropsType & P)) : ZalgoPromise<ParentComponent<P>> {
        return ZalgoPromise.try(() => {
            let context = this.getRenderContext(CONTEXT.POPUP);
            return new ParentComponent(this, context, { props }).render(context);
        });
    }

    renderTo(win : CrossDomainWindowType, props : (PropsType & P), element : ?ElementRefType) : ZalgoPromise<ParentComponent<P>> {
        return ZalgoPromise.try(() => {
            let context = this.getRenderContext(null, element);
            return new ParentComponent(this, context, { props }).renderTo(context, win, element);
        });
    }

    renderIframeTo(win : CrossDomainWindowType, props : (PropsType & P), element : ElementRefType) : ZalgoPromise<ParentComponent<P>> {
        return ZalgoPromise.try(() => {
            let context = this.getRenderContext(CONTEXT.IFRAME, element);
            return new ParentComponent(this, context, { props }).renderTo(context, win, element);
        });
    }

    renderPopupTo(win : CrossDomainWindowType, props : (PropsType & P)) : ZalgoPromise<ParentComponent<P>> {
        return ZalgoPromise.try(() => {
            let context = this.getRenderContext(CONTEXT.POPUP);
            return new ParentComponent(this, context, { props }).renderTo(context, win);
        });
    }

    /*  Log
        ---

        Log an event using the component name
    */

    log(event : string, payload : { [ string ] : string } = {}) {
        info(this.name, event, payload);
    }


    /*  Log Warning
        -----------

        Log a warning
    */

    logWarning(event : string, payload : { [ string ] : string }) {
        warn(this.name, event, payload);
    }


    /*  Log Error
        ---------

        Log an error
    */

    logError(event : string, payload : { [ string ] : string }) {
        error(this.name, event, payload);
    }

    static components : { [string] : Component<*> } = {}

    static getByTag<T>(tag : string) : Component<T> {
        return Component.components[tag];
    }
}
