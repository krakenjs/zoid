
import { testComponent } from './component';
import postRobot from 'post-robot/src';

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
    }
};

postRobot.sendToParent('init').then(function(caseName) {
    cases[caseName]();
});