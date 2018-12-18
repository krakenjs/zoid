/* @flow */
/* @jsx node */
/* eslint react/react-in-jsx-scope: off */

import { node, dom } from 'jsx-pragmatic/src';

import { type RenderOptionsType } from '../../parent';
import { CLASS } from '../../constants';

export function defaultContainerTemplate<P>({ uid, outlet, doc, dimensions : { width, height } } : RenderOptionsType<P>) : HTMLElement {

    return (
        <div id={ uid }>
            <style>
                {`
                    #${ uid }, #${ uid } > .${ CLASS.OUTLET } {
                        width: ${ width };
                        height: ${ height };
                    }

                    #${ uid } > .${ CLASS.OUTLET } {
                        display: inline-block;
                        position: relative;
                    }

                    #${ uid } > .${ CLASS.OUTLET } > iframe {
                        height: 100%;
                        width: 100%;
                        position: absolute;
                        top: 0;
                        left: 0;
                        transition: opacity .2s ease-in-out;
                    }

                    #${ uid } > .${ CLASS.OUTLET } > iframe.${ CLASS.VISIBLE } {
                        opacity: 1;
                    }

                    #${ uid } > .${ CLASS.OUTLET } > iframe.${ CLASS.INVISIBLE } {
                        opacity: 0;
                    }
                `}
            </style>

            <node el={ outlet } />
        </div>
    ).render(dom({ doc }));
}
