/* @flow */
/* eslint max-lines: 0 */

import { setup as setupPostRobot, on, send, bridge, toProxyWindow, destroy as destroyPostRobot } from 'post-robot/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { isWindow, getDomain, matchDomain, type CrossDomainWindowType, type DomainMatcher } from 'cross-domain-utils/src';
import { noop, isElement, cleanup, memoize, identity, extend, uniqueID } from 'belter/src';

import { childComponent, type ChildComponent } from '../child';
import { type RenderOptionsType, type ParentHelpers, parentComponent } from '../parent/parent';
import { ZOID, CONTEXT, POST_MESSAGE, WILDCARD, METHOD, PROP_TYPE } from '../constants';
import { react, angular, vue, vue3, angular2 } from '../drivers';
import { getGlobal, destroyGlobal, getInitialParentPayload, isChildComponentWindow } from '../lib';
import type { CssDimensionsType, StringMatcherType, ContainerReferenceType } from '../types';

import { validateOptions } from './validate';
import { defaultContainerTemplate, defaultPrerenderTemplate } from './templates';
import { getBuiltInProps, type UserPropsDefinitionType, type PropsDefinitionType, type PropsInputType,
    type PropsType, type ParentPropType, type exportPropType, type DEFINITION_TYPE } from './props';

type LoggerPayload = { [string] : ?string | ?boolean };

// eslint-disable-next-line flowtype/require-exact-type
type Logger = {
    info : (event : string, payload? : LoggerPayload) => any // eslint-disable-line flowtype/no-weak-types
};

/*  Component
    ---------

    This is the spec for the component. The idea is, when I call zoid.create(), it will create a new instance
    of Component with the blueprint needed to set up ParentComponents and ChildComponents.

    This is the one portion of code which is required by -- and shared to -- both the parent and child windows, and
    contains all of the configuration needed for them to set themselves up.
*/

type Attributes = {|
    iframe? : { [string] : string },
    popup? : { [string] : string }
|};

export type ExportsConfigDefinition = {|
    [string] : {|
        type : DEFINITION_TYPE
    |}
|};

export type ExportsMapperDefinition<X> = ({|
    getExports : () => ZalgoPromise<X>
|}) => X;

export type ExportsDefinition<X> = ExportsConfigDefinition | ExportsMapperDefinition<X>;

export type ComponentOptionsType<P, X, C> = {|

    tag : string,

    url : string | ({| props : PropsType<P> |}) => string,
    domain? : DomainMatcher,
    bridgeUrl? : string,
    method? : $Values<typeof METHOD>,

    props? : UserPropsDefinitionType<P, X>,

    dimensions? : CssDimensionsType | ({| props : PropsType<P> |}) => CssDimensionsType,
    autoResize? : {| width? : boolean, height? : boolean, element? : string |},

    allowedParentDomains? : StringMatcherType,

    attributes? : Attributes | ({| props : PropsType<P> |}) => Attributes,

    eligible? : ({| props : PropsInputType<P> |}) => {| eligible : boolean, reason? : string |},

    defaultContext? : $Values<typeof CONTEXT>,

    containerTemplate? : (RenderOptionsType<P>) => ?HTMLElement,
    prerenderTemplate? : (RenderOptionsType<P>) => ?HTMLElement,

    validate? : ({| props : PropsInputType<P> |}) => void,

    logger? : Logger,

    children? : () => C,

    exports? : ExportsDefinition<X>
|};

export type AttributesType = {|
    iframe? : { [string] : string },
    popup? : { [string] : string }
|};

type AutoResizeType = {|
    width? : boolean,
    height? : boolean,
    element? : string
|};

export type NormalizedComponentOptionsType<P, X, C> = {|
    tag : string,
    name : string,

    url : string | ({| props : PropsType<P> |}) => string,
    domain : ?DomainMatcher,
    bridgeUrl : ?string,
    method : ?$Values<typeof METHOD>,

    propsDef : PropsDefinitionType<P, X>,
    dimensions : CssDimensionsType | ({| props : PropsType<P> |}) => CssDimensionsType,
    autoResize : AutoResizeType,

    allowedParentDomains : StringMatcherType,

    attributes : AttributesType | ({| props : PropsType<P> |}) => AttributesType,

    eligible : ({| props : PropsInputType<P> |}) => {| eligible : boolean, reason? : string |},

    defaultContext : $Values<typeof CONTEXT>,

    containerTemplate : (RenderOptionsType<P>) => ?HTMLElement,
    prerenderTemplate : ?(RenderOptionsType<P>) => ?HTMLElement,

    validate : ?({| props : PropsInputType<P> |}) => void,
    logger : Logger,

    children : () => C,

    exports : ExportsMapperDefinition<X>
|};

export type ZoidComponentInstance<P, X = void, C = void> = {|
    ...ParentHelpers<P>,
    ...X,
    ...C,
    isEligible : () => boolean,
    clone : () => ZoidComponentInstance<P, X, C>,
    render : (container? : ContainerReferenceType, context? : $Values<typeof CONTEXT>) => ZalgoPromise<void>,
    renderTo : (target : CrossDomainWindowType, container? : ContainerReferenceType, context? : $Values<typeof CONTEXT>) => ZalgoPromise<void>
|};

// eslint-disable-next-line flowtype/require-exact-type
export type ZoidComponent<P, X = void, C = void> = {
    (props? : PropsInputType<P> | void) : ZoidComponentInstance<P, X, C>,
    // eslint-disable-next-line no-undef
    driver : <T>(string, mixed) => T,
    isChild : () => boolean,
    xprops? : PropsType<P>,
    canRenderTo : (CrossDomainWindowType) => ZalgoPromise<boolean>,
    instances : $ReadOnlyArray<ZoidComponentInstance<P, X, C>>
};

const getDefaultAttributes = () : AttributesType => {
    // $FlowFixMe
    return {};
};

const getDefaultAutoResize = () : AutoResizeType => {
    // $FlowFixMe
    return {};
};

const getDefaultExports = <X>() : () => X => {
    // $FlowFixMe
    return noop;
};

const getDefaultDimensions = () : CssDimensionsType => {
    // $FlowFixMe
    return {};
};

function normalizeOptions<P, X, C>(options : ComponentOptionsType<P, X, C>) : NormalizedComponentOptionsType<P, X, C> {
    const {
        tag,
        url,
        domain,
        bridgeUrl,
        props = {},
        dimensions = getDefaultDimensions(),
        autoResize = getDefaultAutoResize(),
        allowedParentDomains = WILDCARD,
        attributes = getDefaultAttributes(),
        defaultContext = CONTEXT.IFRAME,
        containerTemplate = (__ZOID__.__DEFAULT_CONTAINER__ ? defaultContainerTemplate : null),
        prerenderTemplate = (__ZOID__.__DEFAULT_PRERENDER__ ? defaultPrerenderTemplate : null),
        validate,
        eligible = () => ({ eligible: true }),
        logger = { info: noop },
        exports: xportsDefinition = getDefaultExports(),
        method,
        children = () : C => {
            // $FlowFixMe
            return {};
        }
    } = options;

    const name = tag.replace(/-/g, '_');

    // $FlowFixMe[incompatible-type]
    // $FlowFixMe[cannot-spread-inexact]
    const propsDef : PropsDefinitionType<P, X> = {
        ...getBuiltInProps(),
        ...props
    };

    if (!containerTemplate) {
        throw new Error(`Container template required`);
    }

    const xports = typeof xportsDefinition === 'function'
        ? xportsDefinition
        : ({ getExports }) : X => {
            const result = {};

            for (const key of Object.keys(xportsDefinition)) {
                const { type } = xportsDefinition[key];
                const valuePromise = getExports().then(res => {
                    // $FlowFixMe
                    return res[key];
                });

                if (type === PROP_TYPE.FUNCTION) {
                    result[key] = (...args) => valuePromise.then(value => value(...args));
                } else {
                    result[key] = valuePromise;
                }
            }

            // $FlowFixMe
            return result;
        };

    return {
        name,
        tag,
        url,
        domain,
        bridgeUrl,
        method,
        propsDef,
        dimensions,
        autoResize,
        allowedParentDomains,
        attributes,
        defaultContext,
        containerTemplate,
        prerenderTemplate,
        validate,
        logger,
        eligible,
        children,
        exports:     xports
    };
}

let cleanInstances = cleanup();
const cleanZoid = cleanup();

export type Component<P, X, C> = {|
    init : (props? : PropsInputType<P> | void) => ZoidComponentInstance<P, X, C>,
    instances : $ReadOnlyArray<ZoidComponentInstance<P, X, C>>,
    driver : (string, mixed) => mixed,
    isChild : () => boolean,
    canRenderTo : (CrossDomainWindowType) => ZalgoPromise<boolean>,
    registerChild : () => ?ChildComponent<P, X>
|};

export function component<P, X, C>(opts : ComponentOptionsType<P, X, C>) : Component<P, X, C> {
    if (__DEBUG__) {
        validateOptions(opts);
    }

    const options = normalizeOptions(opts);

    const {
        name,
        tag,
        defaultContext,
        propsDef,
        eligible,
        children
    } = options;

    const global = getGlobal(window);
    const driverCache = {};
    const instances = [];

    const isChild = () : boolean => {
        if (isChildComponentWindow(name)) {
            const { payload } = getInitialParentPayload();
            if (payload.tag === tag && matchDomain(payload.childDomainMatch, getDomain())) {
                return true;
            }
        }

        return false;
    };

    const registerChild = memoize(() : ?ChildComponent<P, X> => {
        if (isChild()) {
            if (window.xprops) {
                delete global.components[tag];
                throw new Error(`Can not register ${ name } as child - child already registered`);
            }

            const child = childComponent(options);
            child.init();
            return child;
        }
    });

    const listenForDelegate = () => {
        const allowDelegateListener = on(`${ POST_MESSAGE.ALLOW_DELEGATE }_${ name }`, () => {
            return true;
        });

        const delegateListener = on(`${ POST_MESSAGE.DELEGATE }_${ name }`, ({ source, data: { uid, overrides } }) => {
            return {
                parent: parentComponent({
                    uid, options, overrides, parentWin: source
                })
            };
        });

        cleanZoid.register(allowDelegateListener.cancel);
        cleanZoid.register(delegateListener.cancel);
    };

    const canRenderTo = (win : CrossDomainWindowType) : ZalgoPromise<boolean> => {
        return send(win, `${ POST_MESSAGE.ALLOW_DELEGATE }_${ name }`).then(({ data }) => {
            return data;
        }).catch(() => {
            return false;
        });
    };

    const getDefaultContainer = (context : $Values<typeof CONTEXT>, container? : ContainerReferenceType) : ContainerReferenceType => {
        if (container) {
            if (typeof container !== 'string' && !isElement(container)) {
                throw new TypeError(`Expected string or element selector to be passed`);
            }

            return container;
        }

        if (context === CONTEXT.POPUP) {
            return 'body';
        }

        throw new Error(`Expected element to be passed to render iframe`);
    };

    const getDefaultContext = (props : PropsInputType<P>, context : ?$Values<typeof CONTEXT>) : ZalgoPromise<$Values<typeof CONTEXT>> => {
        return ZalgoPromise.try(() => {
            if (props.window) {
                return toProxyWindow(props.window).getType();
            }

            if (context) {
                if (context !== CONTEXT.IFRAME && context !== CONTEXT.POPUP) {
                    throw new Error(`Unrecognized context: ${ context }`);
                }

                return context;
            }

            return defaultContext;
        });
    };

    const getDefaultInputProps = () : PropsInputType<P> => {
        // $FlowFixMe
        return {};
    };

    const init = (inputProps? : PropsInputType<P> | void) : ZoidComponentInstance<P, X, C> => {
        // eslint-disable-next-line prefer-const
        let instance;

        const uid = `${ ZOID }-${ tag }-${ uniqueID() }`;
        const props = inputProps || getDefaultInputProps();

        const { eligible: eligibility, reason } = eligible({ props });
        const isEligible = () => eligibility;

        const onDestroy = props.onDestroy;
        props.onDestroy = (...args) => {
            if (instance && eligibility) {
                instances.splice(instances.indexOf(instance), 1);
            }

            if (onDestroy) {
                return onDestroy(...args);
            }
        };

        const parent = parentComponent({
            uid, options
        });

        parent.init();

        if (eligibility) {
            parent.setProps(props);
        } else {
            if (props.onDestroy) {
                props.onDestroy();
            }
        }

        cleanInstances.register(err => {
            return parent.destroy(err || new Error(`zoid destroyed all components`));
        });

        const clone = ({ decorate = identity } = {}) => {
            return init(decorate(props));
        };

        const getChildren = () : C => {
            // $FlowFixMe
            const childComponents : {| [string] : ZoidComponent<mixed> |} = children();
            const result = {};

            for (const childName of Object.keys(childComponents)) {
                const Child : ZoidComponent<mixed> = childComponents[childName];

                result[childName] = (childInputProps) => {
                    const parentProps : PropsType<P> = parent.getProps();
                    const parentExport : exportPropType<X> = parent.export;

                    const childParent : ParentPropType<P, X> = {
                        uid,
                        props:  parentProps,
                        export: parentExport
                    };
                    
                    const childProps : PropsInputType<mixed> = {
                        ...childInputProps,
                        parent: childParent
                    };

                    return Child(childProps);
                };
            }

            // $FlowFixMe
            return result;
        };

        const render = (target, container, context) => {
            return ZalgoPromise.try(() => {
                if (!eligibility) {
                    const err = new Error(reason || `${ name } component is not eligible`);

                    return parent.destroy(err).then(() => {
                        throw err;
                    });
                }

                if (!isWindow(target)) {
                    throw new Error(`Must pass window to renderTo`);
                }

                return getDefaultContext(props, context);

            }).then(finalContext => {
                container = getDefaultContainer(finalContext, container);

                if (target !== window && typeof container !== 'string') {
                    throw new Error(`Must pass string element when rendering to another window`);
                }

                return parent.render({
                    target,
                    container,
                    context:    finalContext,
                    rerender: () => {
                        const newInstance = clone();
                        extend(instance, newInstance);
                        return newInstance.renderTo(target, container, context);
                    }
                });

            }).catch(err => {
                return parent.destroy(err).then(() => {
                    throw err;
                });
            });
        };

        instance = {
            ...parent.getExports(),
            ...parent.getHelpers(),
            ...getChildren(),
            isEligible,
            clone,
            render:   (container, context) => render(window, container, context),
            renderTo: (target, container, context) => render(target, container, context)
        };

        if (eligibility) {
            instances.push(instance);
        }

        return instance;
    };

    const driver = (driverName : string, dep : mixed) : mixed => {
        if (__ZOID__.__FRAMEWORK_SUPPORT__) {
            const drivers = { react, angular, vue, vue3, angular2 };

            if (!drivers[driverName]) {
                throw new Error(`Could not find driver for framework: ${ driverName }`);
            }

            if (!driverCache[driverName]) {
                driverCache[driverName] = drivers[driverName].register(tag, propsDef, init, dep);
            }

            return driverCache[driverName];
        } else {
            throw new Error(`Driver support not enabled`);
        }
    };

    registerChild();
    listenForDelegate();

    global.components = global.components || {};
    if (global.components[tag]) {
        throw new Error(`Can not register multiple components with the same tag: ${ tag }`);
    }
    global.components[tag] = true;

    return {
        init,
        instances,
        driver,
        isChild,
        canRenderTo,
        registerChild
    };
}

export type ComponentDriverType<P, L, D, X, C> = {|
    register : (string, PropsDefinitionType<P, X>, (PropsInputType<P>) => ZoidComponentInstance<P, X, C>, L) => D
|};

export type ZoidProps<P> = PropsType<P>;

// eslint-disable-next-line no-undef
export type CreateZoidComponent = <P, X, C>(options : ComponentOptionsType<P, X, C>) => ZoidComponent<P, X, C>;

export const create : CreateZoidComponent = <P, X, C>(options : ComponentOptionsType<P, X, C>) : ZoidComponent<P, X, C> => {
    setupPostRobot();

    const comp = component(options);

    const init = (props? : PropsInputType<P> | void) => comp.init(props);
    init.driver = (name, dep) => comp.driver(name, dep);
    init.isChild = () => comp.isChild();
    init.canRenderTo = (win) => comp.canRenderTo(win);
    init.instances = comp.instances;

    const child = comp.registerChild();
    if (child) {
        window.xprops = init.xprops = child.getProps();
    }

    return init;
};

export function destroyComponents(err? : mixed) : ZalgoPromise<void> {
    if (bridge) {
        bridge.destroyBridges();
    }

    const destroyPromise = cleanInstances.all(err);
    cleanInstances = cleanup();
    return destroyPromise;
}

export const destroyAll = destroyComponents;

export function destroy(err? : mixed) : ZalgoPromise<void> {
    destroyAll();
    destroyGlobal();
    destroyPostRobot();
    return cleanZoid.all(err);
}
