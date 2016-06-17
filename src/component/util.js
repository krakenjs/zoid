
import { b64encode, b64decode, extend, memoize, getParentWindow } from '../lib';
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
    return b64encode(JSON.stringify({
        ...props,
        type: CONSTANTS.XCOMPONENT
    }));
}



/*  Parse Window Name
    -----------------

    The inverse of buildChildWindowName. Base64 decodes and json parses the window name to get the original props
    passed down, including the parent name. Only accepts window names built by xcomponent
*/

export let parseWindowName = memoize(function parseWindowName(name) {
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
});

export let getParentComponentWindow = memoize(function getParentComponentWindow() {

    // Get properties from the window name, passed down from our parent component

    let winProps = parseWindowName(window.name);

    if (!winProps) {
        throw new Error(`Window has not been rendered by xcomponent - can not attach here`);
    }

    // Use this to infer which window is our true 'parent component'. This can either be:
    //
    // - Our actual parent
    // - A sibling which rendered us using renderToParent()

    if (winProps.sibling) {

        // We were rendered by a sibling, which we can access cross-domain via parent.frames
        return getParentWindow().frames[winProps.parent];

    } else {

        // Our parent window is the same as our parent component window
        return getParentWindow();
    }
});