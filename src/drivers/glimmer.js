/* @flow */

import type { Component, ComponentDriverType } from '../component/component';

declare class GlimmerComponentType {
    element : HTMLElement,
    args : Object
}

export let glimmer : ComponentDriverType<*, (typeof GlimmerComponentType)> = {

    global() {
        // pass
    },

    register(component : Component<*>, GlimmerComponent : (typeof GlimmerComponentType)) : (typeof GlimmerComponentType) {
        return class extends GlimmerComponent {
            didInsertElement() {
                component.render({ ...this.args }, this.element);
            }
        };
    }
};
