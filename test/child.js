
import xcomponent from 'src/index';
import postRobot from 'post-robot/src';
import { parseWindowName } from 'src/component/util';

import { testComponent, testComponent2 } from './component';

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
    },

    attachTestComponent2() {
        testComponent2.attach();
    },

    attachTestComponent2AndCallFoo() {
        testComponent2.attach({
            onEnter: function() {
                this.props.foo('bar');
            }
        });
    },

    renderTestComponent2ToParentLightbox() {
        let comp = testComponent.attach({
            onEnter() {
                testComponent2.init({
                    onEnter() {
                        return comp.props.foo();
                    }
                }).renderLightboxToParent();

                postRobot.once('init', () => 'attachTestComponent2');
            }
        });
    },

    renderTestComponent2ToParentPopup() {
        let comp = testComponent.attach({
            onEnter() {

                testComponent2.init({
                    onEnter() {
                        return comp.props.foo();
                    }
                }).renderPopupToParent();

                postRobot.once('init', () => 'attachTestComponent2');
            }
        });
    },

    renderTestComponent2ToParentIframe() {
        let comp = testComponent.attach({
            onEnter() {
                testComponent2.init({
                    onEnter() {
                        return comp.props.foo();
                    }
                }).renderIframeToParent('body');

                postRobot.once('init', () => 'attachTestComponent2');
            }
        });
    },

    renderTestComponent2ToParentLightboxAndPassFoo() {

        testComponent.attach({
            onEnter() {
                testComponent2.init({
                    foo: () => {
                        this.props.foo();
                    }
                }).renderLightboxToParent();

                postRobot.once('init', () => 'attachTestComponent2AndCallFoo');
            }
        });
    }
};




function getParentWindow() {

    let winProps = parseWindowName(window.name);
    let parent = window.opener || window.parent;

    if (winProps && winProps.sibling) {
        return parent.frames[winProps.parent];

    } else {
        return parent;
    }
}

postRobot.send(getParentWindow(), 'init').then(function(caseName) {
    cases[caseName]();
});