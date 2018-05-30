/* @flow */
/* @jsx jsxDom */

import { type RenderOptionsType } from '../../parent';

export function defaultContainerTemplate({ id, tag, context, CLASS, outlet, jsxDom, dimensions : { width, height } } : RenderOptionsType) : HTMLElement {

    return (
        <div id={ id } class={ `${ CLASS.ZOID } ${ CLASS.ZOID }-tag-${ tag } ${ CLASS.ZOID }-context-${ context }` }>
            <style>
                {`
                    #${ id }, #${ id } > .${ CLASS.OUTLET } {
                        width: ${ width };
                        height: ${ height };
                    }

                    #${ id } > .${ CLASS.OUTLET } {
                        display: inline-block;
                        position: relative;
                    }

                    #${ id } > .${ CLASS.OUTLET } > iframe {
                        height: 100%;
                        width: 100%;
                        position: absolute;
                        top: 0;
                        left: 0;
                        transition: opacity .2s ease-in-out;
                    }

                    #${ id } > .${ CLASS.OUTLET } > iframe.${ CLASS.VISIBLE } {
                        opacity: 1;
                    }

                    #${ id } > .${ CLASS.OUTLET } > iframe.${ CLASS.INVISIBLE } {
                        opacity: 0;
                    }
                `}
            </style>

            { outlet }
        </div>
    );
}
