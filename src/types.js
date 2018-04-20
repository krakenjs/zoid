/* @flow */

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
