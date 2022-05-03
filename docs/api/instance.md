# Component Instance

After instantiating a component, that component instance has a number of helpers.

```javascript
const MyComponent = zoid.create({
    tag: 'my-component',
    url: 'https://my-site.com/my-component'
});

const component = MyComponent({
    foo: 'bar',
    onSomething: () => {
        console.log('Something happened!');
    }
});
```

## render `(container : string | HTMLElement, context : 'iframe' | 'popup') => Promise<void>`

Render the component to a given container.

- container: can be a string selector like `'#my-container'` or a DOM element like `document.body`
- context: defaults to `iframe` or `defaultContainer` if set. Can be overriden to explicitly specify `'iframe'` or `'popup'`.

```javascript
const component = MyComponent();

component.render('#my-container').then(() => {
    console.info('The component was successfully rendered')
});
```

```javascript
const component = MyComponent();

component.render(document.body).then(() => {
    console.info('The component was successfully rendered')
});
```

```javascript
const component = MyComponent();

component.render('#my-container', 'popup').then(() => {
    console.info('The component was successfully rendered')
});
```

## renderTo `(window : Window, container : string | HTMLElement, context : 'iframe' | 'popup') => Promise<void>`

Render the component to a given window and given container.

- window: a reference to the window which the component should be rendered to. Zoid must be loaded in that window and the component must be registered.
- container: must be a string selector like `'#my-container'` (DOM element is not transferable across different windows)
- context: defaults to `iframe` or `defaultContainer` if set. Can be overriden to explicitly specify `'iframe'` or `'popup'`.

```javascript
const component = MyComponent();

component.renderTo(window.parent, '#my-container').then(() => {
    console.info('The component was successfully rendered')
});
```

```javascript
const component = MyComponent();

component.renderTo(window.parent, '#my-container', 'popup').then(() => {
    console.info('The component was successfully rendered')
});
```

## clone `() => ZoidComponentInstance`

Clones the current instance with the exact same set of props

```javascript
const button1 = ButtonComponent({
    color: 'red'
});

const button2 = button1.clone();

button1.render('#first-button-container'); // First red button
button2.render('#first-button-container'); // Second red button
```

## isEligible `() => boolean`

Informs if the component is eligible

```javascript
const myComponent = MyComponent();

if (myComponent.isEligible()) {
    myComponent.render('#my-container');
}
```

To use `isEligible()` you must first define an `eligible` handler when setting up the component:

```javascript
const FirefoxOnlyButton = zoid.create({
    tag: 'my-component',
    url: 'https://my-site.com/my-component',
    eligible: () => {
        if (isFireFox()) {
            return true;
        } else {
            return false;
        }
    }
})
```

## close `() => Promise<void>`

Gracefully close the component

```javascript
const myComponent = MyComponent();
myComponent.render('#container');

document.querySelector('button#close-component').addEventListener('click', () => {
    myComponent.close().then(() => {
        console.log('Component is now closed')
    });
});
```

## focus `() => Promise<void>`

Focus the component. Only works for popup windows, on a user action like a click.

```javascript
const myComponent = MyComponent();
myComponent.render('#container');

document.querySelector('button#focus-component').addEventListener('click', () => {
    myComponent.focus().then(() => {
        console.log('Component is now focused')
    });
});
```

## resize `({ width : number, height : number }) => Promise<void>`

Resize the component. Only works for iframe windows, popups can not be resized once opened.

```javascript
const myComponent = MyComponent();
myComponent.render('#container');

document.querySelector('button#resize-component').addEventListener('click', () => {
    myComponent.resize({ width: 500, height: 800 }).then(() => {
        console.log('Component is now resized')
    });
});
```

## show `() => Promise<void>`

Show the component. Only works for iframe windows, popups can not be hidden/shown once opened.

```javascript
const myComponent = MyComponent();
myComponent.render('#container');

document.querySelector('button#show-component').addEventListener('click', () => {
    myComponent.show().then(() => {
        console.log('Component is now visible')
    });
});
```

## hide `() => Promise<void>`

Hide the component. Only works for iframe windows, popups can not be hidden/shown once opened.

```javascript
const myComponent = MyComponent();
myComponent.render('#container');

document.querySelector('button#hide-component').addEventListener('click', () => {
    myComponent.hide().then(() => {
        console.log('Component is now hidden')
    });
});
```

## updateProps `({ [string ] : any }) => Promise<void>`

Update props in the child window. The child can listen for new props using `window.xprops.onProps`

In the parent window:

```javascript
const component = MyComponent({
    color: 'red'
});

component.render('#container').then(() => {
    component.setProps({
        color: 'blue'
    });
});
```

In the child window:

```javascript
console.log('The current color is', window.xprops.color); // red

window.xprops.onProps(() => {
    console.log('The current color is', window.xprops.color); // lue
});
```

## onError `(Error) => Promise<void>`

Trigger an error in the component

```javascript
const myComponent = MyComponent();
myComponent.render('#container');

document.querySelector('button#trigger-error').addEventListener('click', () => {
    myComponent.onError(new Error(`Something went wrong`)).then(() => {
        console.log('Error successfully triggered')
    });
});
```

## event

Event emitter that can be used to listen for the following events: `RENDER`, `RENDERED`, `PRERENDER`, `PRERENDERED`, `DISPLAY`, `ERROR`, `CLOSED`, `PROPS`, `RESIZE`.

```javascript
const myComponent = MyComponent();
myComponent.render('#container');

myComponent.event.on(zoid.EVENT.RENDERED, () => {
    console.log('Component was rendered!');
});
```

## exports

Any values defined in `export` and passed to `window.xprops.export()` will be available as keys on the component instance:

```javascript
const CreatePostForm = zoid.create({
    tag: 'create-post-form',
    url: 'https://my-site.com/component/create-post-form',

    exports: ({ getExports }) => {
        return {
            submit: () => getExports().then(exports => exports.submit())
        };
    };
});
```

Once this mapper is defined, the child window may export values up to the parent:

```javascript
window.xprops.export({
    submit: () => {
        document.querySelector('form#createPost').submit();
    }
});
```

The parent window may call these exports at any time:

```javascript
const postForm = CreatePostForm();
postForm.render('#create-post-form-container');

document.querySelector('button#submitForm').addEventListener('click', () => {
    postForm.submit();
});
```