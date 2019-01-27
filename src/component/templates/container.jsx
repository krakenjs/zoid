/* @flow */
/* @jsx node */
/* eslint react/react-in-jsx-scope: off */

import { node, dom } from 'jsx-pragmatic/src';

import { type RenderOptionsType } from '../../parent';
import { CLASS, EVENT } from '../../constants';

const STAGE = {
    PRERENDERED: 'prerender',
    RENDERED:    'rendered'
};

export function defaultContainerTemplate<P>({ uid, outlet, doc, event, dimensions : { width, height } } : RenderOptionsType<P>) : HTMLElement {

    outlet.classList.add(STAGE.PRERENDERED);
    event.on(EVENT.RENDERED, () => {
        outlet.classList.add(STAGE.RENDERED);
        outlet.classList.remove(STAGE.PRERENDERED);
    });

    return (
        <div id={ uid }>
            <style>
                {`
                    #${ uid } > .${ CLASS.OUTLET } {
                        width: ${ width };
                        height: ${ height };
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

                    #${ uid } > .${ CLASS.OUTLET }.${ STAGE.PRERENDERED } > iframe.${ CLASS.COMPONENT_FRAME } {
                        opacity: 0;
                    }

                    #${ uid } > .${ CLASS.OUTLET }.${ STAGE.PRERENDERED } > iframe.${ CLASS.PRERENDER_FRAME } {
                        opacity: 1;
                    }

                    #${ uid } > .${ CLASS.OUTLET }.${ STAGE.RENDERED } > iframe.${ CLASS.COMPONENT_FRAME } {
                        opacity: 1;
                    }

                    #${ uid } > .${ CLASS.OUTLET }.${ STAGE.RENDERED } > iframe.${ CLASS.PRERENDER_FRAME } {
                        opacity: 0;
                    }
                `}
            </style>

            <node el={ outlet } />
        </div>
    ).render(dom({ doc }));
}
