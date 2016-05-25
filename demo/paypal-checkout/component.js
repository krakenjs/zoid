
window.PayPalCheckout = xcomponent.create({

    tag: 'paypal-checkout',

    url: '/nfra/xcomponent/demo/paypal-checkout/component.htm',

    props: {

        onAuthorize: {
            type: 'function',
            required: true
        }
    },

    dimensions: {
        width: 500,
        height: 500
    },

    contexts: {
        iframe: false,
        lightbox: true,
        popup: true
    },

    defaultContext: 'lightbox'
});