/* @flow */

// export something to force webpack to see this as an ES module
export const TYPES = true;

export type DimensionsType = {|
    width : number,
    height : number
|};

export type CssDimensionsType = {|
    width : string,
    height : string
|};

export type CancelableType = {|
    cancel : () => void
|};

export type StringMatcherType = string | $ReadOnlyArray<string> | RegExp;

export type ContainerReferenceType = string | HTMLElement;
