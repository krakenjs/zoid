/* @flow */

import { assertExists, memoize } from 'belter/src';
import { isSameDomain, getOpener, getNthParentFromTop, getAncestor, getAllFramesInWindow, getParent, isTop,
    findFrameByName, getDomain, assertSameDomain, type CrossDomainWindowType, getDistanceFromTop } from 'cross-domain-utils/src';

import { ZOID, WINDOW_REFERENCE } from '../constants';
import type { InitialChildPayload, WindowRef } from '../parent';

import { crossDomainDeserialize, crossDomainSerialize, REFERENCE_TYPE, type ReferenceType } from './serialize';
import { tryGlobal } from './global';

function getWindowByRef(windowRef : WindowRef) : CrossDomainWindowType {
    if (windowRef.type === WINDOW_REFERENCE.OPENER) {
        return assertExists('opener', getOpener(window));

    } else if (windowRef.type === WINDOW_REFERENCE.PARENT && typeof windowRef.distance === 'number') {
        return assertExists('parent', getNthParentFromTop(window, windowRef.distance));

    } else if (windowRef.type === WINDOW_REFERENCE.GLOBAL && windowRef.uid && typeof windowRef.uid === 'string') {
        const { uid } = windowRef;
        const ancestor = getAncestor(window);

        if (!ancestor) {
            throw new Error(`Can not find ancestor window`);
        }

        for (const frame of getAllFramesInWindow(ancestor)) {
            if (isSameDomain(frame)) {
                const win = tryGlobal(frame, global => global.windows && global.windows[uid]);

                if (win) {
                    return win;
                }
            }
        }
    } else if (windowRef.type === WINDOW_REFERENCE.NAME) {
        const { name } = windowRef;
        return assertExists('namedWindow', findFrameByName(assertExists('ancestor', getAncestor(window)), name));
    }

    throw new Error(`Unable to find ${ windowRef.type } parent component window`);
}

export function buildChildWindowName({ name, serializedPayload } : {| name : string, serializedPayload : string |}) : string {
    return `__${ ZOID }__${ name }__${ serializedPayload }__`;
}

function parseWindowName(windowName : string) : {| name : string, serializedInitialPayload : string |} {
    if (!windowName) {
        throw new Error(`No window name`);
    }

    const [ , zoidcomp, name, serializedInitialPayload ] = windowName.split('__');

    if (zoidcomp !== ZOID) {
        throw new Error(`Window not rendered by zoid - got ${ zoidcomp }`);
    }

    if (!name) {
        throw new Error(`Expected component name`);
    }

    if (!serializedInitialPayload) {
        throw new Error(`Expected serialized payload ref`);
    }

    return { name, serializedInitialPayload };
}

export type InitialParentPayload<P, X> = {|
    parent : {|
        domain : string,
        win : CrossDomainWindowType
    |},
    payload : InitialChildPayload<P, X>,
    reference : ReferenceType<string>
|};

const parseInitialParentPayload = memoize(<P, X>(windowName : string) : InitialParentPayload<P, X> => {
    const { serializedInitialPayload } = parseWindowName(windowName);

    const { data: payload, sender: parent, reference } = crossDomainDeserialize({
        data:   serializedInitialPayload,
        sender: {
            win: ({ metaData: { windowRef } }) => getWindowByRef(windowRef)
        }
    });

    return {
        parent,
        payload,
        reference
    };
});

export function getInitialParentPayload<P, X>() : InitialParentPayload<P, X> {
    return parseInitialParentPayload(window.name);
}

export function isChildComponentWindow(name : string) : boolean {
    try {
        return parseWindowName(window.name).name === name;
    } catch (err) {
        // pass
    }

    return false;
}

export function getWindowRef(targetWindow : CrossDomainWindowType, currentWindow? : CrossDomainWindowType = window) : ?WindowRef {
    if (targetWindow === getParent(currentWindow)) {
        return { type: WINDOW_REFERENCE.PARENT, distance: getDistanceFromTop(targetWindow) };
    }

    if (targetWindow === getOpener(currentWindow)) {
        return { type: WINDOW_REFERENCE.OPENER };
    }

    if (isSameDomain(targetWindow) && !isTop(targetWindow)) {
        const windowName = assertSameDomain(targetWindow).name;
        if (windowName) {
            return { type: WINDOW_REFERENCE.NAME, name: windowName };
        }
    }
}

type UpdateChildWindowNameWithRefOptions = {|
    componentName : string,
    parentComponentWindow : CrossDomainWindowType
|};

export function updateChildWindowNameWithRef({ componentName, parentComponentWindow } : UpdateChildWindowNameWithRefOptions) {
    const { serializedInitialPayload } = parseWindowName(window.name);

    const { data, sender, reference, metaData } = crossDomainDeserialize({
        data:   serializedInitialPayload,
        sender: {
            win: parentComponentWindow
        },
        basic: true
    });

    if (reference.type === REFERENCE_TYPE.UID || metaData.windowRef.type === WINDOW_REFERENCE.GLOBAL) {
        const windowRef = getWindowRef(parentComponentWindow);

        const { serializedData: serializedPayload } = crossDomainSerialize({
            data,
            metaData: {
                windowRef
            },
            sender: {
                domain: sender.domain
            },
            receiver: {
                win:    window,
                domain: getDomain()
            },
            basic: true
        });

        window.name = buildChildWindowName({
            name:              componentName,
            serializedPayload
        });
    }
}
