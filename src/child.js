
import postRobot from 'post-robot/dist/post-robot';

export class ChildComponent {

    constructor(component, options) {
        this.component = component;
        this.options = options || {};
        this.validate();
        
        postRobot.sendToParent('xcomponent_init').then(data => {
            
            this.id = data.id;
            this.props = data.props;

            for (let key of Object.keys(this.component.options.props)) {
                let prop = this.component.options.props[key];
                
                if (prop.type === 'function') {
                    this.props[key] = function() {
                        let args = Array.prototype.slice.call(arguments);
                        
                        try {
                            JSON.stringify(args);
                        } catch (err) {
                            throw new Error(`Can not serialize arguments passed to props.${key}`);
                        }
                        
                        postRobot.sendToParent('xcomponent_prop_function', {
                            key: key,
                            args: args
                        });
                    }
                }
            }

            this.options.enter.call(this);
        });
    }

    validate() {
        // pass
    }
}