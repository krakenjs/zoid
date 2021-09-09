/* @flow */
import { dasherizeToCamel, noop } from 'belter/src';

import type { ComponentDriverType } from '../component';
import { CONTEXT } from '../constants';

function propsToCamelCase(props : Object) : Object {
    return Object.keys(props).reduce((acc, key) => {
        const value = props[key];
        // In vue `style` is a reserved prop name
        if (key === 'style-object' || key === 'styleObject') {
            acc.style = value;
            // To keep zoid as generic as possible, passing in the original prop name as well
            acc.styleObject = value;
        } else if (key.includes('-')) {
            acc[dasherizeToCamel(key)] = value;
        } else {
            acc[key] = value;
        }
        return acc;
    }, {});
}

export const vue3 : ComponentDriverType<*, *, *, *, *> = {
    register: (tag, propsDef, init) => {
        return {
            template: `<div></div>`,

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
                            this.parent.updateProps({ ...this.$attrs }).catch(noop);
                        }
                    },
                    deep: true
                }
            }
        };

    }
};
