/* @flow */

import type { Component, ComponentDriverType } from '../component/component';
import { extend } from '../lib';

type VueComponent = {
    render : (Function) => Element,
    inheritAttrs : boolean,
    mounted : () => void,
    beforeUpdate : () => void
};

export let vue : ComponentDriverType<*, void> = {

    global() {
        // pass
    },

    register<P>(component : Component<P>) : VueComponent {

        return {
            render(createElement) : Element {
                return createElement('div');
            },

            inheritAttrs: false,

            mounted() {
                let el = this.$el;

                // $FlowFixMe
                this.parent = component.init(extend({}, this.$attrs), null, el);

                this.parent.render(el);
            },

            beforeUpdate() {
                
                if (this.parent && this.$attrs) {
                    this.parent.updateProps(extend({}, this.$attrs));
                }
            }
        };
    }
};
