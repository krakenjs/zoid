
import { BaseComponent } from '../base';
import { ParentComponent } from '../parent';
import { RENDER_DRIVERS } from '../parent/drivers';

export class DelegateComponent extends BaseComponent {

    constructor(component, options = {}) {
        super(component, options);

        this.component = component;

        this.context = options.context;

        this.props = options.props;
        
        this.focus     = options.overrides.focus;
        this.userClose = options.overrides.userClose;
        this.getDomain = options.overrides.getDomain;

        let renderToParentOverrides = RENDER_DRIVERS[options.context].renderToParentOverrides;

        for (let key of Object.keys(renderToParentOverrides)) {
            this[key] = ParentComponent.prototype[key];
        }

        this.childWindowName = options.childWindowName;

        ParentComponent.prototype.registerActiveComponent.call(this);
    }

    getOverrides(context) {

        let renderToParentOverrides = RENDER_DRIVERS[context].renderToParentOverrides;

        let overrides = {};

        let self = this;

        for (let key of Object.keys(renderToParentOverrides)) {
            overrides[key] = function() {
                return ParentComponent.prototype[key].apply(self, arguments);
            };
        }

        return overrides;
    }

    destroy() {
        this.cleanup();
    }
}