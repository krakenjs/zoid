
import { testComponent } from '../component';


describe('vue drivers', () => {

    it('should enter a component rendered with vue and call onEnter', done => {

        let app = document.createElement('div');
        document.body.appendChild(app);
        app.setAttribute('id', 'container');

        window.Vue.component('comp', {
            template: `<vue-component :onEnter = "onEnter"></vue-component>`,
            components: {
                'vue-component': testComponent.driver('vue')
            },
            computed: {
                onEnter() {
                    return function () {
                        this.close().then(done);
                    };
                }
            }
        });

        // eslint-disable-next-line no-unused-vars
        let vm = new window.Vue({
            el: '#container',
            template: `<comp></comp>`
        });




    });


    it('should enter a component rendered with vue and call a prop', done => {

        let app = document.createElement('div');
        document.body.appendChild(app);
        app.setAttribute('id', 'container');

        window.Vue.component('comp', {
            template: `<vue-component :foo = "foo" :run = "this.run"></vue-component>`,
            data() {
                return {
                    run: `window.xprops.foo('bar');`
                };
            },
            components: {
                'vue-component': testComponent.driver('vue')
            },
            computed: {
                foo() {
                    return function (bar) {
                        assert.equal(bar, 'bar');
                        this.close().then(done);
                    };
                }
            }
        });

        // eslint-disable-next-line no-unused-vars
        let vm = new window.Vue({
            el: '#container',
            template: `<comp></comp>`
        });

    });
});


