# Component

## Instantiate `(props : { [string] : any }) => ZoidComponentInstance`

Instantiate a component and pass in props.

```javascript
const Component = zoid.create({
    tag: 'my-component',
    url: 'https://my-site.com/my-component'
});

const componentInstance = Component({
    foo: 'bar',
    onSomething: () => {
        console.log('Something happened!');
    }
});
```

See [Component Instance](./instance.md);

## isChild `() => boolean`

Returns `true` if the window you are currently in is an instance of the component, `false` if not.

```javascript
const MyComponent = zoid.create({ ... });

if (MyComponent.isChild()) {
    console.log('We are currently in a child iframe or popup of MyComponent!')
}
```

## xprops `{ [string] : any }`

Similar to `window.xprops` -- gives you access to the props passed down to the child window or iframe

```javascript
const MyComponent = zoid.create({ ... });

console.log(MyComponent.xprops.message);
```

## canRenderTo `(Window) => Promise<boolean>`

Returns a promise for a boolean, informing you if it is possible to remotely render the component to a different window.

```javascript
const MyComponent = zoid.create({ ... });

MyComponent.canRenderTo(window.parent).then(result => {
    if (result) {
        console.log('We can render to the parent window!');
        MyComponent().renderTo(window.parent, '#container');
    }
});
```

## Instances `Array<ZoidComponentInstances>`

Provides an array of currently rendered instances of the zoid component

```
const MyComponent = zoid.create({ ... });

console.log(`There are currently ${ MyComponent.instances.length } active instances of MyComponent`);
```

## driver `(frameworkName : string, dependencies : { ... }) => Driver`

Register a component with your framework of choice, so it can be rendered natively in your app.

```javascript
import FooFramework from 'foo-framework';

const Component = zoid.create({ ... });
const FooComponent = Component.driver('foo', { FooFramework });

// Now `FooComponent` is natively renderable inside a `FooFramework` app.
```

### React

```javascript
let MyReactZoidComponent = MyZoidComponent.driver('react', {
    React:    React, 
    ReactDOM: ReactDOM
});
```

```javascript
render() {
    return (
        <MyReactZoidComponent foo="bar" />
    );
}
```

### Angular 1

```javascript
MyZoidComponent.driver('angular', angular);`
```

```html
<my-zoid foo="bar">
```

### Angular 2

```javascript
@ng.core.NgModule({
    imports: [
        ng.platformBrowser.BrowserModule,
        MyZoidComponent.driver('angular2', ng.core)
    ]
});
```

```html
<my-zoid [props]="{ foo: 'bar' }"></my-zoid>
```

### Glimmer

```javascript
import Component from '@glimmer/component';

export default MyZoidComponent.driver('glimmer', Component);
```

```html
<my-zoid @foo={{bar}}></my-zoid>
```

### Vue

```javascript
Vue.component('app', {

    components: {
        'my-zoid': MyZoidComponent.driver('vue')
    }
}
```

```html
<my-zoid :foo="bar" />
```


### Vue 3

```javascript
// Create Vue application
const app = Vue.createApp(...)

// Define a new component called my-zoid 
app.component('my-zoid', MyZoidComponent.driver('vue3'))

// Mount Vue application
app.mount(...)
```

```html
<my-zoid :foo="bar" />
```