/* @flow */

declare var __TEST__;
declare var __POPUP_SUPPORT__;
declare var __IE_POPUP_SUPPORT__;
declare var __SEND_POPUP_LOGS_TO_OPENER__;
declare var __CHILD_WINDOW_ENFORCE_LOG_LEVEL__;

export type ElementRefType = ElementRefType;

export type DimensionsType = {
    width : number,
    height : number
};

export type CssDimensionsType = {
    width : string,
    height : string
};

export type PositionType = {
    x : number,
    y : number
};

export type CrossDomainWindowType = {|
    location : string | Object,
    self : CrossDomainWindowType,
    closed : boolean,
    open : (string, string, string) => CrossDomainWindowType,
    close : () => void,
    focus : () => void,
    frames : Array<CrossDomainWindowType>,
    opener ? : CrossDomainWindowType,
    parent : CrossDomainWindowType,
    length : number
|};

export type SameDomainWindowType = Object & {
    location : string | Object,
    self : CrossDomainWindowType,
    closed : boolean,
    open : (string, string, string) => CrossDomainWindowType,
    close : () => void,
    focus : () => void,
    XMLHttpRequest : typeof XMLHttpRequest,
    document : Document,
    navigator : {
        userAgent : string,
        mockUserAgent? : string
    }
};

export type CancelableType = {
    cancel : () => void
};

export type StringMatcherType = string | RegExp | Array<string>;

export type EnvString = string | { [string] : string };

export type Jsx<T> = (string, ?{ [string] : mixed }, ...children : Array<string | T>) => T;
