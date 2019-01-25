
window.MyLoginZoidComponent = zoid.create({

    // The html tag used to render my component

    tag: 'my-login-component',

    // The url that will be loaded in the iframe or popup, when someone includes my component on their page

    url: './login.htm',

    containerTemplate: ({ uid, tag, context, focus, close, doc, outlet }) => {

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

            pragmatic.node('node', { el: outlet }),

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

                #${ uid }.${ tag }-context-${ zoid.CONTEXT.IFRAME } .${ zoid.CLASS.OUTLET } {
                    box-shadow: 2px 2px 10px 3px rgba(0, 0, 0, 0.4);
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate3d(-50%, -50%, 0);
                    -webkit-transform: translate3d(-50%, -50%, 0);
                    -moz-transform: translate3d(-50%, -50%, 0);
                    -o-transform: translate3d(-50%, -50%, 0);
                    -ms-transform: translate3d(-50%, -50%, 0);
                }

                #${ uid }.${ tag }-context-${ zoid.CONTEXT.IFRAME } ${ zoid.CLASS.OUTLET } {
                    height: 150px;
                    width: 300px;
                }

                #${ uid }.${ tag }-context-${ zoid.CONTEXT.IFRAME } ${ zoid.CLASS.OUTLET } iframe {
                    height: 100%;
                    width: 100%;
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
