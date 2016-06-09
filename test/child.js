
import xcomponent from 'src/index';
import postRobot from 'post-robot/src';

import { testComponent } from './component';

let cases = {

    attachTestComponent() {
        testComponent.attach();
    },

    attachTestComponentAndCallFoo() {
        testComponent.attach({
            onEnter: function() {
                this.props.foo('bar');
            }
        });
    },

    attachTestComponentAndThrowRegularError() {
        testComponent.attach({
            onEnter: function() {
                throw new Error('xxxxx');
            }
        });
    },

    attachTestComponentAndThrowIntegrationError() {
        testComponent.attach({
            onEnter: function() {
                throw new xcomponent.IntegrationError('xxxxx');
            }
        });
    }
};

postRobot.sendToParent('init').then(function(caseName) {
    cases[caseName]();
});