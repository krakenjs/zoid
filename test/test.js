

import xcomponent from 'src/index'
import { CONFIG } from 'post-robot/src';
import './tests';

CONFIG.ALLOW_POSTMESSAGE_POPUP = false;

window.console.karma = function() {
    let karma = window.karma || (window.top && window.top.karma) || (window.parent && window.parent.karma) || (window.opener && window.opener.karma);
    if (karma) {
        karma.log('debug', arguments);
    }
    console.log.apply(console, arguments);
};

beforeEach(() => {
    window.onerror = () => {};
});

window.name = '__xcomponent_test_parent_window__';

document.body.style.width = '1000px';
document.body.style.height = '1000px';

afterEach((done) => {
    return xcomponent.destroyAll().then(() => done());
});
