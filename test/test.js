
import xcomponent from 'src/index';
import './tests';

xcomponent.postRobot.CONFIG.ALLOW_POSTMESSAGE_POPUP = false;

beforeEach(() => {
    window.onerror = () => {};
});

window.name = '__xcomponent_test_parent_window__';

document.body.style.width = '1000px';
document.body.style.height = '1000px';

afterEach(() => {
    xcomponent.destroyAll();
});