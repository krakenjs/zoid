/* @flow */

import type { Component, ComponentDriverType } from '../component/component';
import { extend } from '../lib';

type VueComponent = {
    template : string,
    inheritAttrs : boolean,
    mounted : () => void,
    beforeUpdate : () => void
};

export let vue : ComponentDriverType<*, void> = {


    global() {

    },

    register<P>(component : Component<P>) : VueComponent {

        return {
            template: `<div></div>`,

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
