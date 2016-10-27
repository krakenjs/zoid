
import { BaseComponent } from '../base';
import { ParentComponent } from '../parent';
import { RENDER_DRIVERS } from '../parent/drivers';
import { onCloseWindow, addEventListener } from '../../lib';

export class DelegateComponent extends BaseComponent {

    constructor(component, source, options = {}) {
        super(component, options);

        this.component = component;
        this.source = source;

        this.context = options.context;

        this.props = options.props;

        this.props = {
            uid:        options.props.uid,
            dimensions: options.props.dimensions,
            onClose:    options.props.onClose
        };

        this.focus     = options.overrides.focus;
        this.userClose = options.overrides.userClose;
        this.getDomain = options.overrides.getDomain;
        this.getParentTemplate = options.overrides.getParentTemplate;

        let renderToParentOverrides = RENDER_DRIVERS[options.context].renderToParentOverrides;

        for (let key of Object.keys(renderToParentOverrides)) {
            this[key] = ParentComponent.prototype[key];
        }

        this.childWindowName = options.childWindowName;

        ParentComponent.prototype.registerActiveComponent.call(this);

        this.watchForClose();
    }

    get driver() {

        if (!this.context) {
            throw new Error('Context not set');
        }

        return RENDER_DRIVERS[this.context];
    }

    watchForClose() {
        let closeListener = onCloseWindow(this.source, () => this.destroy());

        addEventListener(window, 'beforeunload', closeListener.cancel);
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
        return this.clean.all();
    }
}