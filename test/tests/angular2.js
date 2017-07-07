import { angular2 } from './../../src/drivers/angular2';
const sinon = window.sinon;

let initializedXcomponent = {
    render: sinon.spy(),
    updateProps: sinon.spy()
};

let unInitializedXcomponent = {
    log: () => {},
    tag: 'my-log-in',
    init: sinon.spy(() => initializedXcomponent)
};

const componentClassSpy = sinon.spy(() => 'ng-component value');

const moduleClassSpy = sinon.spy(() => 'ng-module value');

let NgCore = {
    Component : () => {
        return { Class: componentClassSpy };
    },
    NgModule:  () => {
        return { Class: moduleClassSpy };
    },
    ElementRef: {
        nativeElement: 'nativeElement value'
    },
    NgZone: {}
};

const registerDriver = () => angular2.register(unInitializedXcomponent, NgCore);

describe('angular 2 driver', () => {
    
    let ngModule;

    beforeEach(() => {
        sinon.spy(unInitializedXcomponent, 'log');
        sinon.spy(NgCore, 'Component');
        sinon.spy(NgCore, 'NgModule');
        ngModule = registerDriver();
    });

    afterEach(() => {
        unInitializedXcomponent.log.restore();
        NgCore.Component.restore();
        NgCore.NgModule.restore();
        ngModule = undefined;
    });
    
    it('should not enable automatic driver registeration', () => {
        assert.isFalse(angular2.global());
    });

    it('should logs out initialization message', () => {
        assert.isTrue(unInitializedXcomponent.log.calledWith('initializing angular2 component'));
    });

    it('should creat component with xcomponent tag', () => {
        sinon.assert.calledWithMatch(NgCore.Component, { selector: unInitializedXcomponent.tag });
    });

    it('should creat component with empty div template', () => {
        sinon.assert.calledWithMatch(NgCore.Component, { template: '<div></div>' });
    });

    it('should creat component with props input', () => {
        sinon.assert.calledWithMatch(NgCore.Component, { inputs: ['props'] });
    });

    it('should creat module that declares the component', () => {
        sinon.assert.calledWithMatch(NgCore.NgModule, { declarations: ['ng-component value'] });
    });

    it('should creat module that exports the component', () => {
        sinon.assert.calledWithMatch(NgCore.NgModule, { exports: ['ng-component value'] });
    });

    it('should return the module', () => {
        assert.isTrue(ngModule === 'ng-module value');
    });

    describe('component class', () => {
        let componentClass;
        beforeEach(() => {
            componentClass = componentClassSpy.lastCall.args[0];
        });
        
        describe('constructor', () => {
            it('receives elementRef as a DI token', () => {
                assert.isTrue(componentClass.constructor[0] === NgCore.ElementRef);
            });

            it('receives ngZone as a DI token', () => {
                assert.isTrue(componentClass.constructor[1] === NgCore.NgZone);
                
            });

            it('holds a reference to DOM element ', () => {
                const component = {};
                componentClass.constructor[componentClass.constructor.length - 1]
                    .bind(component)('elementRef');
                assert.isTrue(component.elementRef === 'elementRef');
                
            });

            it('holds a reference to ngZone ', () => {
                const component = {};
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
                componentClass.constructor[componentClass.constructor.length - 1]
                    .bind(component)(NgCore.ElementRef, NgCore.NgZone);
                componentClass.ngOnInit
                    .bind(component)();
            });

            it('initilize xcomponent using provided props', () => {                
                sinon.assert.calledWith(unInitializedXcomponent.init, component.props, null, 'nativeElement value');
            });

            it('render xcomponent into target element', () => {                
                sinon.assert.calledWith(initializedXcomponent.render, 'nativeElement value');
            });

            it('saves a reference to parent xcomponent', () => {                
                assert.isTrue(component.parent === initializedXcomponent);
            });

            afterEach(() => {
                component = undefined;
            });

        });

        // TBC: ngOnChanges
        
        afterEach(() => {
            componentClass = undefined;
        });
    });

});