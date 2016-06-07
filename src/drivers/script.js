
export let htmlComponent = {

    isActive() {
        return true;
    },

    register(component) {

        function scan() {
            let scriptTags = Array.prototype.slice.call(document.getElementsByTagName('script'));
            let componentTags = scriptTags.filter(scr => scr.attributes['data-component']);

            for (let element of componentTags) {
                var props;

                eval(`props = ${element.innerText}`); // eslint-disable-line no-eval

                let container = document.createElement('div');
                element.parentNode.replaceChild(container, element);

                component.init(props).render(container);
            }
        }

        scan();
        document.addEventListener('DOMContentLoaded', scan);
    }
};
