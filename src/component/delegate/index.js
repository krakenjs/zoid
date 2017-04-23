
import { BaseComponent } from '../base';
import { ParentComponent } from '../parent';
import { RENDER_DRIVERS } from '../parent/drivers';
import { onCloseWindow, addEventListener } from '../../lib';

export class DelegateComponent extends BaseComponent {

    constructor(component, source, options = {}) {
        super(component, options);

        this.component = component;
        this.clean.set('source', source);

        this.context = options.context;

        this.props = options.props;

        this.props = {
            uid:        options.props.uid,
            dimensions: options.props.dimensions,
            onClose:    options.props.onClose,
            onDisplay:  options.props.onDisplay,
            logLevel:   options.props.logLevel
        };

        this.focus     = options.overrides.focus;
        this.userClose = options.overrides.userClose;
        this.getDomain = options.overrides.getDomain;
        this.getContainerTemplate = options.overrides.getContainerTemplate;
        this.getComponentTemplate = options.overrides.getComponentTemplate;

        let delegateOverrides = RENDER_DRIVERS[options.context].delegateOverrides;

        for (let key of Object.keys(delegateOverrides)) {
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
        let unloadListener = addEventListener(window, 'beforeunload', closeListener.cancel);

        this.clean.register(() => {
            closeListener.cancel();
            unloadListener.cancel();
        });
    }

    getOverrides(context) {

        let delegateOverrides = RENDER_DRIVERS[context].delegateOverrides;

        let overrides = {};

        let self = this;

        for (let key of Object.keys(delegateOverrides)) {
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
