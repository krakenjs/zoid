xcomponent
----------

[https://medium.com/@bluepnume/introducing-xcomponent](https://medium.com/@bluepnume/introducing-xcomponent-seamless-cross-domain-web-components-from-paypal-c0144f3e82bf#.ikbg9r1ml)

A cross-domain component toolkit, supporting:

- Render an iframe or popup on a different domain and pass down props, including objects and functions
- Call callbacks natively from the child window without worrying about post-messaging or cross-domain restrictions
- Create components to share functionality from your site to other domains!

Useful if you want to build a component which can be rendered into an inline iframe, an absolutely positioned iframe, or a popup, and take advantage of the sandboxing provided by iframes alongside the flexibility of passing
props and callbacks instead of url params and post message listeners.

Xcomponent will handle rendering your component, passing down props (including data and callbacks) and transmitting the
callbacks back up to the parent page.

It's 'data-down, actions up', but 100% cross-domain!

```javascript
MyComponent.render({

    someData: {
        foo: 'bar'
    },

    onComplete: function(result) {
        console.log('The component called back with a result:', result);
    }

}, '#container');
```

And on the child page:

```javascript
console.log('We were passed some data from the parent page:', window.xchild.props.someData);

window.xchild.props.onComplete({ hello: 'world' });
```

## Rationale

Writing cross domain components is really hard.

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
and then do the heavy lifting in the background, and do all of the things you shouldn't need to think about:

It will even automatically generate React, Angular and Ember bindings so using the component feels even more native.

## Example

Let's create a login component. We want the user to be able to log in on our site, and to notify the parent window
that the user has logged in, without exposing any of the users credentials to the parent window.

Take a look at the [demos](./demo/index.md) to see this example in action.

### As the component creator

First I'd create a spec for the component's interface:

```javascript
var MyLoginComponent = xcomponent.create({

    // The html tag used to render my component

    tag: 'my-login-component',

    // The url that will be loaded in the iframe or popup, when someone includes my component on their page

    url: 'http://www.my-site.com/my-login-component',

    // The size of the component on their page

    dimensions: {
        width: 400,
        height: 200
    },

    // The properties they can (or must) pass down to my component

    props: {

        prefilledEmail: {
            type: 'string',
            required: false
        },

        onLogin: {
            type: 'function',
            required: true
        }
    }
});
```

This spec describes everything needed to render the component on the parent page, including the props the component expects.

Now we need to actually implement the business logic of the component -- the code that will run inside the iframe.

I just need to use `window.xchild` to get the props that are passed down.

```html
<!-- Pull in the login component we defined above -->

<script src="./my-login-component.js"></script>

<!-- Set up a login form -->

<form>
    <input id="email" type="text" />
    <input id="password" type="password" />
    <button id="login">Log In</button>
</form>

<script>
    // Pre-polulate the email field, if we're passed an email

    if (window.xchild.props.prefilledEmail) {
        document.querySelector('#email').value = window.xchild.props.prefilledEmail;
    }

    // Handle the button click to log the user in

    document.querySelector('#login').addEventListener('click', function(event) {
        event.preventDefault();

        var email    = document.querySelector('#email').value;
        var password = document.querySelector('#password').value;

        jQuery.post('/api/login', { email: email, password: password }, function() {

            // Since we had a successful login, call-back the parent page to let them know which user logged in:

            window.xchild.props.onLogin(email);
        });
    });
</script>
```

Now anyone can render the component we defined onto their page!


### As the component user

My life is even easier. I just need to drop in your component onto my page:

```html
<!-- Pull in the login component we defined above -->

<script src="./my-login-component.js"></script>

<!-- Set up a container for the iframe to be rendered into -->

<div id="container"></div>

<script>
    // Render the component

    MyLoginComponent.render({

        prefilledEmail: 'foo@bar.com',

        onLogin: function(email) {
            console.log('User logged in with email:', email);
        }

    }, '#container');
</script>
```

This is even easier if you're using a supported framework like React, Ember or Angular -- xcomponent will automatically
set up bindings for these frameworks:

### React / JSX

Drop the component in any `render()` method:

```javascript
render: function() {
    return (
        <MyLoginComponent.react prefilledEmail='foo@bar.com' onLogin={onLogin} />
    );
}
```

### Angular

Specify the component name as a dependency to your angular app:

```javascript
angular.module('myapp', ['my-login-component'])
```

Include the tag in one of your templates (don't forget to use dasherized prop names):

```html
<my-login-component prefilled-email="foo@bar.com" on-login="onLogin" />
```

---

And we're done! Notice how I never had to write any code to create an iframe, or send post messages? That's all taken care of for you.
When you call `this.props.onLogin(email);` it looks like you're just calling a function, but in reality `xcomponent` is transparently
turning that callback into a post-message and relaying it to the parent for you.
