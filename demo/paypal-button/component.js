
window.PayPalButton = xcomponent.create({

    tag: 'paypal-button',

    url: '/nfra/xcomponent/demo/paypal-button/component.htm',

    props: {

        onSuccess: {
            type: 'function',
            required: true
        }
    },

    dimensions: {
        width: 100,
        height: 50
    },

    contexts: {
        iframe: true,
        lightbox: false,
        popup: false
    },

    defaultContext: 'iframe'
});