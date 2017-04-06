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
    url: 'http://www.my-site.com/my-login-component'
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

### Useful Links

- [Introducing xcomponent](https://medium.com/@bluepnume/introducing-xcomponent-seamless-cross-domain-web-components-from-paypal-c0144f3e82bf#.ikbg9r1ml)
- [Turn your web-app into a cross-domain component with five lines of code](https://medium.com/@bluepnume/turn-your-web-app-into-a-cross-domain-component-with-5-lines-of-code-ced01e6795f9#.w8ea7h6ky)
- [A full example of how to implement and use an xcomponent](./docs/example.md)
- [Building PayPal's Button with xcomponent](https://medium.com/@bluepnume/less-is-more-reducing-thousands-of-paypal-buttons-into-a-single-iframe-using-xcomponent-d902d71d8875#.o3ib7y58n)
- [PayPal Checkout - xcomponent powered Button and Checkout components](https://github.com/paypal/paypal-checkout)
- [Post-Robot - the cross-domain messaging library which powers xcomponent](https://github.com/krakenjs/post-robot)

#### Framework Specific

- [Build a cross-domain React component](https://medium.com/@bluepnume/creating-a-cross-domain-react-component-with-xcomponent-fbcccc4778fd#.73jnwv44c)
- [Introducing support for cross-domain Glimmer components, with xcomponent](https://medium.com/@bluepnume/introducing-support-for-cross-domain-glimmer-components-with-xcomponent-21287c9f91f1)

## Rationale


**Writing cross domain components is tricky.**

Consider this: I own `foo.com`, you own `bar.com`, and I have some functionality I want to share on your page.
I could just give you some javascript to load in your page. But then:

- What if I've written a component in React, but you're using some other framework?
- What if I have secure form fields, or secure data I don't want your site to spy on?
- What if I need to make secure calls to my back-end, without resorting to CORS?


**What about an iframe?**

You could just use a vanilla iframe for all of this. But:

- You have to pass data down in the url, or with a post-message.
- You need to set up post-message listeners to get events back up from the child.
- You need to deal with error cases, like if your iframe fails to load or doesn't respond to a post-message.
- You need to think carefully about how to expose all this functionality behind a simple, clear interface.


**xcomponent solves all of these problems.**

- You pass data and callbacks down as a javascript object
- xcomponent renders the component and passes down the data
- The child calls your callbacks when it's ready

It will even automatically generate React and Angular bindings, so people can drop-in your component anywhere and not
worry about iframes or post-messages.


## FAQ

- **Do I need to use a particular framework like React to use xcomponent?**

  No, xcomponent is framework agnostic. You can:

  - Use it with vanilla javascript.
  - Use it with any framework of your choice.
  - Use it with React or Angular and take advantage of the automatic bindings on the parent page

- **Why write another ui / component library?**

  This isn't designed to replace libraries like React, which are responsible for rendering same-domain components. In fact, the only
  real rendering xcomoponent does is iframes and popups; the rest is up to you! You can build your components using any framework,
  library or pattern you want, then use xcomponent to expose your components cross-domain. It should play nicely with any other framework!

- **Aren't iframes really slow?**

  Yes, but there are a few things to bear in mind here:

  - xcomponent isn't designed for building components for your own site. For that you should use native component libraries
    like React, which render quickly onto your page. Use xcomponent to share functionality with other sites, that you can't
    share native-javascript components with

  - xcomponent also provides mechanisms for pre-rendering html and css into iframes and popups, so you can at least render a
    loading spinner, or maybe something more advanced, while the new window loads its content.

- **I don't want to bother with popups, can I get xcomponent with just the iframe support?**

  You can indeed. There's an `xcomponent.frame.js` and `xcomponent.frame.min.js` in the `dist/` folder. There's a lot of
  magic that's needed to make popups work with IE, and that's all trimmed out.

- **Can I contribute?**

  By all means! But please raise an issue first if it's more than a small change, to discuss the feasibility.

- **Is this different to [react-frame-component](https://github.com/ryanseddon/react-frame-component)?**

  Yes. `react-frame-component` allows you to render html into a sandboxed iframe on the same domain. `xcomponent` is geared
  around sharing functionality from one domain to another, in a cross-domain iframe.
