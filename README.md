xcomponent
----------

[Introducing xcomponent](https://medium.com/@bluepnume/introducing-xcomponent-seamless-cross-domain-web-components-from-paypal-c0144f3e82bf#.ikbg9r1ml)

A cross-domain component toolkit, supporting:

- Render an iframe or popup on a different domain, and pass down props, including objects and functions
- Call callbacks natively from the child window without worrying about post-messaging or cross-domain restrictions
- Create and expose components to share functionality from your site to others!

It's 'data-down, actions up', but 100% cross-domain! You can even use it directly with libraries like React and Angular.

-----

### [API Docs](./docs/api.md)

Public options and methods supported by xcomponent

### [Demos](http://krakenjs.com/xcomponent/demo/index.htm)

Working demos of different xcomponent patterns

### [Example](./docs/example.md)

A full example of a cross-domain component using xcomponent

-----

### Quick example

Define a component:

```javascript
var MyLoginComponent = xcomponent.create({

    tag: 'my-login-component',
    url: 'http://www.my-site.com/my-login-component',
    dimensions: {  width: 400, height: 300 },

    props: {
        prefilledEmail: { type: 'string', required: false },
        onLogin: { type: 'function', required: true }
    }
});
```

Render the component on the parent page:

```javascript
MyLoginComponent.render({

    prefilledEmail: 'foo@bar.com',

    onLogin: function(email) {
        console.log('User logged in with email:', email);
    }

}, '#container');
```

Implement the component in the iframe:

```javascript
onUserLogin(function(email) {
    window.xprops.onLogin('foo@bar.com');
});
```

- [See a full example here](./docs/example.md)
- [Or try building a cross-domain React component](https://medium.com/@bluepnume/creating-a-cross-domain-react-component-with-xcomponent-fbcccc4778fd#.73jnwv44c)

### Useful Links

- [Introducing xcomponent](https://medium.com/@bluepnume/introducing-xcomponent-seamless-cross-domain-web-components-from-paypal-c0144f3e82bf#.ikbg9r1ml)
- [A full example](./docs/example.md)
- [Build a cross-domain React component](https://medium.com/@bluepnume/creating-a-cross-domain-react-component-with-xcomponent-fbcccc4778fd#.73jnwv44c)
- [Building PayPal's Button with xcomponent](https://medium.com/@bluepnume/less-is-more-reducing-thousands-of-paypal-buttons-into-a-single-iframe-using-xcomponent-d902d71d8875#.o3ib7y58n)
- [PayPal Checkout - xcomponent powered Button and Checkout components](https://github.com/paypal/paypal-checkout)
- [Post-Robot - the cross-domain messaging library which powers xcomponent]

## Rationale

Writing cross domain components is tricky.

Consider this: I own `foo.com`, you own `bar.com`, and I have some functionality I want to share on your page.

I could just give you some javascript to load in your page. But then:

- What if I've written a component in React, but you're using some other framework?
- What if I have secure form fields, or secure data I don't want your site to spy on?
- What if I need to make secure calls to my back-end, without resorting to CORS?

You could just use a vanilla iframe for all of this. But:

- You have to pass data down in the url, or with a post-message.
- You need to set up post-message listeners to get events back up from the child.
- You need to deal with error cases, like if your iframe fails to load or doesn't respond to a post-message.
- You need to think carefully about how to expose all this functionality behind a simple, clear interface.

xcomponent solves all of these problems.

- You pass data and callbacks down as a javascript object
- xcomponent renders the component and passes down the data
- The child calls your callbacks when it's ready

It will even automatically generate React and Angular bindings, so people can drop-in your component anywhere and not
worry about iframes or post-messages.