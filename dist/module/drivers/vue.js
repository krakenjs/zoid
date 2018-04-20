'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.vue = undefined;

var _lib = require('../lib');

var vue = exports.vue = {
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
                this.parent = component.init((0, _lib.extend)({}, this.$attrs), null, el);

                this.parent.render(el);
            },
            beforeUpdate: function beforeUpdate() {

                if (this.parent && this.$attrs) {
                    this.parent.updateProps((0, _lib.extend)({}, this.$attrs));
                }
            }
        };
    }
};