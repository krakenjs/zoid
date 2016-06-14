
window.PaypalLogin = xcomponent.create({

    tag: 'paypal-login',

    url: './paypal-login/component.htm',

    singleton: false,

    props: {

        email: {
            type: 'string',
            required: false
        },

        onSuccess: {
            type: 'function',
            required: true
        },

        onChangeEmail: {
            type: 'function',
            required: false,
            noop: true
        }
    },

    dimensions: {
        width: 400,
        height: 200
    },

    contexts: {
        iframe: true,
        lightbox: true,
        popup: true
    },

    defaultContext: 'iframe'
});