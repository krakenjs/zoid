
import { b64encode, b64decode, extend } from '../lib';
import { CONSTANTS } from '../constants';

/*  Build Child Window Name
    -----------------------

    Build a name for our child window. This should identify the following things to the child:

    - That the window was created by, and is owned by xcomponent
    - The name of the child's parent. This is so the child can identify which window created it, even when we do a
      renderToParent, in which case the true parent may actually be a sibling frame in the window hierarchy

    We base64 encode the window name so IE doesn't die when it encounters any characters that it doesn't like.
*/

export function buildChildWindowName(props = {}) {
    return b64encode(JSON.stringify(extend({
        type: CONSTANTS.XCOMPONENT
    }, props)));
}



/*  Parse Window Name
    -----------------

    The inverse of buildChildWindowName. Base64 decodes and json parses the window name to get the original props
    passed down, including the parent name. Only accepts window names built by xcomponent
*/

export function parseWindowName(name) {
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