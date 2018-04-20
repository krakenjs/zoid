/* @flow */

import type { Component, ComponentDriverType } from '../component/component';

export let script : ComponentDriverType<*, Document> = {

    global() : ?Document {
        return window.document;
    },

    register(component : Component<*>, document : Document) {

        function render(element : HTMLElement) {

            if (!element || !element.tagName || element.tagName.toLowerCase() !== 'script') {
                return;
            }

            // $FlowFixMe
            if (!element.attributes.type || element.attributes.type.value !== 'application/x-component' || !element.parentNode) {
                return;
            }

            let tag = element.getAttribute('data-component');

            if (!tag || tag !== component.tag) {
                return;
            }

            component.log(`instantiate_script_component`);

            let props : { [string] : mixed } = element.innerText
                ? eval(`(${ element.innerText })`) // eslint-disable-line no-eval, security/detect-eval-with-expression
                : {};

            let container = document.createElement('div');

            if (!element.parentNode) {
                throw new Error(`Element has no parent`);
            }

            element.parentNode.replaceChild(container, element);

            // $FlowFixMe
            component.render(props, container);
        }

        function scan() {
            let scriptTags = Array.prototype.slice.call(document.getElementsByTagName('script'));

            for (let element of scriptTags) {
                render(element);
            }
        }

        scan();
        document.addEventListener('DOMContentLoaded', scan);
        window.addEventListener('load', scan);

        document.addEventListener('DOMNodeInserted', event => {
            // $FlowFixMe
            render(event.target);
        });
    }
};
