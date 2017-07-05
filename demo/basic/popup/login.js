
window.MyLoginXComponent = xcomponent.create({

    // The html tag used to render my component

    tag: 'my-login-component',

    // The url that will be loaded in the iframe or popup, when someone includes my component on their page

    url: xcomponent.getCurrentScriptDir() + '/login.htm',

    // Allow the component to be rendered as a popup

    contexts: {
        popup: true
    },

    // The background overlay

    containerTemplate(options) {

        var id = options.id;
        var CLASS = options.CLASS;

        return `
            <div class="${CLASS.XCOMPONENT}-overlay ${CLASS.FOCUS}">
                <a href="#${CLASS.CLOSE}" class="${CLASS.CLOSE}"></a>

                <div class="${CLASS.ELEMENT}"></div>
            </div>

            <style>
                #${id} .${CLASS.XCOMPONENT}-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    background-color: rgba(0, 0, 0, 0.8);
                }

                #${id}.${CLASS.POPUP} .${CLASS.XCOMPONENT}-overlay {
                    cursor: pointer;
                }

                #${id}.${CLASS.IFRAME} .${CLASS.ELEMENT} {
                    box-shadow: 2px 2px 10px 3px rgba(0, 0, 0, 0.4);
                    position: absolute;

                    top: 50%;
                    left: 50%;

                    height: 150px;
                    width: 300px;

                    transform: translate3d(-50%, -50%, 0);
                    -webkit-transform: translate3d(-50%, -50%, 0);
                    -moz-transform: translate3d(-50%, -50%, 0);
                    -o-transform: translate3d(-50%, -50%, 0);
                    -ms-transform: translate3d(-50%, -50%, 0);
                }

                #${id}.${CLASS.IFRAME} iframe {
                    height: 100%;
                    width: 100%;
                }

                #${id} .${CLASS.CLOSE} {
                    position: absolute;
                    right: 16px;
                    top: 16px;
                    width: 16px;
                    height: 16px;
                    opacity: 0.6;
                }

                #${id} .${CLASS.CLOSE}:hover {
                    opacity: 1;
                }

                #${id} .${CLASS.CLOSE}:before,
                #${id}  .${CLASS.CLOSE}:after {
                    position: absolute;
                    left: 8px;
                    content: ' ';
                    height: 16px;
                    width: 2px;
                    background-color: white;
                }

                #${id} .${CLASS.CLOSE}:before {
                    transform: rotate(45deg);
                }

                #${id} .${CLASS.CLOSE}:after {
                    transform: rotate(-45deg);
                }
            </style>
        `;
    }
});
