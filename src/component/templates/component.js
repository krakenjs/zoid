/* @flow */
/* eslint react/react-in-jsx-scope: off */

import { type RenderOptionsType } from '../../parent/parent';

export function defaultPrerenderTemplate<P>({ doc, props } : RenderOptionsType<P>) : ?HTMLElement {
    if (__ZOID__.__DEFAULT_PRERENDER__) {
        const html = doc.createElement('html');
        const body = doc.createElement('body');
        const style = doc.createElement('style');
        const spinner = doc.createElement('div');
        spinner.classList.add('spinner');

        if (props.cspNonce) {
            style.setAttribute('nonce', props.cspNonce);
        }

        html.appendChild(body);
        body.appendChild(spinner);
        body.appendChild(style);
        style.appendChild(doc.createTextNode(`
            html, body {
                width: 100%;
                height: 100%;
            }

            .spinner {
                position: fixed;
                max-height: 60vmin;
                max-width: 60vmin;
                height: 40px;
                width: 40px;
                top: 50%;
                left: 50%;
                box-sizing: border-box;
                border: 3px solid rgba(0, 0, 0, .2);
                border-top-color: rgba(33, 128, 192, 0.8);
                border-radius: 100%;
                animation: rotation .7s infinite linear;
            }

            @keyframes rotation {
                from {
                    transform: translateX(-50%) translateY(-50%) rotate(0deg);
                }
                to {
                    transform: translateX(-50%) translateY(-50%) rotate(359deg);
                }
            }
        `));

        return html;
    }
}
