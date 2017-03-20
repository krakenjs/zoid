
window.MyLoginButtonComponent = xcomponent.create({

    // The html tag used to render my component

    tag: 'my-login-button-component',

    // The url that will be loaded in the iframe or popup, when someone includes my component on their page

    url: './login-button.htm',

    // The size of the component on their page

    dimensions: {
        width: 250,
        height: 100
    },

    // The properties they can (or must) pass down to my component

    props: {

        loginContainer: {
            type: 'string',
            required: true
        }
    }
});