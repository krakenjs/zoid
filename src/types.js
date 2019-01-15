/* @flow */

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

export type StringMatcherType = string | $ReadOnlyArray<string>;
