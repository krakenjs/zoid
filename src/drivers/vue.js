/* @flow */

import { extend, noop } from 'belter/src';

import type { Component, ComponentDriverType } from '../component';
import { CONTEXT } from '../constants';

type VueComponent = {|
    render : (Function) => Element,
    inheritAttrs : boolean,
    mounted : () => void,
    watch : {|
        $attrs : {|
            deep : boolean,
            handler : () => void
        |}
    |}
|};

type RegisteredVueComponent = {|
    
|};

type VueType = {|
    component : (string, VueComponent) => RegisteredVueComponent
|};

export const vue : ComponentDriverType<*, VueType> = {

    register<P>(component : Component<P>, Vue : VueType) : RegisteredVueComponent {

        return Vue.component(component.tag, {
            render(createElement) : Element {
                return createElement('div');
            },

            inheritAttrs: false,

            mounted() {
                const el = this.$el;

                // $FlowFixMe
                this.parent = component.init(extend({}, this.$attrs));
                this.parent.render(el, CONTEXT.IFRAME);
            },

            watch: {
                $attrs: {
                    handler: function handler() {
                        if (this.parent && this.$attrs) {
                            this.parent.updateProps(extend({}, this.$attrs)).catch(noop);
                        }
                    },
                    deep: true
                }
            }
        });
    }
};
