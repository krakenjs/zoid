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

type OnWindowOpenOptions = {|
    win? : SameDomainWindowType,
    doc? : HTMLElement,
    time? : number,
    namePattern? : RegExp
|};

type OnWindowOpenResult = {|
    win : SameDomainWindowType,
    url : ?string,
    name : ?string,
    iframe : ?{|
        element : HTMLIFrameElement
    |},
    popup : ?{|
        args : [ string, ?string, ?string ]
    |}
|};

export function onWindowOpen({ win = window, doc = win.document, time = 500, namePattern = /.*/ } : OnWindowOpenOptions = {}) : ZalgoPromise<OnWindowOpenResult> {
    return new ZalgoPromise((resolve, reject) => {
        const winOpenMonkeyPatch = monkeyPatchFunction(win, 'open', ({ call, args }) => {
            const popup = call();
            const [ url, name ] = args;
            
            if (name.match(namePattern)) {
                resolve({ win: popup, url, name, popup: { args }, iframe: null });
                winOpenMonkeyPatch.cancel();
            }
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
                    if (el.contentWindow && el.name.match(/^__zoid_/) && el.name.match(namePattern)) {
                        cleanup();
                        resolve({ win: el.contentWindow, url: el.src, name: el.name, iframe: { element: el }, popup: null });
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

    }).then(({ win: openedWindow, iframe, popup, name, url }) => {

        if (!openedWindow || isWindowClosed(openedWindow)) {
            throw new Error(`Expected win to be open`);
        }

        return { win: openedWindow, name, url, iframe, popup };
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

export function getContainer({ parent, shadow = false, slots = false, nested = false } : {| parent? : ?HTMLElement, shadow? : boolean, slots? : boolean, nested? : boolean |} = {}) : {| container : HTMLElement, destroy : () => void |} {
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
    const innerWrapperName = `zoid-inner-wrapper-${ uniqueID() }`;
    
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

    customElements.define(innerWrapperName, class extends HTMLElement {
        connectedCallback() {
            const shadowRoot = this.attachShadow({ mode: 'open' });
            shadowRoot.appendChild(shadowContainer);
        }
    });

    const customElement = document.createElement(customElementName);
    parentContainer.appendChild(customElement);

    if (nested) {
        const innerWrapper = document.createElement(innerWrapperName);

        const customElementShadowRoot = customElement.shadowRoot;

        if (customElementShadowRoot) {
            customElementShadowRoot.appendChild(innerWrapper);
        }

        const innerWrapperShadowRoot = innerWrapper.shadowRoot;
        const innerWrapperContainer = document.createElement('div');

        if (innerWrapperShadowRoot) {
            innerWrapperShadowRoot.appendChild(innerWrapperContainer);
        }

        return {
            container: innerWrapperContainer,
            destroy:   () => {
                parentContainer.removeChild(customElement);
            }
        };
    }


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

export function getBody(win? : SameDomainWindowType = window) : HTMLBodyElement {
    if (!win.document.body) {
        throw new Error(`Window has no body`);
    }

    return win.document.body;
}

// eslint-disable-next-line no-restricted-globals, promise/no-native
export function loadScript(url : string) : Promise<void> {
    const scriptElement = document.createElement('script');
    scriptElement.setAttribute('src', url);
    getBody().prepend(scriptElement);

    // eslint-disable-next-line no-restricted-globals, promise/no-native
    const scriptPromise = new Promise((resolve) => {
        scriptElement.addEventListener('load', () => resolve());
    });

    return scriptPromise;
}
