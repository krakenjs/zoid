/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { serializeMessage, deserializeMessage, toProxyWindow, type ProxyWindow } from 'post-robot/src';
import { uniqueID, base64encode, base64decode } from 'belter/src';
import type { CrossDomainWindowType, DomainMatcher } from 'cross-domain-utils/src';

import { getGlobal } from './global';

export type ProxyObject<T> = {|
    get : () => ZalgoPromise<T>
|};

export function getProxyObject<T>(obj : T) : ProxyObject<T> {
    return {
        get() : ZalgoPromise<T> {
            return ZalgoPromise.try(() => {
                // $FlowFixMe[object-this-reference]
                if (this.source && this.source !== window) {
                    throw new Error(`Can not call get on proxy object from a remote window`);
                }
    
                return obj;
            });
        }
    };
}

export function basicSerialize<T>(data : T) : string {
    return base64encode(JSON.stringify(data));
}

export function basicDeserialize<T>(serializedData : string) : T {
    return JSON.parse(base64decode(serializedData));
}

export const REFERENCE_TYPE = {
    UID: ('uid' : 'uid'),
    RAW: ('raw' : 'raw')
};

export type UIDReferenceType = {| type : typeof REFERENCE_TYPE.UID, uid : string |};
export type RawReferenceType<T> = {| type : typeof REFERENCE_TYPE.RAW, val : T |};

export type ReferenceType<T> =
    UIDReferenceType |
    RawReferenceType<T>;

export function getUIDRefStore<T>(win : CrossDomainWindowType) : { [string] : T } {
    const global = getGlobal(win);
    global.references = global.references || {};
    return global.references;
}

export function getUIDRef<T>(val : T) : ReferenceType<T> {
    const uid = uniqueID();
    const references = getUIDRefStore(window);
    references[uid] = val;
    return { type: REFERENCE_TYPE.UID, uid };
}

export function getRawRef<T>(val : T) : ReferenceType<T> {
    return { type: REFERENCE_TYPE.RAW, val };
}

export function getRefValue<T>(win : CrossDomainWindowType, ref : ReferenceType<T>) : T {
    if (ref.type === REFERENCE_TYPE.RAW) {
        return ref.val;
    }

    if (ref.type === REFERENCE_TYPE.UID) {
        const references = getUIDRefStore(win);
        return references[ref.uid];
    }

    throw new Error(`Unsupported ref type: ${ ref.type }`);
}

export function cleanupRef<T>(win : CrossDomainWindowType, ref : ReferenceType<T>) {
    if (ref.type === REFERENCE_TYPE.UID) {
        const references = getUIDRefStore(win);
        delete references[ref.uid];
    }
}

type Message<T, M> = {|
    sender : {|
        domain : string
    |},
    metaData : M,
    reference : ReferenceType<T>
|};

type CrossDomainSerializeOptions<T, M> = {|
    data : T,
    metaData : M,
    sender : {|
        domain : string
    |},
    receiver : {|
        win : ProxyWindow | CrossDomainWindowType,
        domain : DomainMatcher
    |},
    passByReference? : boolean,
    basic? : boolean
|};

type CrossDomainSerializedMessage = {|
    serializedData : string,
    cleanReference : () => void
|};

export function crossDomainSerialize<T, M>({ data, metaData, sender, receiver, passByReference = false, basic = false } : CrossDomainSerializeOptions<T, M>) : CrossDomainSerializedMessage {
    const proxyWin = toProxyWindow(receiver.win);
    const serializedMessage = basic
        ? JSON.stringify(data)
        : serializeMessage(proxyWin, receiver.domain, data);

    const reference = passByReference
        ? getUIDRef(serializedMessage)
        : getRawRef(serializedMessage);

    const message : Message<string, M> = {
        sender: {
            domain: sender.domain
        },
        metaData,
        reference
    };

    const cleanReference = () => {
        cleanupRef(window, reference);
    };

    return {
        serializedData: basicSerialize(message),
        cleanReference
    };
}

type CrossDomainDeserializeOptions<M> = {|
    data : string,
    sender : {|
        win : CrossDomainWindowType | ({| metaData : M |}) => CrossDomainWindowType,
        domain? : string | ({| metaData : M |}) => string
    |},
    basic? : boolean
|};

type CrossDomainDeserializedMessage<T, M> = {|
    data : T,
    metaData : M,
    sender : {|
        domain : string,
        win : CrossDomainWindowType
    |},
    reference : ReferenceType<string>
|};

export function crossDomainDeserialize<T, M>({ data, sender, basic = false } : CrossDomainDeserializeOptions<M>) : CrossDomainDeserializedMessage<T, M> {
    const message : Message<string, M> = basicDeserialize(data);

    const { reference, metaData } = message;

    let win;
    if (typeof sender.win === 'function') {
        win = sender.win({ metaData });
    } else {
        win = sender.win;
    }

    let domain;
    if (typeof sender.domain === 'function') {
        domain = sender.domain({ metaData });
    } else if (typeof sender.domain === 'string') {
        domain = sender.domain;
    } else {
        domain = message.sender.domain;
    }

    const serializedData = getRefValue(win, reference);
    const deserializedData = basic
        ? JSON.parse(serializedData)
        : deserializeMessage(win, domain, serializedData);
    
    return {
        data:   deserializedData,
        metaData,
        sender: { win, domain },
        reference
    };
}
