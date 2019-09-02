# `zoid`

### `zoid.create({ ...options })`

Create a component definition, which will be loaded in both the parent and child windows.

#### tag `string` [required]

A tag-name for the component, used for:

- Loading the correct component in the child window or frame
- Generating framework drivers
- Logging

```javascript
tag: 'my-component-tag'
```

#### url `string | ({ props }) => string` [required]

The full url that will be loaded when your component is rendered, or a function returning the url.

This must include a protocol (http:, https:, or about:); it cannot be scheme-relative.

```javascript
url: 'https://www.my-site.com/mycomponent'
```

```javascript
url: ({ props }) => {
    return (props.env === 'development')
        ? 'http://dev.my-site.com/mycomponent'
        : 'https://www.my-site.com/mycomponent';
}
```

#### dimensions `{ width : string, height : string }`

The dimensions for your component, in css-style units, with support for `px` or `%`.

```javascript
dimensions: {
    width: '300px',
    height: '200px'
}
```

```javascript
dimensions: {
    width: '80%',
    height: '90%'
}
```

#### props `Object<string, Object>`

A mapping of prop name to prop settings. Used to do run-time validation and prop normalization.

```javascript
props: {

    onLogin: {
        type: 'function'
    },

    prefilledEmail: {
        type: 'string',
        required: false
    }
}
```

##### Prop Options

- **type** `string`

  The data-type expected for the prop

  - `'string'`
  - `'number'`
  - `'boolean'`
  - `'object'`
  - `'function'`
  - `'array'`

- **required** `boolean`

  Whether or not the prop is mandatory. Defaults to `true`.

  ```javascript
  onLogin: {
      type: 'function',
      required: false
  }
  ```

- **default** `({ props }) => value`

  A function returning the default value for the prop, if none is passed

  ```javascript
  email: {
      type: 'string',
      required: false,
      default: function() {
          return 'a@b.com';
      }
  }
  ```

- **validate** `({ value, props }) => void`

  A function to validate the passed value. Should throw an appropriate error if invalid.

  ```javascript
  email: {
      type: 'string',
      validate: function({ value, props }) {
          if (!value.match(/^.+@.+\..+$/)) {
              throw new TypeError(`Expected email to be valid format`);
          }
      }
  }
  ```

- **queryParam** `boolean | string | (value) => string`

  Should a prop be passed in the url.

  ```javascript
  email: {
      type: 'string',
      queryParam: true // ?email=foo@bar.com
  }
  ```

  If a string is set, this specifies the url param name which will be used. 

  ```javascript
  email: {
      type: 'string',
      queryParam: 'user-email' // ?user-email=foo@bar.com
  }
  ```

  If a function is set, this is called to determine the url param which should be used.

  ```javascript
  email: {
      type: 'string',
      queryParam: function({ value }) {
          if (value.indexOf('@foo.com') !== -1) {
              return 'foo-email'; // ?foo-email=person@foo.com
          } else {
              return 'generic-email'; // ?generic-email=person@whatever.com
          }
      }
  }
  ```

- **value** `({ props }) => value`

  The value for the prop, if it should be statically defined at component creation time

  ```javascript
  userAgent: {
      type: 'string',
      value() {
          return window.navigator.userAgent;
      }
  }
  ```

- **decorate** `({ value, props }) => value`

  A function used to decorate the prop at render-time. Called with the value of the prop, should return the new value.

  ```javascript
  onLogin: {
      type: 'function',
      decorate(original) {
          return function() {
              console.log('User logged in!');
              return original.apply(this, arguments);
          };
      }
  }
  ```

- **serialization** `string`

  If `json`, the prop will be JSON stringified before being inserted into the url

  ```javascript
  user: {
      type: 'object',
      serialization: 'json' // ?user={"name":"Zippy","age":34}
  }
  ```

  If `dotify` the prop will be converted to dot-notation.

  ```javascript
  user: {
      type: 'object',
      serialization: 'dotify' // ?user.name=Zippy&user.age=34
  }
  ```

  If `base64`, the prop will be JSON stringified then base64 encoded before being inserted into the url

  ```javascript
  user: {
      type: 'object',
      serialization: 'base64' // ?user=eyJuYW1lIjoiWmlwcHkiLCJhZ2UiOjM0fQ==
  }
  ```

- **alias** `string`

  An aliased name for the prop

  ```javascript
  onLogin: {
      type: 'function',
      alias: 'onUserLogin'
  }
  ```

#### containerTemplate `(opts) => HTMLElement`

A function which should return a DOM element, rendered on the parent page and containing the iframe element (or rendered behind the popup window).

zoid will pass `opts.frame` and `opts.prerenderFrame` to this function, which is a pre-generated element your component will be rendered into. These must be inserted somewhere into the DOM element you return, for frame-based components

The `opts` parameter is [the same](#opts) as the parameter used in `prerenderTemplate`

Best used with [jsx-pragmatic](https://github.com/krakenjs/jsx-pragmatic). You can use [babel](https://babeljs.io/docs/plugins/transform-react-jsx/) with a `/* @jsx node */` comment, to transpile the jsx down to regular javascript.

```javascript
/* @jsx node */

import { node, dom } from 'jsx-pragmatic';

var MyLoginZoidComponent = zoid.create({
    tag: 'my-login',
    url: 'https://www.mysite.com/login',

    containerTemplate: function({ uid, doc, frame, prerenderFrame }) {
        return (
            <div id={ uid } class="container">
                <style>
                    {`
                        #${ uid }.container {
                            border: 5px solid red;
                        }
                    `}
                </style>

                <frame el={ frame } />
                <frame el={ prerenderFrame } />
            </div>
        ).render(dom({ doc }));
    }
});
```

As with React, you are also free to skip using JSX and just use `node` from `jsx-pragmatic` directly:

```javascript
import { node, dom } from 'jsx-pragmatic';

var MyLoginZoidComponent = zoid.create({
    tag: 'my-login',
    url: 'https://www.mysite.com/login',

    containerTemplate: function containerTemplate({ uid, doc, frame, prerenderFrame }) {
        return node('div', { id: uid, class: 'container' },
            node('style', null, `
                #${ uid }.container {
                    border: 5px solid red;
                }
            `),
            node('node', { el: frame }),
            node('node', { el: prerenderFrame })
        ).render(dom({ doc }));
    }
});
```

Since `containerTemplate` requires a DOM element to be returned, you're also free to manually create the element hierarchy using built-in browser methods like `doc.createElement`:

```javascript
import { node, dom } from 'jsx-pragmatic';

var MyLoginZoidComponent = zoid.create({
    tag: 'my-login',
    url: 'https://www.mysite.com/login',

    containerTemplate: function containerTemplate({ doc, uid, frame, prerenderFrame }) {
        let container = doc.createElement('div');
        container.id = uid;
        container.appendChild(frame);
        container.appendChild(prerenderFrame);
        return container;
    }
});
```

If no `containerTemplate` function is defined, then a default is used. The default template can be found [here](https://github.com/krakenjs/zoid/blob/master/src/component/templates/container.js).

#### prerenderTemplate `(opts) => HTMLElement`

A function which should return a DOM element, rendered in place of the iframe element, or inside the popup window, as it loads.

Useful if you want to display a loading spinner or pre-render some content as the component loads.

Best used with [jsx-pragmatic](https://github.com/krakenjs/jsx-pragmatic). You can use [babel](https://babeljs.io/docs/plugins/transform-react-jsx/) with a `/* @jsx node */` comment, to transpile the jsx down to regular javascript.

```javascript
/* @jsx node */

import { node, dom } from 'jsx-pragmatic';

var MyLoginZoidComponent = zoid.create({
    tag: 'my-login',
    url: 'https://www.mysite.com/login',

    prerenderTemplate: function({ doc ) {
        return (
            <p>
                Please wait while the component loads...
            </p>
        ).render(dom({ doc }));
    }
});
```

As with React, you are also free to skip using JSX and just use `node` directly:

```javascript
import { node, dom } from 'jsx-pragmatic';

var MyLoginZoidComponent = zoid.create({
    tag: 'my-login',
    url: 'https://www.mysite.com/login',

    prerenderTemplate: function containerTemplate({ doc }) {
        return node('p', null, `
            Please wait while the component loads...
        `).render(dom({ doc }));
    }
});
```

Since `prerenderTemplate` only requires a DOM element, you're also free to manually create the element hierarchy using built-in browser methods like `doc.createElement`.

**Note:** if you're using `document` method, you must use the `doc` passed to `prerenderTemplate`, so the element is created using the target document of the new iframe or popup window, **not** the document of the parent page. This is essential for browser compatibility.

```javascript
import { node, dom } from 'jsx-pragmatic';

var MyLoginZoidComponent = zoid.create({
    tag: 'my-login',
    url: 'https://www.mysite.com/login',

    prerenderTemplate: function containerTemplate({ doc }) {
        const p = doc.createElement('p');
        p.innerText = 'Please wait while the component loads...';
        return p;
    }
});
```

##### opts

Data automatically passed to `containerTemplate` and `prerenderTemplate`, used to help render and customize the template.

- `uid`: Unique id automatically generated by zoid on render, unique to the instantiation of the given component
- `props`: Props passed to the component in `render()`
- `doc`: The appropriate document used to render dom elements
- `container`: The element into which the generated element will be inserted
- `dimensions`: The dimensions for the component
- `tag`: Tag name of the component
- `context`: Context type of the component (`iframe` or `popup`)
- `frame`: Frame element that will be rendered into. Only applies to `containerTemplate` when rendering an iframe
- `prerenderFrame`: Frame element that will be pre-rendered into. Only applies to `containerTemplate` when rendering an iframe using `prerenderTemplate`
- `close`: Close the component. Useful if you want to render a close button outside the component
- `focus`: Focus the component. Valid for popup components only. Useful if you want a clickable background overlay to re-focus the popup window.
- `event`: Object that can be used to listen for the following events: `RENDER`, `RENDERED`, `DISPLAY`, `ERROR`, `CLOSED`, `PROPS`, `RESIZE`

##### Listening to zoid events

In the `containerTemplate` and `prerenderFunctions`, it is possible to attach functions that fire at events in the zoid lifecycle:

```javascript
event.on(EVENT.RENDERED, () => {
  prerenderFrame.classList.remove(CLASS.VISIBLE);
  prerenderFrame.classList.add(CLASS.INVISIBLE);

  frame.classList.remove(CLASS.INVISIBLE);
  frame.classList.add(CLASS.VISIBLE);

  setTimeout(() => {
    destroyElement(prerenderFrame);
  }, 1);
});
```

#### autoResize `{ height: boolean, width: boolean, element: string }`

Makes the iframe resize automatically when the child window size changes.

```javascript
autoResize: {
    width: false,
    height: true,
}
```

Note that by default it matches the `body` element of your content.
You can override this setting by specifying a custom selector as an `element` property.

```javascript
autoResize: {
    width: false,
    height: true,
    element: '.my-selector',
}
```

Recommended to only use autoResize for height. Width has some strange effects, especially when scroll bars are present.

#### allowedParentDomains `string | Array<string | RegEx>`

A string, array of strings or reqular expresions to be used to validate parent domain. If parent domain doesn't match any item, communication from child to parent will be prevented. The default value is '*' which match any domain.
  
```javascript
allowedParentDomains: [ 
    "http://localhost",
    /^http:\/\/www\.mydomain\.com$/
  ]
```

#### domain `string`

A string, or map of env to strings, for the domain which will be loaded in the iframe or popup.

Only required if the domain which will be rendered is different to the domain specified in the `url` setting - for example, if the original url does a 302 redirect to a different domain or subdomain.

```javascript
url: 'https://foo.com/login',

domain: 'https://subdomain.foo.com'
```

### defaultContext `string`

Determines which should be picked by default when `render()` is called. Defaults to `iframe`.

```javascript
defaultContext: 'popup'
```

### validate `({ props }) => void`

Function which is passed all of the props at once and may validate them. Useful for validating inter-dependant props.

```javascript
validate: function({ props }) {
    if (props.name === 'Batman' && props.strength < 10) {
        throw new Error(`Batman must have at least 10 strength`);
    }
}
```

#### bridgeUrl `string `

The url for a [post-robot bridge](https://github.com/krakenjs/post-robot#parent-to-popup-messaging). Will be automatically loaded in a hidden iframe when a popup component is rendered, to allow communication between the parent window and the popup in IE/Edge.

This is only necessary if you are creating a popup component which needs to run in IE and/or Edge.

```javascript
bridgeUrl: 'https://foo.com/bridge'
```

# `Component`

### `Component(props).render(container, ?context)`

Render the component to the given container element.

#### props `Object`

Object containing all of the props required by the given component

#### container `string | HTMLElement`

Element selector, or element, into which the component should be rendered.

Defaults to `document.body`.

#### context `iframe | popup`

The context to render to. Defaults to `defaultContext`, or if `defaultContext` is not set, `iframe`.

### `Component(props).renderTo(win, container, ?context)`

Equivalent to `Component().render()` but allows rendering to a remote window. For example, a child component may render a new component to the parent page.

- The component must have been registered on the target window
- The component must be rendered from within the iframe of an existing component
- The component being rendered must have the same domain as the component initiating the render

#### win `Window`

The target window to which the component should be rendered. Ordinarily this will be `window.parent`.

#### props `Object`

Object containing all of the props required by the given component

#### container `string | HTMLElement`

Element selector, or element, into which the component should be rendered.

Defaults to `document.body`.

#### context `iframe | popup`

The context to render to. Defaults to `defaultContext`, or if `defaultContext` is not set, `iframe`.

### `Component.driver(name, dependencies)`

Register a component with your framework of choice, so it can be rendered natively in your app.

#### React

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

#### Angular 1

```javascript
MyZoidComponent.driver('angular', angular);`
```

```html
<my-zoid foo="bar">
```

#### Angular 2

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

#### Glimmer

```javascript
import Component from '@glimmer/component';

export default MyZoidComponent.driver('glimmer', Component);
```

```html
<my-zoid @foo={{bar}}></my-zoid>
```

#### Vue

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

