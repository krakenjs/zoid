/* @flow */

import { noop, dasherizeToCamel } from 'belter/src';

import type { ComponentDriverType } from '../component';
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

function propsToCamelCase(props : Object) : Object {
    return Object.keys(props).reduce((acc, key) => {
        const value = props[key];
        if (key.includes('-')) {
            acc[dasherizeToCamel(key)] = value;
        } else {
            acc[key] = value;
        }
        return acc;
    }, {});
}

export const vue : ComponentDriverType<*, VueType, RegisteredVueComponent, *> = {

    register: (tag, propsDef, init, Vue) => {

        return Vue.component(tag, {
            render(createElement) : Element {
                return createElement('div');
            },

            inheritAttrs: false,

            mounted() {
                const el = this.$el;
                this.parent = init({ ...propsToCamelCase(this.$attrs) });
                this.parent.render(el, CONTEXT.IFRAME);
            },

            watch: {
                $attrs: {
                    handler: function handler() {
                        if (this.parent && this.$attrs) {
                            this.parent.updateProps({ ...this.$attrs }).catch(noop);
                        }
                    },
                    deep: true
                }
            }
        });
    }
};
