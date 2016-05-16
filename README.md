xcomponent
----------

Writing cross domain components is really hard.

Consider this: I own x.com, you own y.com, and I have some functionality I want to put in your page. For example PayPal Checkout,
or Facebook comments. I could just give you a javascript component to drop in your page. Javascript components are pretty much a
solved problem at this point! React, Ember, Angular and other frameworks all provide great ways to build reusable and shareable components.
But I quickly run into some problems:

- What if I write a component in React and you're using Ember?
- What if I have secure data that I don't want you to have access to?
- What if I want to let people log in to my page without sharing their credentials with you?

So I build an iframe based component. Iframes are great ways to sandbox off little bits of cross-domain functionality,
where I want to put a component on your page, but I want it to be a black box and not let you have any access to it. But immediately, I run into more problems:

- How do I have people pass down data? Should they build an iframe and and drop strings down through my url?
- How do I pass data and events back up? Do I send fire-and-forget post messages and have you listen for them all manually?
- How do I deal with the lifecycle of the component?

xcomponent aims to solve all of these problems, by providing a clean way to build distributable, cross-domain components that work seamlessly with both iframes and popups, with tight interfaces that you define.

### Simple example

#### As the component creator

Let's say I'm creating a component. First I'd create a spec for the component's interface:

```javascript
var MyLoginComponent = xcomponent.create({

    // The url that will be loaded in the iframe or popup, when someone includes my component on their page
    url: 'http://www.my-site.com/my-login-component',

    // The size of the component on their page
    dimensions: {
        width: 400,
        height: 200
    }

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

This spec is the part that's going to be shared between my frame (or popup) and the parent page. It describes how to render the component on the page, and what kind of data needs to be passed down for it to render.

Now I'm render to set up my component page to do whatever we need to do. In this case it's a simple login page written using jQuery, but you can do this in whatever technology you want:

```html
<input id="email" type="text" />
<input id="password" type="password" />
<button id="login">Log In</button>

<script>
    $('#login').on('click', function() {

        var email = $('#email').val();
        var password = $('#password').val();

        $.post('/api/login', { email: email, password: password }, function() {

            console.log('Successfully logged in!');
        });
    });
</script>
```

Now let's think about how this component is going to be integrated with the parent page. We've already defined the contract, so this is easy:

- We need to pre-populate the `#email` element with a `prefilledEmail` param, if we're passed one.
- We need to call an `onLogin` success callback when we do a successful login, so the parent knows the user has logged in.

Let's do that in our example above.

```html
<!-- We should pull in the login component we defined above -->
<script src="./my-login-component.js"></script>

<input id="email" type="text" />
<input id="password" type="password" />
<button id="login">Log In</button>

<script>
    // Attach the component definition to our page, which will handle the business logic of the component and call the interface we defined before

    var loginComponent = MyLoginComponent.attach({

        // When we enter the component, we'll pre-populate the email field if we were passed an email

        onEnter: function() {
            if (this.props.prefilledEmail) {
                $('#email').val(this.props.prefilledEmail);
            }
        }
    });

    $('#login').on('click', function() {

        var email = $('#email').val();
        var password = $('#password').val();

        $.post('/api/login', { email: email, password: password }, function() {

            // Since we had a successful login, let's call our parent with the callback they provided

            this.props.onLogin(email);
        });
    });
</script>
```

As the owner of the component, that's all we needed to do! We just had to define an interface, and integrate our component definition with the page we want to render.


#### As the component user

My life is even easier. I just need to drop in your component onto my page:

```html
<!-- We should pull in the login component that was defined above -->
<script src="http://www.my-site.com/components/my-login-component.js"></script>

<!-- Set up a container for the iframe component to live in -->
<div id="container"></div>

<script>
    // Create an instance of the component

    var mycomponent = MyLoginComponent.init({

        props: {
            prefilledEmail: 'foo@bar.com',

            onLogin: function(email) {
                console.log('User logged in with email:', email);
            }
        }
    });

    // Render the component to the page

    mycomponent.renderIframe('container');
</script>
```

And we're done!

This is even easier if you're using a supported framework like React, Ember or Angular:

React:

```javascript
<MyLoginComponent prefilledEmail='foo@bar.com' onLogin={this.onLogin} />
```

Angular:

```javascript
<my-login-component prefilled-email="foo@bar.com" on-login="onLogin" />
```