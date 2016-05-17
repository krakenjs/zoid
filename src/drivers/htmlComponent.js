
import { dasherizeToCamel } from '../util';

export var htmlComponent = {

    register(component) {
        document.registerElement(component.tag);

        let elements = Array.prototype.slice.call(document.getElementsByTagName(component.tag));

        for (let element of elements) {

            let props = {};

            for (let attr of Array.prototype.slice.call(element.attributes)) {
                let { name, value } = attr;
                name = dasherizeToCamel(name);

                if (value.indexOf('$') === 0) {
                    props[name] = eval(`window.${value.slice(1)}`); // eslint-disable-line
                } else {
                    props[name] = value;
                }
            }

            component.initFromProps(props).renderIframe(element);
        }
    }
}