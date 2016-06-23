
import { b64encode, b64decode, memoize, getParentWindow } from '../lib';
import { XCOMPONENT } from '../constants';


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
        type: XCOMPONENT
    }));
}


/*  Parse Window Name
    -----------------

    The inverse of buildChildWindowName. Base64 decodes and json parses the window name to get the original props
    passed down, including the parent name. Only accepts window names built by xcomponent
*/

export let parseWindowName = memoize(name => {
    let winProps;

    try {
        winProps = JSON.parse(b64decode(name));
    } catch (err) {
        return;
    }

    if (!winProps || winProps.type !== XCOMPONENT) {
        return;
    }

    return winProps;
});


/*  Get Parent Component Window
    ---------------------------

    Get the parent component window, which may be different from the actual parent window
*/

export let getParentComponentWindow = memoize(() => {

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


/*  Get Position
    ------------

    Calculate the position for the popup / lightbox

    This is either
    - Specified by the user
    - The center of the screen

    I'd love to do this with pure css, but alas... popup windows :(
*/

export function getPosition(options) {

    let pos = {};

    if (typeof options.x === 'number') {
        pos.x = options.x;
    } else {
        let width = window.outerWidth;

        if (width <= options.width) {
            pos.x = 0;
        } else {
            pos.x = Math.floor((width / 2) - (options.width / 2));
        }
    }

    if (typeof options.y === 'number') {
        pos.y = options.y;
    } else {

        let height = window.outerHeight;

        if (height <= options.height) {
            pos.y = 0;
        } else {
            pos.y = Math.floor((height / 2) - (options.height / 2));
        }
    }

    return pos;
}