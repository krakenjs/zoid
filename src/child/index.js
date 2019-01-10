/* @flow */
/* eslint max-lines: 0 */

import { isSameDomain, matchDomain, getDomain, getOpener, getTop, getParent,
    getNthParentFromTop, getAncestor, getAllFramesInWindow, type CrossDomainWindowType, onCloseWindow } from 'cross-domain-utils/src';
import { markWindowKnown, deserializeMessage } from 'post-robot/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { extend, memoized, waitForDocumentBody, onResize, getElementSafe } from 'belter/src';

import { parseChildWindowName, globalFor } from '../lib';
import { CONTEXT, INITIAL_PROPS, WINDOW_REFERENCES } from '../constants';
import type { Component } from '../component';
import type { PropsType } from '../component/props';
import type { WindowRef, PropRef, ParentExportsType } from '../parent';

import { normalizeChildProps } from './props';

export type ChildExportsType<P> = {|
    updateProps : (props : (PropsType<P>)) => ZalgoPromise<void>,
    close : () => ZalgoPromise<void>
|};

export type ChildHelpers<P> = {|
    close : () => ZalgoPromise<void>,
    focus : () => ZalgoPromise<void>,
    resize : ({ width : ?number, height : ?number }) => ZalgoPromise<void>,
    onError : (mixed) => ZalgoPromise<void>,
    onPropsChange : ((PropsType<P>) => void) => void
|};

/*  Child Component
    ---------------

    This is the portion of code which runs inside the frame or popup window containing the component's implementation.

    When the component author calls myComponent.attach(), it creates a new instance of ChildComponent, which is then
    responsible for managing the state and messaging back up to the parent, and providing props for the component to
    utilize.
*/

export class ChildComponent<P> {

    component : Component<P>
    props : PropsType<P>
    context : string
    parent : ParentExportsType<P>
    parentComponentWindow : CrossDomainWindowType

    onPropHandlers : Array<(PropsType<P>) => void> // eslint-disable-line flowtype/no-mutable-array
    autoResize : { width : boolean, height : boolean, element? : string }

    constructor(component : Component<P>) {
        ZalgoPromise.try(() => {
            this.component = component;
            this.onPropHandlers = [];
            
            const { parent, domain, exports, context, props } = parseChildWindowName();

            this.context = context;
            this.parentComponentWindow = this.getWindowByRef(parent);
            this.parent = deserializeMessage(this.parentComponentWindow, domain, exports);

            this.checkParentDomain(domain);

            const initialProps = this.getPropsByRef(this.parentComponentWindow, domain, props);
            this.setProps(initialProps, domain);
            markWindowKnown(this.parentComponentWindow);
            
            this.watchForClose();

            return this.parent.init(this.buildExports());

        }).then(() => {
            return this.watchForResize();

        }).catch(err => {
            this.onError(err);
        });
    }

    getHelpers() : ChildHelpers<P> {
        return {
            focus:         () => this.focus(),
            close:         () => this.close(),
            resize:        ({ width, height }) => this.resize({ width, height }),
            onError:       (err) => this.onError(err),
            onPropsChange: (handler) => this.onPropsChange(handler)
        };
    }

    checkParentDomain(domain : string) {
        if (!matchDomain(this.component.allowedParentDomains, domain)) {
            throw new Error(`Can not be rendered by domain: ${ domain }`);
        }
    }

    onPropsChange(handler : Function) {
        this.onPropHandlers.push(handler);
    }

    getPropsByRef(parentComponentWindow : CrossDomainWindowType, domain : string, { type, value, uid } : PropRef) : (PropsType<P>) {
        let props;

        if (type === INITIAL_PROPS.RAW) {
            props = value;
        } else if (type === INITIAL_PROPS.UID) {

            if (!isSameDomain(parentComponentWindow)) {
                if (window.location.protocol === 'file:') {
                    throw new Error(`Can not get props from file:// domain`);
                }

                throw new Error(`Parent component window is on a different domain - expected ${ getDomain() } - can not retrieve props`);
            }

            const global = globalFor(parentComponentWindow);

            if (!global) {
                throw new Error(`Can not find global for parent component - can not retrieve props`);
            }

            props = global.props[uid];
        }

        if (!props) {
            throw new Error(`Initial props not found`);
        }

        return deserializeMessage(parentComponentWindow, domain, props);
    }

    getWindowByRef(ref : WindowRef) : CrossDomainWindowType {
        const { type } = ref;
        let result;
    
        if (type === WINDOW_REFERENCES.OPENER) {
            result = getOpener(window);
    
        } else if (type === WINDOW_REFERENCES.TOP) {
            result = getTop(window);
    
        } else if (type === WINDOW_REFERENCES.PARENT) {
            // $FlowFixMe
            const { distance } = ref;
    
            if (distance) {
                result = getNthParentFromTop(window, distance);
            } else {
                result = getParent(window);
            }
        }
    
        if (type === WINDOW_REFERENCES.GLOBAL) {
            // $FlowFixMe
            const { uid } = ref;
            const ancestor = getAncestor(window);
    
            if (ancestor) {
                for (const frame of getAllFramesInWindow(ancestor)) {
                    const global = globalFor(frame);
    
                    if (global && global.windows && global.windows[uid]) {
                        result = global.windows[uid];
                        break;
                    }
                }
            }
        }
    
        if (!result) {
            throw new Error(`Unable to find ${ type } window`);
        }
    
        return result;
    }

    getProps() : PropsType<P> {
        // $FlowFixMe
        this.props = this.props || {};
        return this.props;
    }


    setProps(props : PropsType<P>, origin : string, isUpdate : boolean = false) {
        const helpers = this.getHelpers();
        const existingProps = this.getProps();
        const normalizedProps = normalizeChildProps(this.parentComponentWindow, this.component, props, origin, helpers, isUpdate);

        extend(existingProps, normalizedProps);

        for (const handler of this.onPropHandlers) {
            handler.call(this, existingProps);
        }
    }

    watchForClose() {
        window.addEventListener('beforeunload', () => {
            return this.parent.checkClose.fireAndForget();
        });

        window.addEventListener('unload', () => {
            return this.parent.checkClose.fireAndForget();
        });

        onCloseWindow(this.parentComponentWindow, () => {
            this.destroy();
        });
    }

    enableAutoResize({ width = false, height = true, element = 'body' } : { width : boolean, height : boolean, element : string } = {}) {
        this.autoResize = { width, height, element };
        this.watchForResize();
    }

    getAutoResize() : { width : boolean, height : boolean, element : ?HTMLElement } {
        let { width = false, height = false, element = 'body' } = this.autoResize || this.component.autoResize || {};
        element = getElementSafe(element);
        return { width, height, element };
    }

    @memoized
    watchForResize() : ?ZalgoPromise<void> {
        return waitForDocumentBody().then(() => {
            const { width, height, element } = this.getAutoResize();

            if (!element) {
                return;
            }

            if (!width && !height) {
                return;
            }
    
            if (this.context === CONTEXT.POPUP) {
                return;
            }

            onResize(element, ({ width: newWidth, height: newHeight }) => {
                this.resize({
                    width:  width ? newWidth : undefined,
                    height: height ? newHeight : undefined
                });
            }, { width, height });
        });
    }

    buildExports() : ChildExportsType<P> {

        const self = this;

        return {
            updateProps(props : (PropsType<P>)) : ZalgoPromise<void> {
                return ZalgoPromise.try(() => self.setProps(props, this.origin, true));
            },

            close() : ZalgoPromise<void> {
                return ZalgoPromise.try(() => self.destroy());
            }
        };
    }

    resize({ width, height } : { width : ?number, height : ?number }) : ZalgoPromise<void> {
        return this.parent.resize.fireAndForget({ width, height });
    }

    close() : ZalgoPromise<void> {
        return this.parent.close();
    }
    
    destroy() : ZalgoPromise<void> {
        return ZalgoPromise.try(() => {
            window.close();
        });
    }

    focus() : ZalgoPromise<void> {
        return ZalgoPromise.try(() => {
            window.focus();
        });
    }

    onError(err : mixed) : ZalgoPromise<void> {
        return ZalgoPromise.try(() => {
            if (this.parent && this.parent.onError) {
                return this.parent.onError(err);
            } else {
                throw err;
            }
        });
    }
}
