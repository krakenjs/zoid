/* @flow */

declare var __TEST__;
declare var __POPUP_SUPPORT__;
declare var __IE_POPUP_SUPPORT__;
declare var __SEND_POPUP_LOGS_TO_OPENER__;
declare var __CHILD_WINDOW_ENFORCE_LOG_LEVEL__;
declare var __ALLOW_POSTMESSAGE_POPUP__;

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

export type CancelableType = {
    cancel : () => void
};

export type StringMatcherType = string | RegExp | Array<string>;

export type EnvString = string | { [string] : string };
export type EnvStringRegExp = string | RegExp | { [string] : string | RegExp };

export type Jsx<T> = (string, ?{ [string] : mixed }, ...children : Array<string | T>) => T;
