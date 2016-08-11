
import { b32encode, b32decode } from '../lib';
import { memoize, uniqueID } from '../lib';
import { XCOMPONENT } from '../constants';


/*  Build Child Window Name
    -----------------------

    Build a name for our child window. This should identify the following things to the child:

    - That the window was created by, and is owned by xcomponent
    - The name of the child's parent. This is so the child can identify which window created it, even when we do a
      renderToParent, in which case the true parent may actually be a sibling frame in the window hierarchy

    We base64 encode the window name so IE doesn't die when it encounters any characters that it doesn't like.
*/

export function buildChildWindowName(name, options = {}) {

    options.id = uniqueID();
    options.parent = window.name;
    options.parentDomain = `${window.location.protocol}//${window.location.host}`;

    let encodedName = name.replace(/^[^a-z0-9A-Z]+|[^a-z0-9A-Z]+$/g, '').replace(/[^a-z0-9A-Z]+/g, '_');
    let encodedOptions = b32encode(JSON.stringify(options));

    if (!encodedName) {
        throw new Error(`Invalid name: ${name} - must contain alphanumeric characters`);
    }

    return [
        XCOMPONENT,
        encodedName,
        encodedOptions
    ].join('__');
}


/*  Parse Window Name
    -----------------

    The inverse of buildChildWindowName. Base64 decodes and json parses the window name to get the original props
    passed down, including the parent name. Only accepts window names built by xcomponent
*/

export let getComponentMeta = memoize(() => {

    if (!window.name) {
        return;
    }

    let [ xcomp, name, encodedOptions ] = window.name.split('__');

    if (xcomp !== XCOMPONENT) {
        return;
    }

    let componentMeta;

    try {
        componentMeta = JSON.parse(b32decode(encodedOptions));
    } catch (err) {
        return;
    }

    componentMeta.name = name;

    return componentMeta;
});


export let isXComponentWindow = memoize(() => {
    return Boolean(getComponentMeta());
});


export let getParentWindow = memoize(() => {

    if (window.opener) {
        return window.opener;
    } else if (window.parent && window.parent !== window) {
        return window.parent;
    }

    throw new Error(`Can not find parent window`);
});



/*  Get Parent Component Window
    ---------------------------

    Get the parent component window, which may be different from the actual parent window
*/

export let getParentComponentWindow = memoize(() => {

    // Get properties from the window name, passed down from our parent component

    let componentMeta = getComponentMeta();

    if (!componentMeta) {
        throw new Error(`Can not get parent component window - window not rendered by xcomponent`);
    }

    let parentWindow = getParentWindow();

    // Use this to infer which window is our true 'parent component'. This can either be:
    //
    // - Our actual parent
    // - A sibling which rendered us using renderToParent()

    if (parentWindow && componentMeta.parent && parentWindow.frames && parentWindow.frames[componentMeta.parent]) {
        return parentWindow.frames[componentMeta.parent];
    }

    return parentWindow;
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

    let left;
    let top;
    let width = options.width;
    let height = options.height;

    if (window.outerWidth) {
        left = Math.round((window.outerWidth - width) / 2) + window.screenX;
        top = Math.round((window.outerHeight - height) / 2) + window.screenY;
    } else if (window.screen.width) {
        left = Math.round((window.screen.width - width) / 2);
        top = Math.round((window.screen.height - height) / 2);
    }

    return {
        x: left,
        y: top
    };
}