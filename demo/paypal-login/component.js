
window.paypalLogin = xcomponent.create({

    tag: 'paypal-login',

    url: './paypal-login/component.htm',

    singleton: true,

    props: {

        email: {
            type: 'string',
            required: false
        },

        onSuccess: {
            type: 'function',
            required: true
        }
    },

    dimensions: {

        autoresize: true,

        width: {
            min: 400,
            max: 600
        },

        height: {
            min: 400,
            max: 600
        }
    }
});