/* @flow */
/* eslint react/react-in-jsx-scope: off */

import { destroyElement, toCSS } from 'belter/src';

import { type RenderOptionsType } from '../../parent/parent';
import { EVENT } from '../../constants';

const CLASS = {
    VISIBLE:   'zoid-visible',
    INVISIBLE: 'zoid-invisible'
};


export function defaultContainerTemplate<P>({ uid, frame, prerenderFrame, doc, props, event, dimensions } : RenderOptionsType<P>) : ?HTMLElement {
    const  { width, height } = dimensions;

    if (__ZOID__.__DEFAULT_CONTAINER__) {
        if (!frame || !prerenderFrame) {
            return;
        }

        const div = doc.createElement('div');
        div.setAttribute('id', uid);
        const style = doc.createElement('style');
        if (props.cspNonce) {
            style.setAttribute('nonce', props.cspNonce);
        }

        style.appendChild(doc.createTextNode(`
            #${ uid } {
                display: inline-block;
                position: relative;
                width: ${ width };
                height: ${ height };
            }

            #${ uid } > iframe {
                display: inline-block;
                position: absolute;
                width: 100%;
                height: 100%;
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
        `));

        div.appendChild(frame);
        div.appendChild(prerenderFrame);
        div.appendChild(style);

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

        event.on(EVENT.RESIZE, ({ width: newWidth, height: newHeight }) => {
            if (typeof newWidth === 'number') {
                div.style.width = toCSS(newWidth);
            }
    
            if (typeof newHeight === 'number') {
                div.style.height = toCSS(newHeight);
            }
        });

        return div;
    }
}
