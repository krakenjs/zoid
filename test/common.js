/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { isWindowClosed, type CrossDomainWindowType, type SameDomainWindowType } from 'cross-domain-utils/src';
import { createElement, destroyElement, uniqueID } from 'belter/src';

export function monkeyPatchFunction<T, A>(obj : Object, name : string, handler : ({| call : () => T, args : A |}) => void) : {| cancel : () => void |} {
    const original = obj[name];

    if (!original.monkeyPatch) {
        original.monkeyPatch = {
            handlers: []
        };
    
        obj[name] = function monkeyPatched() : T {
            let called = false;
            let result;

            const call = () => {
                if (!called) {
                    called = true;
                    result = original.apply(this, arguments);
                }

                return result;
            };

            for (const monkeyHandler of original.monkeyPatch.handlers) {
                monkeyHandler({ args: arguments, call });
            }

            return call();
        };
    }

    original.monkeyPatch.handlers.push(handler);

    const cancel = () => {
        original.monkeyPatch.handlers.splice(original.monkeyPatch.handlers.indexOf(handler), 1);
    };

    return {
        cancel
    };
}

export function onWindowOpen({ win = window, doc = win.document, time = 500 } : {| win? : SameDomainWindowType, doc? : HTMLElement, time? : number |} = {}) : ZalgoPromise<SameDomainWindowType> {
    return new ZalgoPromise((resolve, reject) => {
        const winOpenMonkeyPatch = monkeyPatchFunction(win, 'open', ({ call, args }) => {
            const popup = call();
            resolve({ win: popup, popup: { args } });
            winOpenMonkeyPatch.cancel();
        });

        const createElementMonkeyPatch = monkeyPatchFunction(doc, 'createElement', ({ call, args: [ tagName ] }) => {
            const el = call();

            if (tagName && tagName.toLowerCase() === 'iframe') {
                // eslint-disable-next-line prefer-const
                let timeout;

                const cleanup = () => {
                    createElementMonkeyPatch.cancel();
                    // eslint-disable-next-line no-use-before-define
                    appendChildMonkeyPatch.cancel();
                    clearTimeout(timeout);
                };

                const check = () => {
                    if (el.contentWindow) {
                        cleanup();
                        resolve({ win: el.contentWindow, iframe: { element: el } });
                    }
                };

                const appendChildMonkeyPatch = monkeyPatchFunction(win.HTMLElement.prototype, 'appendChild', ({ call: callAppend }) => {
                    callAppend();
                    check();
                });

                timeout = setTimeout(() => {
                    cleanup();
                    return reject(new Error(`Window not opened in ${ time }ms`));
                }, time);
            }
        });

    }).then(({ win: openedWindow, ...rest }) => {

        if (!openedWindow || isWindowClosed(openedWindow)) {
            throw new Error(`Expected win to be open`);
        }

        return { win: openedWindow, ...rest };
    });
}

let isClick = false;
let clickTimeout;

function doClick() {
    isClick = true;

    clearTimeout(clickTimeout);
    clickTimeout = setTimeout(() => {
        isClick = false;
    }, 1);
}


const HTMLElementClick = window.HTMLElement.prototype.click;
window.HTMLElement.prototype.click = function overrideHTMLElementClick() : void {
    doClick();
    return HTMLElementClick.apply(this, arguments);
};

const windowOpen = window.open;
window.open = function patchedWindowOpen() : CrossDomainWindowType {

    if (!isClick) {
        const win : Object = {
            closed: true,
            close() {
                // pass
            },
            location: {
                href:     '',
                pathname: '',
                protocol: '',
                host:     '',
                hostname: ''
            }
        };

        win.parent = win.top = win;
        win.opener = window;

        return win;
    }

    return windowOpen.apply(this, arguments);
};

export function runOnClick<T>(handler : () => T) : T {
    const testButton = createElement('button', { id: 'testButton' }, document.body);
    let didError = false;
    let result;
    let error;
    testButton.addEventListener('click', () => {
        try {
            result = handler();
        } catch (err) {
            didError = true;
            error = err;
        }
    });
    testButton.click();
    destroyElement(testButton);
    if (didError) {
        throw error;
    } else {
        // $FlowFixMe
        return result;
    }
}

export function getContainer({ parent, shadow = false, slots = false } : {| parent? : ?HTMLElement, shadow? : boolean, slots? : boolean |} = {}) : {| container : HTMLElement, destroy : () => void |} {
    const parentContainer = parent = parent || document.body;
    
    if (!parentContainer) {
        throw new Error(`Expected body to be present`);
    }

    const container = document.createElement('div');
    parentContainer.appendChild(container);

    if (!shadow) {
        return {
            container,
            destroy: () => { parentContainer.removeChild(container); }
        };
    }

    const customElementName = `zoid-custom-element-${ uniqueID() }`;
    const customSlotName = `zoid-custom-slot-${ uniqueID() }`;
    
    const shadowContainer = document.createElement(slots ? 'slot' : 'div');
    shadowContainer.setAttribute('name', customSlotName);

    customElements.define(customElementName, class extends HTMLElement {
        connectedCallback() {
            this.attachShadow({ mode: 'open' });

            const shadowRoot = this.shadowRoot;

            if (!shadowRoot) {
                throw new Error(`Expected container to have shadowRoot`);
            }

            shadowRoot.appendChild(shadowContainer);
        }
    });

    const customElement = document.createElement(customElementName);
    parentContainer.appendChild(customElement);

    if (!slots) {
        return {
            container: shadowContainer,
            destroy:   () => { parentContainer.removeChild(customElement); }
        };
    }

    const slotProviderElement = document.createElement('div');
    slotProviderElement.setAttribute('slot', customSlotName);
    parentContainer.appendChild(slotProviderElement);

    return {
        container: slotProviderElement,
        destroy:   () => {
            parentContainer.removeChild(slotProviderElement);
            parentContainer.removeChild(customElement);
        }
    };
}
