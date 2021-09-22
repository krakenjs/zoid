/* @flow */

import { assertExists, memoize } from 'belter/src';
import { isSameDomain, getOpener, getNthParentFromTop, getAncestor, getAllFramesInWindow,
    findFrameByName, getDomain, assertSameDomain, type CrossDomainWindowType } from 'cross-domain-utils/src';

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

function getSerializedInitialPayload(windowName : string) : string {
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

    return serializedInitialPayload;
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
    const serializedInitialPayload = getSerializedInitialPayload(windowName);

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

export function isChildComponentWindow() : boolean {
    try {
        if (getInitialParentPayload()) {
            return true;
        }
    } catch (err) {
        // pass
    }

    return false;
}

type UpdateChildWindowNameWithRefOptions = {|
    componentName : string,
    parentComponentWindow : CrossDomainWindowType
|};

export function updateChildWindowNameWithRef({ componentName, parentComponentWindow } : UpdateChildWindowNameWithRefOptions) {
    const serializedInitialPayload = getSerializedInitialPayload(window.name);

    const { data, sender, reference } = crossDomainDeserialize({
        data:   serializedInitialPayload,
        sender: {
            win: parentComponentWindow
        },
        basic: true
    });

    if (reference.type === REFERENCE_TYPE.UID && isSameDomain(parentComponentWindow)) {
        const windowName = assertSameDomain(parentComponentWindow).name;

        const { serializedData: serializedPayload } = crossDomainSerialize({
            data,
            metaData: {
                windowRef: { type: WINDOW_REFERENCE.NAME, name: windowName }
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
