"use strict";

exports.__esModule = true;
exports.vue = void 0;

var _src = require("belter/src");

var _constants = require("../constants");

const vue = {
  register(component, Vue) {
    return Vue.component(component.tag, {
      render(createElement) {
        return createElement('div');
      },

      inheritAttrs: false,

      mounted() {
        const el = this.$el; // $FlowFixMe

        this.parent = component.init((0, _src.extend)({}, this.$attrs));
        this.parent.render(el, _constants.CONTEXT.IFRAME);
      },

      watch: {
        $attrs: {
          handler: function handler() {
            if (this.parent && this.$attrs) {
              this.parent.updateProps((0, _src.extend)({}, this.$attrs)).catch(_src.noop);
            }
          },
          deep: true
        }
      }
    });
  }

};
exports.vue = vue;