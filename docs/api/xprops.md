

# `xprops`

By default `window.xprops` is populated in the child window/frame with any props from the parent.

Some built-in props are provided and automatically populated on `window.xprops`:

## xprops.close `() => Promise<void>`

Gracefully close the component.

```javascript
document.querySelector('button#close').addEventListener('click', () => {
    window.xprops.close();
});
```

## xprops.focus `() => Promise<void>`

Refocus the component. Works on popup windows only, should be triggered on a user interaction like a click, in order to be allowed by the browser.

```javascript
document.querySelector('button#focus').addEventListener('click', () => {
    window.xprops.focus();
});
```

## xprops.resize `({ width : number, height : number }) => Promise<void>`

Resize the component. Works on iframe windows only, popups can not be resized after opening.

```javascript
document.querySelector('button#resize').addEventListener('click', () => {
    window.xprops.resize({ width: 500, height: 800 });
});
```

## xprops.uid `string`

Unique ID for the component instance

```javascript
console.log('The current component uid is:', window.xprops.uid);
```

## xprops.tag `string`

Tag for the component instance

```javascript
console.log('The current component is:', window.xprops.tag);
```

## xprops.getParent `() => Window`

Get a reference to the parent window

```javascript
const parentWindow = window.xprops.getParent();

parentWindow.postMessage('hello!', '*');
```

## xprops.getParentDomain `() => string`

Get the domain of the parent window

```javascript
console.log('The current parent window domain is:', window.xprops.getParentDomain());
```

## xprops.show `() => Promise<void>`

Show the component. Works on iframe windows only, popups can not be shown/hidden after opening.

```javascript
document.querySelector('button#show').addEventListener('click', () => {
    window.xprops.show();
});
```

## xprops.hide `() => Promise<void>`

Hide the component. Works on iframe windows only, popups can not be shown/hidden after opening.

```javascript
document.querySelector('button#hide').addEventListener('click', () => {
    window.xprops.hide();
});
```

## xprops.export `({ [string] : any }) => Promise<void>`

Export data and/or functions from the child to the parent window.

```javascript
window.xprops.export({
    submit: () => {
        document.querySelector('form#createPost').submit();
    }
});
```

This export will be available on the parent window:

```javascript
const postForm = CreatePostForm();
postForm.render('#create-post-form-container');

document.querySelector('button#submitForm').addEventListener('click', () => {
    postForm.submit();
});
```

This assumes that when the component was first created, the author implemented the `exports` function to ensure the exports are mapped to the parent:

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

This mapper is necessary so that the exports are immediately available on the parent component instance, even before the component is fully rendered and before `xprops.export(...)` has been called in the child window.

## xprops.onError `(Error) => Promise<void>`

Send an error to the parent

```
window.xprops.onError(new Error(`Something went wrong!`));
```

## xprops.onProps `(({ [string] : any }) => void) => void`

Set up a listener to receive new props as they are set by the parent window using `componentInstance.setProps(...)`

In the child window:

```javascript
console.log('The current color is', window.xprops.color); // red

window.xprops.onProps(() => {
    console.log('The current color is', window.xprops.color); // blue
});
```

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

## xprops.parent.props `{ [string] : any }`

Props from the parent component, if the component is rendered as a child.

Define the components:

```javascript
const ChildComponent = zoid.create({
    tag: 'child-component',
    url: 'https://my-site.com/component/child'
});

const ParentComponent = zoid.create({
    tag: 'child-component',
    url: 'https://my-site.com/component/child',

    children: () => {
        return {
            Child: ChildComponent
        }
    }
});
```

In the parent window:

```javascript
const parent = ParentComponent({
    color: 'blue'
});

const child = parent.Child();

child.render('#child-container');
```

In the child window:

```javascript
console.log('The color of this component is:', window.xprops.parent.color); // Red
```

## xprops.parent.export `({ [string] : any }) => Promise<void>`

Export values to the parent component.

Define the components:

```javascript
const ChildComponent = zoid.create({
    tag: 'child-component',
    url: 'https://my-site.com/component/child'
});

const ParentComponent = zoid.create({
    tag: 'child-component',
    url: 'https://my-site.com/component/child',

    children: () => {
        return {
            Child: ChildComponent
        }
    },

    exports: ({ getExports }) => {
        return {
            sayHello: () => getExports().then(exports => exports.sayHello())
        };
    }
});
```

In the parent window:

```javascript
const parent = ParentComponent({
    color: 'blue'
});

const child = parent.Child();
child.render('#child-container');

document.querySelector('button#doSomething').addEventListener('click', () => {
    parent.sayHello(); // Should log 'hello world!'
});
```

In the child window:

```javascript
window.xprops.parent.export({
    sayHello: () => {
        console.log('hello world!')
    }
});
```

## xprops.getSiblings `({ anyParent : boolean }) => Array<{ tag : string, xprops : XProps, exports : Exports }>`

Get an array of sibling components on the same domain

```javascript
for (const sibling of window.xprops.getSiblings()) {
    console.log ('Found sibling!', sibling.tag);
}
```

```javascript
for (const sibling of window.xprops.getSiblings({ anyParent: true })) {
    console.log ('Found sibling from any parent!', sibling.tag);
}
```