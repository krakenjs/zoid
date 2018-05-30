/* @flow */

import { assert } from 'chai';

import { angular2 } from './../../src/drivers/angular2';

const sinon = window.sinon;

let initializedZoid = {
    render:      sinon.spy(),
    updateProps: sinon.spy()
};

let unInitializedZoid = {
    log:  () => { /* pass */ },
    tag:  'my-log-in',
    init: sinon.spy(() => initializedZoid)
};

const componentClassSpy = sinon.spy(() => 'ng-component value');

const moduleClassSpy = sinon.spy(() => 'ng-module value');

let NgCore = {
    Component: () => {
        return { Class: componentClassSpy };
    },
    NgModule:  () => {
        return { Class: moduleClassSpy };
    },
    ElementRef: {
        nativeElement: 'nativeElement value'
    },
    NgZone: {
        run: sinon.spy((func) => func())
    }
};

// $FlowFixMe
const registerDriver = () => angular2.register(unInitializedZoid, NgCore);

describe('angular 2 driver', () => {

    let ngModule;

    beforeEach(() => {
        sinon.spy(unInitializedZoid, 'log');
        sinon.spy(NgCore, 'Component');
        sinon.spy(NgCore, 'NgModule');
        ngModule = registerDriver();
    });

    afterEach(() => {
        unInitializedZoid.log.restore();
        NgCore.Component.restore();
        NgCore.NgModule.restore();
        ngModule = undefined;
    });

    it('should not enable automatic driver registration', () => {
        assert.isUndefined(angular2.global());
    });

    it('should log out initialization message', () => {
        sinon.assert.calledWith(unInitializedZoid.log, 'initializing angular2 component');
    });

    it('should create component with zoid tag', () => {
        sinon.assert.calledWithMatch(NgCore.Component, { selector: unInitializedZoid.tag });
    });

    it('should create component with empty div template', () => {
        sinon.assert.calledWithMatch(NgCore.Component, { template: '<div></div>' });
    });

    it('should create component with props input', () => {
        sinon.assert.calledWithMatch(NgCore.Component, { inputs: [ 'props' ] });
    });

    it('should create module that declares the component', () => {
        sinon.assert.calledWithMatch(NgCore.NgModule, { declarations: [ 'ng-component value' ] });
    });

    it('should create module that exports the component', () => {
        sinon.assert.calledWithMatch(NgCore.NgModule, { exports: [ 'ng-component value' ] });
    });

    it('should return the module', () => {
        assert.isTrue(ngModule === 'ng-module value');
    });

    describe('component class', () => {
        let componentClass;
        beforeEach(() => {
            componentClass = componentClassSpy.lastCall.args[0];
        });
        afterEach(() => {
            componentClass = undefined;
        });
        describe('constructor', () => {
            it('receives elementRef as a DI token', () => {
                // $FlowFixMe
                assert.isTrue(componentClass.constructor[0] === NgCore.ElementRef);
            });

            it('receives ngZone as a DI token', () => {
                // $FlowFixMe
                assert.isTrue(componentClass.constructor[1] === NgCore.NgZone);

            });

            it('holds a reference to DOM element ', () => {
                const component = {};
                // $FlowFixMe
                componentClass.constructor[componentClass.constructor.length - 1]
                    .bind(component)('elementRef');
                assert.isTrue(component.elementRef === 'elementRef');

            });

            it('holds a reference to ngZone ', () => {
                const component = {};
                // $FlowFixMe
                (componentClass.constructor[componentClass.constructor.length - 1])
                    .bind(component)(null, 'ngZone');
                assert.isTrue(component.zone === 'ngZone');
            });
        });

        describe('ngOnInit', () => {
            let component;

            beforeEach(() => {
                component =  {
                    props: {
                        prefilledEmail: 'a@b.com'
                    }
                };
                // $FlowFixMe
                componentClass.constructor[componentClass.constructor.length - 1]
                    .bind(component)(NgCore.ElementRef, NgCore.NgZone);
                // $FlowFixMe
                componentClass.ngOnInit
                    .bind(component)();
            });

            afterEach(() => {
                component = undefined;
            });

            it('initilize zoid using provided props', () => {
                // $FlowFixMe
                sinon.assert.calledWith(unInitializedZoid.init, component.props, null, 'nativeElement value');
            });

            it('render zoid into target element', () => {
                sinon.assert.calledWith(initializedZoid.render, 'nativeElement value');
            });

            it('saves a reference to parent zoid', () => {
                // $FlowFixMe
                assert.isTrue(component.parent === initializedZoid);
            });

        });

        describe('ngOnChanges', () => {
            let component;
            beforeEach(() => {
                component =  {
                    props: {
                        prefilledEmail: 'a@b.com'
                    }
                };
                // $FlowFixMe
                componentClass.constructor[componentClass.constructor.length - 1]
                    .bind(component)(NgCore.ElementRef, NgCore.NgZone);
                // $FlowFixMe
                componentClass.ngOnInit
                    .bind(component)();
            });

            afterEach(() => {
                component = undefined;
            });

            it('updates props in zoid', () => {
                // $FlowFixMe
                component.props.prefilledEmail = 'b@b.com';
                // $FlowFixMe
                componentClass.ngOnChanges
                    .bind(component)();
                sinon.assert.calledWithMatch(initializedZoid.updateProps, { prefilledEmail: 'b@b.com' });
            });
        });

        it('passed functions trigger change detection when called from zoid', () => {
            let component;
            component =  {
                props: {
                    onLogin: (email) => {
                        // $FlowFixMe
                        component.email = email;
                    }
                }
            };
            // $FlowFixMe
            componentClass.constructor[componentClass.constructor.length - 1]
                .bind(component)(NgCore.ElementRef, NgCore.NgZone);
            // $FlowFixMe
            componentClass.ngOnInit
                .bind(component)();
            const propsPassedToZoid = unInitializedZoid.init.lastCall.args[0];
            propsPassedToZoid.onLogin('c@b.com');
            // $FlowFixMe
            assert.isTrue(component.email === 'c@b.com');
            sinon.assert.calledOnce(NgCore.NgZone.run);
        });
    });

});
