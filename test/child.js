
import xcomponent from 'src/index';
import postRobot from 'post-robot/src';

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
            }
        });
    }
};





/*

function parseWindowName(name) {
    let winProps;

    try {
        winProps = JSON.parse(b64decode(name));
    } catch (err) {
        return;
    }

    if (!winProps || winProps.type !== CONSTANTS.XCOMPONENT) {
        return;
    }

    return winProps;
}

function getParentWindow() {

    let winProps = parseWindowName(window.name);
    let parent = window.opener || window.parent;

    if (winProps.proxy && winProps.parent) {
        return parent.frames[winProps.parent];

    } else {
        return parent;
    }
}

*/


postRobot.sendToParent('init').then(function(caseName) {
    cases[caseName]();
});