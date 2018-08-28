
import { extend } from '../lib';

export var vue = {
    global: function global() {
        // pass
    },
    register: function register(component) {

        return {
            template: '<div></div>',

            inheritAttrs: false,

            mounted: function mounted() {
                var el = this.$el;

                // $FlowFixMe
                this.parent = component.init(extend({}, this.$attrs), null, el);

                this.parent.render(el);
            },
            beforeUpdate: function beforeUpdate() {

                if (this.parent && this.$attrs) {
                    this.parent.updateProps(extend({}, this.$attrs));
                }
            }
        };
    }
};