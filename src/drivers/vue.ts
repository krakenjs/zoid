import { noop, dasherizeToCamel } from 'belter/src';

import type { ComponentDriverType } from '../component';
import { CONTEXT } from '../constants';

type VueComponent = {
    render: (arg0: (...args: Array<any>) => any) => Element
    inheritAttrs: boolean
    mounted: () => void
    watch: {
        $attrs: {
            deep: boolean
            handler: () => void
        }
    }
}
type RegisteredVueComponent = {}
type VueType = {
    component: (arg0: string, arg1: VueComponent) => RegisteredVueComponent
}

function propsToCamelCase(props: Record<string, any>): Record<string, any> {
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

export const vue: ComponentDriverType<
    any,
    VueType,
    RegisteredVueComponent,
    any
> = {
    register: (tag, propsDef, init, Vue) => {
        return Vue.component(tag, {
            render(createElement): Element {
                return createElement('div');
            },

            inheritAttrs: false,

            mounted() {
                // $FlowFixMe[object-this-reference]
                const el = this.$el;
                // $FlowFixMe[object-this-reference]
                this.parent = init({ ...propsToCamelCase(this.$attrs) });
                // $FlowFixMe[object-this-reference]
                this.parent.render(el, CONTEXT.IFRAME);
            },

            watch: {
                $attrs: {
                    handler: function handler() {
                        if (this.parent && this.$attrs) {
                            this.parent
                                .updateProps({ ...this.$attrs })
                                .catch(noop);
                        }
                    },
                    deep: true
                }
            }
        });
    }
};
