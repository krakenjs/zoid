xcomponent
----------

[https://medium.com/@bluepnume/introducing-xcomponent](https://medium.com/@bluepnume/introducing-xcomponent-seamless-cross-domain-web-components-from-paypal-c0144f3e82bf#.ikbg9r1ml)

A cross-domain component toolkit, supporting:

- Render an iframe or popup on a different domain, and pass down props, including objects and functions
- Call callbacks natively from the child window without worrying about post-messaging or cross-domain restrictions
- Create and expose components to share functionality from your site to others!

It's 'data-down, actions up', but 100% cross-domain! You can even use it directly with libraries like React and Angular.

-----

## [API Docs](./docs/api.md) - The public options and methods supported by xcomponent

## [Demos](http://krakenjs.com/xcomponent/demo/index.htm) - Some working demos of different xcomponent integration patterns

## [Example](./docs/example.md) - A full example of how to build a cross-domain component using xcomponent

### Quick example:

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

## Rationale

Writing cross domain components is tricky.

Consider this: I own `x.com`, you own `y.com`, and I have some functionality I want to put within your page.

I could just give you some javascript to drop in your page. But then:

- What if I write a component in React, and you're using Ember or Angular on your page, or no framework at all?
- What if I have secure data like login credentials that I don't want you to have access to?
- What if I need to make secure calls to apis from my component that I don't want to expose using CORS?

The obvious choice would be to embed the component in an iframe, or a popup window, rather than dropping it straight
onto the parent page. But:

- How should people pass down data? Should they pass everything in the url?
- How should people get events back up? Should I set up a global post message listener, and send fire-and-forget post messages from the child?
- How do I deal with error cases when my component fails, or when messaging fails?
- How do I create a nice, simple interface for my component that people can easily reason about?

xcomponent aims to solve all of these problems, by providing a clean way to build distributable, cross-domain components
that work seamlessly with both iframes and popups. The primary focus of this is to allow you to define your interface,
and then do the heavy lifting in the background, and do all of the things you shouldn't need to think about.

It will even automatically generate React, Angular and Ember bindings, so using the component feels even more native.