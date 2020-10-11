/* @flow */

// export something to force webpack to see this as an ES module
export const TYPES: boolean = true;

export type DimensionsType: any = {|
    width : number,
    height : number
|};

export type CssDimensionsType:any = {|
    width : string,
    height : string
|};

export type CancelableType:any = {|
    cancel : () => void
|};

export type StringMatcherType: string = string | $ReadOnlyArray<string>;
