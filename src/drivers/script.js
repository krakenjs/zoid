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

            component.log(`instantiate_script_component_error`);

            throw new Error(`
               'x-component' script type is no longer supported.  
               Please migrate to another integration pattern.
            `);
      
        }

        function scan() {
            let scriptTags = Array.prototype.slice.call(document.getElementsByTagName('script'));

            for (let element of scriptTags) {
                render(element);
            }
        }

        scan();
        window.addEventListener('load', scan);
    }
};
