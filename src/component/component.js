/* @flow */
/* eslint max-lines: 0 */

import { on, send, ProxyWindow, bridge } from 'post-robot/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { isWindow, getDomainFromUrl, type CrossDomainWindowType, isSameTopWindow, getDomain, matchDomain, isSameDomain } from 'cross-domain-utils/src';
import { memoize, isRegex, noop, isElement } from 'belter/src';

import { ChildComponent } from '../child';
import { ParentComponent, type RenderOptionsType, type ParentHelpers } from '../parent';
import { DelegateComponent } from '../delegate';
import { CONTEXT, POST_MESSAGE, WILDCARD, DEFAULT_DIMENSIONS } from '../constants';
import { isZoidComponentWindow, parseChildWindowName } from '../lib';
import type { CssDimensionsType, StringMatcherType, ElementRefType } from '../types';

import { validate } from './validate';
import { defaultContainerTemplate, defaultPrerenderTemplate } from './templates';
import { getInternalProps, type UserPropsDefinitionType, type BuiltInPropsDefinitionType, type PropsInputType, type PropsType, type MixedPropDefinitionType } from './props';

const drivers = __ZOID__.__FRAMEWORK_SUPPORT__
    ? require('../drivers')
    : {};

type LoggerPayload = { [string] : ?string };

// eslint-disable-next-line flowtype/require-exact-type
type Logger = {
    debug : (event : string, payload? : LoggerPayload) => void,
    info : (event : string, payload? : LoggerPayload) => void,
    warn : (event : string, payload? : LoggerPayload) => void,
    error : (event : string, payload? : LoggerPayload) => void
};

/*  Component
    ---------

    This is the spec for the component. The idea is, when I call zoid.create(), it will create a new instance
    of Component with the blueprint needed to set up ParentComponents and ChildComponents.

    This is the one portion of code which is required by -- and shared to -- both the parent and child windows, and
    contains all of the configuration needed for them to set themselves up.
*/

export type ComponentOptionsType<P> = {|

    tag : string,

    url : string | ({ props : PropsType<P> }) => string,
    domain? : string | RegExp,
    bridgeUrl? : string,

    props? : UserPropsDefinitionType<P>,

    dimensions? : CssDimensionsType,
    autoResize? : { width? : boolean, height? : boolean, element? : string },

    allowedParentDomains? : StringMatcherType,

    attributes? : {
        iframe? : { [string] : string },
        popup? : { [string] : string }
    },

    defaultContext? : $Values<typeof CONTEXT>,

    containerTemplate? : (RenderOptionsType<P>) => HTMLElement,
    prerenderTemplate? : (RenderOptionsType<P>) => HTMLElement,

    validate? : ({ props : PropsInputType<P> }) => void,

    logger? : Logger
|};

type ZoidRenderer = {|
    render : (element? : ElementRefType, context? : $Values<typeof CONTEXT>) => ZalgoPromise<void>,
    renderTo : (target : CrossDomainWindowType, element? : ElementRefType, context? : $Values<typeof CONTEXT>) => ZalgoPromise<void>
|};

export type ZoidComponentInstance<P> = {| ...ParentHelpers<P>, ...ZoidRenderer |};

export type ZoidComponent<P> = {|
    (PropsInputType<P>) : ZoidComponentInstance<P>,
    driver : (string, mixed) => mixed,
    isChild : () => boolean,
    xprops? : PropsType<P>,
    canRenderTo : (CrossDomainWindowType) => ZalgoPromise<boolean>
|};

export class Component<P> {

    tag : string
    name : string
    
    url : string | ({ props : PropsType<P> }) => string
    domain : void | string | RegExp
    bridgeUrl : void | string

    props : UserPropsDefinitionType<P>
    builtinProps : BuiltInPropsDefinitionType<P>

    dimensions : CssDimensionsType
    autoResize : void | { width? : boolean, height? : boolean, element? : string }

    allowedParentDomains : StringMatcherType

    defaultContext : $Values<typeof CONTEXT>
    
    attributes : {
        iframe? : { [string] : string },
        popup? : { [string] : string }
    }

    containerTemplate : (RenderOptionsType<P>) => HTMLElement
    prerenderTemplate : (RenderOptionsType<P>) => HTMLElement

    validate : void | ({ props : PropsInputType<P> }) => void

    driverCache : { [string] : mixed }

    xprops : ?PropsType<P>

    logger : Logger

    constructor(options : ComponentOptionsType<P>) {
        validate(options);

        // The tag name of the component. Used by some drivers (e.g. angular) to turn the component into an html element,
        // e.g. <my-component>

        this.tag = options.tag;
        this.name = this.tag.replace(/-/g, '_');

        this.allowedParentDomains = options.allowedParentDomains || WILDCARD;

        if (Component.components[this.tag]) {
            throw new Error(`Can not register multiple components with the same tag: ${ this.tag }`);
        }

        // A json based spec describing what kind of props the component accepts. This is used to validate any props before
        // they are passed down to the child.

        this.builtinProps = getInternalProps();
        this.props = options.props || {};

        // The dimensions of the component, e.g. { width: '300px', height: '150px' }

        const { width = DEFAULT_DIMENSIONS.WIDTH, height = DEFAULT_DIMENSIONS.HEIGHT } = options.dimensions || {};
        this.dimensions = { width, height };

        this.url = options.url;
        this.domain = options.domain;
        this.bridgeUrl = options.bridgeUrl;

        this.attributes = options.attributes || {};
        this.attributes.iframe = this.attributes.iframe || {};
        this.attributes.popup = this.attributes.popup || {};

        this.defaultContext = options.defaultContext || CONTEXT.IFRAME;

        this.autoResize = options.autoResize;

        this.containerTemplate = options.containerTemplate || defaultContainerTemplate;
        this.prerenderTemplate = options.prerenderTemplate || defaultPrerenderTemplate;

        this.validate = options.validate;

        this.logger = options.logger || {
            debug: noop,
            info:  noop,
            warn:  noop,
            error: noop
        };

        this.registerChild();
        this.listenDelegate();

        Component.components[this.tag] = this;
    }

    @memoize
    getPropNames() : $ReadOnlyArray<string> {
        const props = Object.keys(this.props);

        for (const key of Object.keys(this.builtinProps)) {
            if (props.indexOf(key) === -1) {
                props.push(key);
            }
        }

        return props;
    }

    // $FlowFixMe
    getPropDefinition(name : string) : MixedPropDefinitionType<P> {
        // $FlowFixMe
        return this.props[name] || this.builtinProps[name];
    }

    driver(name : string, dep : mixed) : mixed {
        if (!drivers[name]) {
            throw new Error(`Could not find driver for framework: ${ name }`);
        }

        this.driverCache = this.driverCache || {};

        if (!this.driverCache[name]) {
            this.driverCache[name] = drivers[name].register(this, dep);
        }

        return this.driverCache[name];
    }

    registerChild() {
        if (this.isChild()) {
            if (window.xprops) {
                throw new Error(`Can not register ${ this.name } as child - can not attach multiple components to the same window`);
            }

            const child = new ChildComponent(this);
            window.xprops = this.xprops = child.getProps();
        }
    }

    listenDelegate() {
        on(`${ POST_MESSAGE.ALLOW_DELEGATE }_${ this.name }`, () => {
            return true;
        });

        on(`${ POST_MESSAGE.DELEGATE }_${ this.name }`, ({ source, data: { context, props, overrides } }) => {
            const delegate = new DelegateComponent(this, source, { context, props, overrides });
            return delegate.getDelegate();
        });
    }

    canRenderTo(win : CrossDomainWindowType) : ZalgoPromise<boolean> {
        return send(win, `${ POST_MESSAGE.ALLOW_DELEGATE }_${ this.name }`).then(({ data }) => {
            return data;
        }).catch(() => {
            return false;
        });
    }

    getUrl(props : PropsType<P>) : string {
        if (typeof this.url === 'function') {
            return this.url({ props });
        }

        return this.url;
    }

    getInitialDomain(props : PropsType<P>) : string {
        if (this.domain && typeof this.domain === 'string') {
            return this.domain;
        }

        return getDomainFromUrl(this.getUrl(props));
    }

    getDomain(props : PropsType<P>) : string | RegExp {
        if (isRegex(this.domain)) {
            // $FlowFixMe
            return this.domain;
        }

        return this.getInitialDomain(props);
    }

    getBridgeUrl() : ?string {
        if (this.bridgeUrl) {
            return this.bridgeUrl;
        }
    }

    isChild() : boolean {
        return isZoidComponentWindow() && parseChildWindowName().tag === this.tag;
    }

    getDefaultElement(context : $Values<typeof CONTEXT>, element : ?ElementRefType) : ElementRefType {
        if (element) {
            if (!isElement(element) && typeof element !== 'string') {
                throw new Error(`Expected element to be passed`);
            }

            return element;
        }

        if (context === CONTEXT.POPUP) {
            return 'body';
        }

        throw new Error(`Expected element to be passed to render iframe`);
    }

    getDefaultContext(context : ?$Values<typeof CONTEXT>, props : PropsInputType<P>) : $Values<typeof CONTEXT> {
        if (props.window) {
            return ProxyWindow.toProxyWindow(props.window).getType();
        }

        if (context) {
            if (context !== CONTEXT.IFRAME && context !== CONTEXT.POPUP) {
                throw new Error(`Unrecognized context: ${ context }`);
            }
            
            return context;
        }

        return this.defaultContext;
    }

    init(props : PropsInputType<P>) : ZoidComponentInstance<P> {

        // $FlowFixMe
        props = props || {};
        
        const parent = new ParentComponent(this, props);

        const render = (target, element, context) => ZalgoPromise.try(() => {
            if (!isWindow(target)) {
                throw new Error(`Must pass window to renderTo`);
            }

            context = this.getDefaultContext(context, props);
            element = this.getDefaultElement(context, element);
            return parent.render(target, element, context);
        });

        return {
            ...parent.getHelpers(),
            render:   (element, context) => render(window, element, context),
            renderTo: (target, element, context) => render(target, element, context)
        };
    }

    checkAllowRender(target : CrossDomainWindowType, domain : string | RegExp, element : ElementRefType) {
        if (target === window) {
            return;
        }

        if (!isSameTopWindow(window, target)) {
            throw new Error(`Can only renderTo an adjacent frame`);
        }

        const origin = getDomain();

        if (!matchDomain(domain, origin) && !isSameDomain(target)) {
            throw new Error(`Can not render remotely to ${ domain.toString() } - can only render to ${ origin }`);
        }

        if (element && typeof element !== 'string') {
            throw new Error(`Element passed to renderTo must be a string selector, got ${ typeof element } ${ element }`);
        }
    }

    log(event : string, payload? : LoggerPayload) {
        this.logger.info(`${ this.name }_${ event }`, payload);
    }

    static components : { [string] : Component<*> } = {}
    static activeComponents : Array<ParentComponent<*> | DelegateComponent<*>> = [] // eslint-disable-line flowtype/no-mutable-array

    registerActiveComponent<Q>(instance : ParentComponent<Q> | DelegateComponent<Q>) {
        Component.activeComponents.push(instance);
    }

    destroyActiveComponent<Q>(instance : ParentComponent<Q> | DelegateComponent<Q>) {
        Component.activeComponents.splice(Component.activeComponents.indexOf(instance), 1);
    }

    static destroyAll() : ZalgoPromise<void> {
        if (bridge) {
            bridge.destroyBridges();
        }

        const results = [];

        while (Component.activeComponents.length) {
            results.push(Component.activeComponents[0].destroy());
        }

        return ZalgoPromise.all(results).then(noop);
    }
}

export type ComponentDriverType<P, T : mixed> = {|
    register : (Component<P>, T) => mixed
|};

export function create<P>(options : ComponentOptionsType<P>) : ZoidComponent<P> {
    const component : Component<P> = new Component(options);

    const init = (props) => component.init(props);
    init.driver = (name, dep) => component.driver(name, dep);
    init.isChild = () => component.isChild();
    init.canRenderTo = (win) => component.canRenderTo(win);
    init.xprops = component.xprops;

    // $FlowFixMe
    return init;
}

export function destroyAll() : ZalgoPromise<void> {
    return Component.destroyAll();
}
