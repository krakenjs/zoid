
import postRobot from 'post-robot/dist/post-robot';
import { noop } from './util';

export class ChildComponent {

    constructor(component, options = {}) {
        this.validate(options);

        this.component = component;
        this.enter = options.enter || noop;
        this.exit = options.exit || noop;
        
        postRobot.sendToParent('xcomponent_init').then(data => {
            
            this.id = data.id;
            this.props = data.props;

            for (let key of Object.keys(this.component.props)) {
                let prop = this.component.props[key];
                
                if (prop.type === 'function') {
                    this.props[key] = function() {
                        let args = Array.prototype.slice.call(arguments);
                        
                        try {
                            JSON.stringify(args);
                        } catch (err) {
                            throw new Error(`Can not serialize arguments passed to props.${key}`);
                        }
                        
                        return postRobot.sendToParent('xcomponent_prop_function', {
                            key: key,
                            args: args
                        });
                    }
                }
            }

            this.enter.call(this);
        });
    }

    validate(options) {
        // pass
    }
}