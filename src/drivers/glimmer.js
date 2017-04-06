
export let glimmer = {

    global() {

    },

    register(component, GlimmerComponent) {
        return class extends GlimmerComponent {
            didInsertElement() {
                component.render({ ...this.args }, this.element);
            }
        };
    }
};
