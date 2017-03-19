
export let htmlComponent = {

    isActive() {
        return true;
    },

    register(component) {

        function render(element) {

            if (!element || !element.tagName || element.tagName.toLowerCase() !== 'script') {
                return;
            }

            if (!element.attributes.type || element.attributes.type.value !== 'application/x-component') {
                return;
            }

            if (!element.attributes['data-component'] || element.attributes['data-component'].value !== component.tag) {
                return;
            }

            component.log(`instantiate_script_component`);

            let props = eval(`(${element.innerText})`); // eslint-disable-line no-eval

            let container = document.createElement('div');
            element.parentNode.replaceChild(container, element);

            component.render(props, container);
        }

        function scan() {
            let scriptTags = Array.prototype.slice.call(document.getElementsByTagName('script'));

            for (let element of scriptTags) {
                render(element);
            }
        }

        scan();
        document.addEventListener('DOMContentLoaded', scan);
        window.addEventListener('load', scan);

        document.addEventListener('DOMNodeInserted', event => {
            render(event.target);
        });
    }
};
