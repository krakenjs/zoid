/* @flow */
/* @jsx node */
/* eslint react/react-in-jsx-scope: off */

import { node, dom } from 'jsx-pragmatic/src';
import { destroyElement } from 'belter/src';

import { type RenderOptionsType } from '../../parent';
import { EVENT } from '../../constants';

const CLASS = {
    VISIBLE:   'visible',
    INVISIBLE: 'invisible'
};

export function defaultContainerTemplate<P>({ uid, frame, prerenderFrame, doc, event, dimensions : { width, height } } : RenderOptionsType<P>) : HTMLElement {

    if (!frame || !prerenderFrame) {
        return (
            <div id={ uid } />
        ).render(dom({ doc }));
    }

    prerenderFrame.classList.add(CLASS.VISIBLE);
    frame.classList.add(CLASS.INVISIBLE);

    event.on(EVENT.RENDERED, () => {
        prerenderFrame.classList.remove(CLASS.VISIBLE);
        prerenderFrame.classList.add(CLASS.INVISIBLE);

        frame.classList.remove(CLASS.INVISIBLE);
        frame.classList.add(CLASS.VISIBLE);

        setTimeout(() => {
            destroyElement(prerenderFrame);
        }, 1);
    });

    return (
        <div id={ uid }>
            <style>
                {`
                    #${ uid } {
                        position: relative;
                    }

                    #${ uid } > iframe {
                        width: ${ width };
                        height: ${ height };
                        display: inline-block;
                        position: absolute;
                        top: 0;
                        left: 0;
                        transition: opacity .2s ease-in-out;
                    }

                    #${ uid } > iframe.${ CLASS.INVISIBLE } {
                        opacity: 0;
                    }

                    #${ uid } > iframe.${ CLASS.VISIBLE } {
                        opacity: 1;
                    }
                `}
            </style>

            <node el={ frame } />
            <node el={ prerenderFrame } />
        </div>
    ).render(dom({ doc }));
}
