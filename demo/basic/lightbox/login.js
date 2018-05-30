
window.MyLoginZoidComponent = zoid.create({

    // The html tag used to render my component

    tag: 'my-login-component',

    // The url that will be loaded in the iframe or popup, when someone includes my component on their page

    url: zoid.getCurrentScriptDir() + '/login.htm',

    // The background overlay

    containerTemplate({ id, CLASS, CONTEXT, tag, context, actions, outlet, jsxDom }) {

        function close(event) {
            event.preventDefault();
            event.stopPropagation();
            return actions.close();
        }

        function focus(event) {
            event.preventDefault();
            event.stopPropagation();
            return actions.focus();
        }

        return jsxDom('div', { id, onClick: focus, 'class': `${CLASS.ZOID} ${CLASS.ZOID}-tag-${tag} ${CLASS.ZOID}-context-${context} ${CLASS.ZOID}-focus` },

            jsxDom('a', { href: '#', onClick: close, 'class': `${CLASS.ZOID}-close` }),

            outlet,

            jsxDom('style', null,

                `
                    #${id} {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background-color: rgba(0, 0, 0, 0.8);
                    }

                    #${id}.${CLASS.ZOID}-context-${CONTEXT.POPUP} {
                        cursor: pointer;
                    }

                    #${id}.${CLASS.ZOID}-context-${CONTEXT.IFRAME} .${CLASS.OUTLET} {
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

                    #${id}.${CLASS.ZOID}-context-${CONTEXT.IFRAME} .${CLASS.OUTLET} {
                        height: 150px;
                        width: 300px;
                    }

                    #${id}.${CLASS.ZOID}-context-${CONTEXT.IFRAME} .${CLASS.OUTLET} iframe {
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

                    #${ id } > .${ CLASS.OUTLET } > iframe.${ CLASS.COMPONENT_FRAME } {
                        z-index: 200;
                    }

                    #${ id } > .${ CLASS.OUTLET } > iframe.${ CLASS.PRERENDER_FRAME } {
                        z-index: 100;
                    }

                    #${id} .${CLASS.ZOID}-close {
                        position: absolute;
                        right: 16px;
                        top: 16px;
                        width: 16px;
                        height: 16px;
                        opacity: 0.6;
                    }

                    #${id} .${CLASS.ZOID}-close:hover {
                        opacity: 1;
                    }

                    #${id} .${CLASS.ZOID}-close:before,
                    #${id} .${CLASS.ZOID}-close:after {
                        position: absolute;
                        left: 8px;
                        content: ' ';
                        height: 16px;
                        width: 2px;
                        background-color: white;
                    }

                    #${id} .${CLASS.ZOID}-close:before {
                        transform: rotate(45deg);
                    }

                    #${id} .${CLASS.ZOID}-close:after {
                        transform: rotate(-45deg);
                    }
                `
            )
        );
    }
});
