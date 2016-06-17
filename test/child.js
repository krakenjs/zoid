
import xcomponent from 'src/index';
import postRobot from 'post-robot/src';
import { parseWindowName } from 'src/component/util';

import { testComponent, testComponent2, testComponent4 } from './component';

let cases = {

    attachTestComponent() {
        testComponent.attach({
            onEnter() {
                if (this.props.sendUrl) {
                    this.props.sendUrl(window.location.href);
                }
            }
        });
    },

    attachTestComponentAndCallFoo() {
        testComponent.attach({
            onEnter: function() {
                this.props.foo('bar');
            }
        });
    },

    attachTestComponentAndCallFooWithBooleanProp() {
        testComponent.attach({
            onEnter: function() {
                this.props.foo(this.props.booleanProp);
            }
        });
    },

    attachTestComponentAndCallFooWithFunctionProp() {
        testComponent.attach({
            onEnter: function() {
                this.props.foo(this.props.functionProp);
            }
        });
    },

    attachTestComponentAndCallFooWithStringProp() {
        testComponent.attach({
            onEnter: function() {
                this.props.foo(this.props.stringProp);
            }
        });
    },

    attachTestComponentAndCallFooWithObjectProp() {
        testComponent.attach({
            onEnter: function() {
                this.props.foo(this.props.objectProp);
            }
        });
    },

    attachTestComponentAndCallFooWithNumberProp() {
        testComponent.attach({
            onEnter: function() {
                this.props.foo(this.props.numberProp);
            }
        });
    },

    attachTestComponentAndCallFooOnProps() {
        testComponent.attach({
            onProps: function() {
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
        testComponent2.attach({
            onEnter() {
                if (this.props.sendUrl) {
                    this.props.sendUrl(window.location.href);
                }
            }
        });
    },

    attachTestComponent4() {
        testComponent4.attach({
            onEnter() {
                if (this.props.sendUrl) {
                    this.props.sendUrl(window.location.href);
                }
            }
        });
    },

    attachTestComponent2AndCallFoo() {
        testComponent2.attach({
            onEnter: function() {
                this.props.foo('bar');
            }
        });
    },

    attachTestComponentAndCallFooOnClose() {
        testComponent.attach({
            onClose: function() {
                this.props.foo();
                window.close = function() {};
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
    },

    renderTestComponent2ToParentLightboxAndClose() {
        let comp = testComponent.attach({
            onEnter() {
                let comp2 = testComponent2.init({
                    onEnter() {
                        comp2.close();
                    },

                    onClose() {
                        comp.props.foo();
                    }
                });

                comp2.renderLightboxToParent();

                postRobot.once('init', () => 'attachTestComponent2');
            }
        });
    },

    renderTestComponent2ToParentLightboxAndCallFooOnClose() {
        let comp = testComponent.attach({
            onEnter() {
                let comp2 = testComponent2.init({
                    onEnter() {

                        let close = comp2.window.close;

                        comp2.window.close = function() {
                            close.apply(this, arguments);
                            comp.props.foo();
                        };

                        comp.props.childEntered();
                    }
                });

                comp2.renderLightboxToParent();

                postRobot.once('init', () => 'attachTestComponent2');
            }
        });
    },

    renderTestComponent2ToParentPopupAndCallFooOnClose() {
        let comp = testComponent.attach({
            onEnter() {
                let comp2 = testComponent2.init({
                    onEnter() {
                        let close = comp2.window.close;

                        comp2.window.close = function() {
                            close.apply(this, arguments);
                            comp.props.foo();
                        };
                        comp.props.childEntered();
                    }
                });

                comp2.renderPopupToParent();

                postRobot.once('init', () => 'attachTestComponent2');
            }
        });
    },

    renderTestComponent2ToParentPopupAndCallFooOnFocus() {
        let comp = testComponent.attach({
            onEnter() {
                let comp2 = testComponent2.init({
                    onEnter() {
                        let focus = comp2.window.focus;

                        comp2.window.focus = function() {
                            focus.apply(this, arguments);
                            comp.props.foo();
                        };

                        comp.props.childEntered();
                    }
                });

                comp2.renderPopupToParent();

                postRobot.once('init', () => 'attachTestComponent2');
            }
        });
    },

    attachTestComponentAndSubmitParentButton() {
        let comp = testComponent.attach({
            onEnter() {

                let comp2 = testComponent2.init({
                    sendUrl: this.props.sendUrl
                });

                postRobot.once('init', () => 'attachTestComponent2');

                var button = document.createElement('button');
                button.addEventListener('click', () => {
                    comp2.hijackSubmitParentForm();
                });

                button.click();
            }
        });
    },

    attachTestComponentAndCallMemoizedFunction() {
        let comp = testComponent.attach({
            onEnter() {
                return this.props.memoizedFunction().then(() => {
                    return this.props.memoizedFunction().then((result) => {
                        return this.props.complete(result);
                    });
                });
            }
        });
    },

    attachTestComponentAndCallOnceFunction() {
        let comp = testComponent.attach({
            onEnter() {
                return this.props.onceFunction().then(() => {
                    return this.props.onceFunction().then((result) => {
                        return this.props.complete(result);
                    });
                });
            }
        });
    },

    attachTestComponentAndCallDenodeifyFunction() {
        let comp = testComponent.attach({
            onEnter() {
                return this.props.denodeifyFunction('foo').then(result => {
                    return this.props.complete(result);
                });
            }
        });
    },

    attachTestComponentAndCallDenodeifyFunctionWithError() {
        let comp = testComponent.attach({
            onEnter() {
                return this.props.denodeifyFunction('foo').catch(err => {
                    return this.props.complete('foobar');
                });
            }
        });
    },

    attachTestComponentWithInvalidName() {

        try {
            testComponent.attach();
        } catch (err) {
            postRobot.sendToParent('complete');
        }
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