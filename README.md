xcomponent
----------

Writing cross domain components is really hard.

Consider this: I own `x.com`, you own `y.com`, and I have some functionality I want to put within your page.
I could just give you a javascript component to drop in your page. Javascript components are pretty much a
solved problem at this point! React, Ember, Angular and other frameworks all provide great ways to build reusable and shareable components.
But:

- What if I write a component in React and you're using Ember?
- What if I have secure data like login credentials that I don't want you to have access to?
- What if I need to make calls to apis that I don't want to expose to third party domains?

So the obvious choice is an iframe, or a popup. Iframes are great ways to sandbox off little bits of cross-domain functionality,
where I want to put a component on your page, but I want it to be a black box and not let you have any access to it. But iframes aren't all that easy to use:

- How should people pass down data? Should they programatically create an iframe and pass params down in the url?
- How should people get events back up? Should I send fire-and-forget post messages, and have them add listeners?
- How do I deal with error cases when my component fails, or when messaging fails?
- How do I create a nice, simple interface for my component that people can easily reason about?

xcomponent aims to solve all of these problems, by providing a clean way to build distributable, cross-domain components that work seamlessly with both iframes and popups.
The primary focus of this is to allow you to define your interface, and then do the heavy lifting in the background, and do all of the things you shouldn't need to think about:

- Passing data down
- Getting messages back up
- Creating the iframe or popup and generating the correct url
- Bubbling errors back up to the parent

### Example

#### As the component creator

Let's say I'm creating a component. First I'd create a spec for the component's interface:

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

This spec is the part that's going to be shared between my frame (or popup) and the parent page. It describes how to render the component on the page, what kind of data needs to be passed down, and what kind of callbacks I should expect.

Now I'm ready to set up my component page. Let's start with a simple log-in form.  It's written using jQuery, but you can use whatever technology you want - `xcomponent` is framework agnostic:

```html
<input id="email" type="text" />
<input id="password" type="password" />
<button id="login">Log In</button>

<script>
    // Wait for the user to log in

    $('#login').on('click', function() {

        // Capture their credentials

        var email = $('#email').val();
        var password = $('#password').val();

        // Log them in on the server side

        $.post('/api/login', { email: email, password: password }, function() {

            console.log('Successfully logged in!');
        });
    });
</script>
```

This is great, but at this point it's totally isolated from the parent. If I was to drop this in an iframe, it would function perfectly, but the parent would have no way to interact with it.

Now let's think about how this component is going to be integrated with the parent page. We've already defined the component contract, so we just need to plug it in:

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

As the owner of the component, that's all we needed to do! Now anyone can use the component we defined.


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

This is even easier if you're using a supported framework like React, Ember or Angular:

React:

```javascript
<MyLoginComponent.react prefilledEmail='foo@bar.com' onLogin={this.onLogin} />
```

Angular:

```javascript
<my-login-component prefilled-email="foo@bar.com" on-login="onLogin" />
```

---

And we're done! Notice how I never had to write any code to create an iframe, or send post messages? That's all taken care of for you.
When you call `this.props.onLogin(email);` it looks like you're just calling a function, but in reality `xcomponent` is transparently
turning that callback into a post-message and relaying it to the parent for you.



### Updating props and passing them down to the child

xcomponent will automatically pass down new properties to the child, depending on the framework you're integrating with.

For example, I might have the following react code:

```javascript
var Main = window.React.createClass({

    componentWillMount: function() {
        this.setState({ email: 'foo@bar.com' });
    },

    emailChange: function(event) {
        this.setState({ email: event.target.value });
    },

    render: function() {
        return (
            <div>
                <MyLoginComponent.react prefilledEmail={this.state.email} />
                <input onChange={this.emailChange} placeholder="email" value={this.state.email} />
            </div>
        );
    }
});

ReactDOM.render(<Main />, document.getElementById('example'));
```

This code updates `this.state.email` every time the user types into the input field.

Our component can listen for any property updates like so:

```html

<div>
    Welcome <span id="email"></span>!
</div>

<script>
    MyLoginComponent.attach({

        onProps: function() {
            if (this.props.email) {
                document.getElementById('email').value = this.props.email;
            }
        }
    });
<script>
```

If I wanted to update the props from my parent manually, using javascript, I can do this too:

```javascript
var login = MyLoginComponent.init({

    props: {
        email: 'foo@bar.com'
    }
});

// At some point in the future

login.updateProps({
    email: 'baz@bar.com'
});
```


### Setting a timeout for rendering my component

If you set a timeout, xcomponent will automatically call your `onError` method if the component does not initalize itself in that time

```javascript
var login = MyLoginComponent.init({

    onError: function(err) {
        // Gracefully handle the error from rendering the component
    },

    timeout: 5000
});
```


### Making your component a singleton

A lot of the time, it won't make sense to allow people to use your component multiple times in the same page.
To prevent them from doing that, you can set `singleton: true` when rendering:

```javascript
var login = MyLoginComponent.init({

    singleton: true
});
```
