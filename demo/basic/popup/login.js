
window.MyLoginZoidComponent = zoid.create({
    ...MyLoginZoidComponentDef,

    // The background overlay
    containerTemplate: ({ uid, tag, context, focus, close, doc }) => {

        function closeComponent(event) {
            event.preventDefault();
            event.stopPropagation();
            return close();
        }

        function focusComponent(event) {
            event.preventDefault();
            event.stopPropagation();
            return focus();
        }

        return pragmatic.node('div', { id: uid, 'onClick': focusComponent, 'class': `${ tag } ${ tag }-context-${ context } ${ tag }-focus` },

            pragmatic.node('a', { 'href': '#', 'onClick': closeComponent, 'class': `${ tag }-close` }),

            pragmatic.node('style', null, `
                #${ uid } {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.8);
                }

                #${ uid }.${ tag }-context-${ zoid.CONTEXT.POPUP } {
                    cursor: pointer;
                }

                #${ uid } .${ tag }-close {
                    position: absolute;
                    right: 16px;
                    top: 16px;
                    width: 16px;
                    height: 16px;
                    opacity: 0.6;
                }

                #${ uid } .${ tag }-close:hover {
                    opacity: 1;
                }

                #${ uid } .${ tag }-close:before,
                #${ uid } .${ tag }-close:after {
                    position: absolute;
                    left: 8px;
                    content: ' ';
                    height: 16px;
                    width: 2px;
                    background-color: white;
                }

                #${ uid } .${ tag }-close:before {
                    transform: rotate(45deg);
                }

                #${ uid } .${ tag }-close:after {
                    transform: rotate(-45deg);
                }
            `)
        ).render(pragmatic.dom({ doc }));
    }
});
