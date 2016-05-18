
window.PaypalLogin = xcomponent.create({

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
        width: 400,
        height: 200
    }
});