/* @flow */
/** @jsx node */
/* eslint react/react-in-jsx-scope: off */

import { node, dom } from 'jsx-pragmatic/src';

import { type RenderOptionsType } from '../../parent';

export function defaultPrerenderTemplate<P>({ doc } : RenderOptionsType<P>) : ?HTMLElement {
    if (__ZOID__.__DEFAULT_PRERENDER__) {
        return (
            <html>
                <body>
                    <style>
                        {`
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
                        `}
                    </style>
                    <div class="spinner" />
                </body>
            </html>
        ).render(dom({ doc }));
    }
}
