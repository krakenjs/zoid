import { extend } from '../lib';


export let vue = {


    global() {

    },

    register(component) {

        return {
            template: `<div></div>`,

            inheritAttrs: false,

            mounted () {

                let el = this.$el;

                this.parent = component.init(extend({}, this.$attrs), null, el);

                this.parent.render(el);

            },

            beforeUpdate () {
                
                if (this.parent && this.$attrs) {
                    this.parent.updateProps(extend({}, this.$attrs));
                }
            }
        };
    }
};
