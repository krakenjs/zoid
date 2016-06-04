
import xcomponent from 'src/index';
import postRobot from 'post-robot/src';

import { testComponent } from './component';

describe('xcomponent tests', function() {

    it('should enter a component', function(done) {
        testComponent.init({
            onEnter: done
        }).renderLightbox();
    });

    it('should enter a component and call a prop', function(done) {
        var component = testComponent.init({

            props: {
                foo: function(bar) {
                    assert.equal(bar, 'bar');
                    done();
                }
            }

        }).renderLightbox();
    });
});