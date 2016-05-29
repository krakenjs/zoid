
import { testComponent } from './component';

var component = testComponent.attach({

    onEnter: function() {
        if (component.props.foo) {
            component.props.foo('bar');
        }
    }
});