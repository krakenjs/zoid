/* @flow */
/* eslint max-lines: 0 */

import { isSameDomain, matchDomain, getDomain, type CrossDomainWindowType } from 'cross-domain-utils/src';
import { markWindowKnown, deserializeMessage } from 'post-robot/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { extend, onDimensionsChange, trackDimensions, dimensionsMatchViewport,
    cycle, getElement, noop, waitForDocumentReady } from 'belter/src';

import { getParentComponentWindow, getComponentMeta, getParentDomain } from '../window';
import { globalFor } from '../../lib';
import { CONTEXT_TYPES, CLOSE_REASONS, INITIAL_PROPS } from '../../constants';
import type { Component } from '../component';
import type { BuiltInPropsType } from '../component/props';
import type { DimensionsType } from '../../types';
import type { ParentExportsType } from '../parent';

import { normalizeChildProps } from './props';

export type ChildExportsType<P> = {
    updateProps : (props : (BuiltInPropsType & P)) => ZalgoPromise<void>,
    close : () => ZalgoPromise<void>
};

/*  Child Component
    ---------------

    This is the portion of code which runs inside the frame or popup window containing the component's implementation.

    When the component author calls myComponent.attach(), it creates a new instance of ChildComponent, which is then
    responsible for managing the state and messaging back up to the parent, and providing props for the component to
    utilize.
*/

export class ChildComponent<P> {

    component : Component<P>
    props : BuiltInPropsType & P
    context : string
    parentExports : ParentExportsType<P>

    onPropHandlers : Array<(BuiltInPropsType & P) => void>
    onInit : ZalgoPromise<ChildComponent<P>>
    watchingForResize : boolean
    autoResize : { width : boolean, height : boolean, element? : string }

    constructor(component : Component<P>) {
        ZalgoPromise.try(() => {
            if (window.xchild || window.xprops) {
                throw this.component.createError(`Can not attach multiple components to the same window`);
            }

            let parentDomain = getParentDomain();
            let parentComponentWindow = this.getParentComponentWindow();

            this.parentExports = deserializeMessage(parentComponentWindow, parentDomain, getComponentMeta().exports);

            this.component = component;
            this.onPropHandlers = [];
    
            window.xchild = this.component.xchild = this;
            this.setProps(this.getInitialProps(), getParentDomain());
    
            this.checkParentDomain();
    
            markWindowKnown(parentComponentWindow);
    
            this.watchForClose();
            this.listenForResize();
            this.watchForResize();

            return this.parentExports.init(this.buildExports());

        }).catch(err => {
            this.error(err);
        });
    }

    listenForResize() {
        if (this.component.listenForResize) {
            this.parentExports.trigger.fireAndForget('resize');
            window.addEventListener('resize', () => {
                this.parentExports.trigger.fireAndForget('resize');
            });
        }
    }

    checkParentDomain() {
        if (!matchDomain(this.component.allowedParentDomains, getParentDomain())) {
            throw new Error(`Can not be rendered by domain: ${ getParentDomain() }`);
        }
    }

    onProps(handler : Function) {
        this.onPropHandlers.push(handler);
    }

    getParentComponentWindow() : CrossDomainWindowType {
        return getParentComponentWindow();
    }

    getInitialProps() : (BuiltInPropsType & P) {
        let componentMeta = getComponentMeta();

        let props = componentMeta.props;
        let parentComponentWindow = getParentComponentWindow();

        if (props.type === INITIAL_PROPS.RAW) {
            props = props.value;
        } else if (props.type === INITIAL_PROPS.UID) {

            if (!isSameDomain(parentComponentWindow)) {

                if (window.location.protocol === 'file:') {
                    throw new Error(`Can not get props from file:// domain`);
                }

                throw new Error(`Parent component window is on a different domain - expected ${ getDomain() } - can not retrieve props`);
            }

            let global = globalFor(parentComponentWindow);

            if (!global) {
                throw new Error(`Can not find global for parent component - can not retrieve props`);
            }

            props = global.props[componentMeta.uid];

        } else {
            throw new Error(`Unrecognized props type: ${ props.type }`);
        }

        if (!props) {
            throw new Error(`Initial props not found`);
        }

        return deserializeMessage(parentComponentWindow, getParentDomain(), props);
    }


    setProps(props : (BuiltInPropsType & P), origin : string, required : boolean = true) {
        // $FlowFixMe
        this.props = this.props || {};
        let normalizedProps = normalizeChildProps(this.component, props, origin, required);
        extend(this.props, normalizedProps);
        for (let handler of this.onPropHandlers) {
            handler.call(this, this.props);
        }
        window.xprops = this.component.xprops = this.props;
    }

    watchForClose() {
        window.addEventListener('unload', () => {
            return this.parentExports.checkClose.fireAndForget();
        });
    }

    enableAutoResize({ width = true, height = true } : { width : boolean, height : boolean } = {}) {
        this.autoResize = { width, height };
        this.watchForResize();
    }

    getAutoResize() : { width : boolean, height : boolean, element : HTMLElement } {

        let width = false;
        let height = false;

        let autoResize = this.autoResize || this.component.autoResize;

        if (typeof autoResize === 'object') {
            width = Boolean(autoResize.width);
            height = Boolean(autoResize.height);
        } else if (autoResize) {
            width = true;
            height = true;
        }

        let element;

        if (autoResize.element) {
            element = getElement(autoResize.element);
        } else if (window.navigator.userAgent.match(/MSIE (9|10)\./)) {
            element = document.body;
        } else {
            element = document.documentElement;
        }

        // $FlowFixMe
        return { width, height, element };
    }

    watchForResize() : ?ZalgoPromise<void> {

        let { width, height, element } = this.getAutoResize();

        if (!width && !height) {
            return;
        }

        if (getComponentMeta().context === CONTEXT_TYPES.POPUP) {
            return;
        }

        if (this.watchingForResize) {
            return;
        }

        this.watchingForResize = true;

        return ZalgoPromise.try(() => {
            return waitForDocumentReady();

        }).then(() => {

            // $FlowFixMe
            if (!dimensionsMatchViewport(element, { width, height })) {
                // $FlowFixMe
                return this.resizeToElement(element, { width, height });
            }

        }).then(() => {

            return cycle(() => {
                return onDimensionsChange(element, { width, height }).then(() => {
                    // $FlowFixMe
                    return this.resizeToElement(element, { width, height });
                });
            });
        });
    }

    buildExports() : ChildExportsType<P> {

        let self = this;

        return {
            updateProps(props : (BuiltInPropsType & P)) : ZalgoPromise<void> {
                return ZalgoPromise.try(() => self.setProps(props, this.origin, false));
            },

            close() : ZalgoPromise<void> {
                return ZalgoPromise.try(() => self.destroy());
            }
        };
    }

    resize(width : ?number, height : ?number) : ZalgoPromise<void> {
        return this.parentExports.resize(width, height);
    }

    resizeToElement(el : HTMLElement, { width, height } : DimensionsType) : ZalgoPromise<void> {

        let history = [];

        let resize = () => {
            return ZalgoPromise.try(() => {

                // $FlowFixMe
                let tracker = trackDimensions(el, { width, height });
                let { dimensions } = tracker.check();

                for (let size of history) {

                    let widthMatch = !width || size.width === dimensions.width;
                    let heightMatch = !height || size.height === dimensions.height;

                    if (widthMatch && heightMatch) {
                        return;
                    }
                }

                history.push({ width: dimensions.width, height: dimensions.height });

                return this.resize(width ? dimensions.width : null, height ? dimensions.height : null).then(() => {

                    if (tracker.check().changed) {
                        return resize();
                    }
                });
            });
        };

        return resize();
    }

    hide() : ZalgoPromise<void> {
        return this.parentExports.hide();
    }

    show() : ZalgoPromise<void> {
        return this.parentExports.show();
    }

    userClose() : ZalgoPromise<void> {
        return this.close(CLOSE_REASONS.USER_CLOSED);
    }

    close(reason : string = CLOSE_REASONS.CHILD_CALL) : ZalgoPromise<void> {
        return this.parentExports.close(reason);
    }
    
    destroy() : ZalgoPromise<void> {
        return ZalgoPromise.try(() => {
            window.close();
        });
    }

    focus() {
        window.focus();
    }

    error(err : mixed) : ZalgoPromise<void> {
        // eslint-disable-next-line promise/no-promise-in-callback
        return this.parentExports.error(err).then(noop).finally(() => {
            return this.destroy();
        }).then(() => {
            throw err;
        });
    }
}
