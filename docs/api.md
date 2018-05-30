# `zoid`

### `zoid.create({ ...options })`

Create a component definition, which will be loaded in both the parent and child windows.

#### tag `string` [required]

A tag-name for the component, used for:

- Logging
- Auto-generating an angular directive

```javascript
tag: 'my-component-tag'
```

#### url `string | { env : string }` [required]

The full url that will be loaded when your component is rendered, or an object mapping different urls for different
environments.

```javascript
url: 'https://www.my-site.com/mycomponent'
```

```javascript
url: {
    local: 'http://localhost:8000/mycomponent',
    dev: 'http://my-dev-site.com:8000/mycomponent',
    live: 'https://my-live-site.com/mycomponent'
}
```
Note: If the map-syntax is used for `url`, the rendered component can override the `defaultEnv` at runtime like so:
```javascript
MyComponent.render({
env: 'local'
}, '#container')
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

    prefilledEmail: {
        type: 'string',
        required: false
    },

    onLogin: {
        type: 'function',
        required: true
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

- **required** `boolean`

  Whether or not the prop is mandatory

  ```javascript
  onLogin: {
      type: 'function',
      required: true
  }
  ```

- **def** `(props) => value`

  A function returning the default value for the prop, if none is passed

  ```javascript
  email: {
      type: 'string',
      required: false,
      def: function() {
          return 'a@b.com';
      }
  }
  ```

- **validate** `(value, props) => void`

  A function to validate the passed value. Should throw an appopriate error if invalid.

  ```javascript
  email: {
      type: 'string',
      validate: function(value, props) {
          if (!value.match(/^.+@.+\..+$/)) {
              throw new Error(`Expected email to be valid format`);
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
      queryParam: function(value) {
          if (value.indexOf('@foo.com') !== -1) {
              return 'foo-email'; // ?foo-email=person@foo.com
          } else {
              return 'generic-email'; // ?generic-email=person@whatever.com
          }
      }
  }
  ```

- **value** `any`

  The value for the prop, if it should be statically defined at component creation time

  ```javascript
  userAgent: {
      type: 'string',
      value() {
          return window.navigator.userAgent;
      }
  }
  ```

- **decorate** `(value, props) => value`

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

- **promisify** `boolean`

  Should a function prop be turned into a promise-returning function

  ```javascript
  onLogin: {
      type: 'function',
      promisify: true
  }
  ```

- **noop** `boolean`

  Should a function prop default to noop

  ```javascript
  onLogin: {
      type: 'function',
      noop: true
  }
  ```

- **once** `boolean`

  Should a function prop be turned into a one-time function

  ```javascript
  onLogin: {
      type: 'function',
      once: true
  }
  ```

- **memoize** `boolean`

  Should a function prop be turned into a memoizing function

  ```javascript
  getExpensiveData: {
      type: 'function',
      memoize: true
  }
  ```

- **serialization** `string`

  If `'json'`, the prop will be JSON stringified before being inserted into the url, otherwise the prop will be converted to dot-notation.

  ```javascript
  user: {
      type: 'object',
      serialization: 'json' // ?user={"name":"Zippy","age":34}
  }
  ```

  ```javascript
  user: {
      type: 'object',
      serialization: 'dotify' // ?user.name=Zippy&user.age=34
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

zoid will pass `opts.outlet` to this function, which is a pre-generated element your component will be rendered into. This must be inserted somewhere into the DOM element you return. For popup components, you don't need to use `opts.outlet`

Best used with [jsx](https://facebook.github.io/jsx/) and the built-in `jsxDom` jsx pragma. You can use [babel](https://babeljs.io/docs/plugins/transform-react-jsx/) to transpile the jsx down to regular javacript.

```javascript
/* @jsx jsxDom */

var MyLoginZoidComponent = zoid.create({
    tag: 'my-login',
    url: 'https://www.mysite.com/login',

    containerTemplate: function(opts) {
        return (
            <div id={ opts.id }>
                <style>
                    {`
                        #${ opts.id } {
                            border: 5px solid red;
                        }
                    `}
                </style>

                { opts.outlet }
            </div>
        );
    }
});
```

As with React, you are also free to skip using JSX and just use `jsxDom` directly:

```javascript
var MyLoginZoidComponent = zoid.create({
    tag: 'my-login',
    url: 'https://www.mysite.com/login',

    containerTemplate: function containerTemplate(opts) {
        return jsxDom('div', { id: opts.id },
            jsxDom('style', null, `
                #${ opts.id } {
                    border: 5px solid red;
                }
            `),
            opts.outlet
        );
    }
});
```

Since `containerTemplate` only requires a DOM element, you're also free to manually create the element hierarchy using built-in browser methods like `opts.document.createElement`, `innerHTML` and so on.

**Note:** if using `document.createElement`, you must use `opts.document`, so the element is created using the target document of the new iframe or popup window, not the document of the parent page.

#### prerenderTemplate `(opts) => HTMLElement`

A function which should return a DOM element, rendered in place of the iframe element, or inside the popup window, as it loads.

Useful if you want to display a loading spinner or pre-render some content as the component loads.

Best used with [jsx](https://facebook.github.io/jsx/) and the built-in `jsxDom` jsx pragma. You can use [babel](https://babeljs.io/docs/plugins/transform-react-jsx/) to transpile the jsx down to regular javacript.

```javascript
/* @jsx jsxDom */

var MyLoginZoidComponent = zoid.create({
    tag: 'my-login',
    url: 'https://www.mysite.com/login',

    prerenderTemplate: function(opts) {
        return (
            <p>
                Please wait while the component loads...
            </p>
        );
    }
});
```

As with React, you are also free to skip using JSX and just use `jsxDom` directly:

```javascript
var MyLoginZoidComponent = zoid.create({
    tag: 'my-login',
    url: 'https://www.mysite.com/login',

    prerenderTemplate: function containerTemplate(opts) {
        return jsxDom('p', null, `
            Please wait while the component loads...
        `);
    }
});
```

Since `prerenderTemplate` only requires a DOM element, you're also free to manually create the element hierarchy using built-in browser methods like `opts.document.createElement`, `innerHTML` and so on.

**Note:** if using `document.createElement`, you must use `opts.document`, so the element is created using the target document of the new iframe or popup window, not the document of the parent page.

##### opts

Data automatically passed to `containerTemplate` and `prerenderTemplate`, used to help render and customize the template.

- `id`: Unique id automatically generated by zoid on render
- `props`: Props passed to the component in `render()`
- `jsxDOM`: Helper for turning JSX into a DOM element
- `document`: The document into which the generated element will be inserted.
- `container`: The element into which the generated element will be inserted
- `dimensions`: The dimensions for the component
- `tag`: Tag name of the component
- `context`: Context type of the component (`iframe` or `popup`)
- `outlet`: DOM Element into which the iframe will be inserted on render. Only applies to `containerTemplate` when rendering an iframe
- `actions`: Set of functions which can be attached to events on the generated DOM element
  - `close`: Close the component. Useful if you want to render a close button outside the component
  - `focus`: Focus the component. Valid for popup components only. Useful if you want a clickable background overlay to re-focus the popup window.
- `on`: Listen for events from the component
  - `resize`: The component window resized. Useful if you want to dynamically resize the container based on the size of the iframe.
- `CLASS`: Enum of class names which are internally used by zoid
  - `ZOID`: Class given to the container for the component
  - `OUTLET`: Class given to the outlet element
  - `COMPONENT_FRAME`: Class given to the component's iframe
  - `PRERENDER_FRAME`: Class given to the component's prerender iframe, only if `prerenderTemplate` is specified
  - `VISIBLE`: Class given to the iframe when it becomes invisible, if pre-rendering using `prerenderTemplate`
  - `INVISIBLE`: Class given to the iframe while it is invisible, if pre-rendering using `prerenderTemplate`
- `ANIMATION`: Enum of animation names that will be applied to the component as it renders and unrenders. Useful if you want to define custom css animations to display the component.
  - `SHOW_CONTAINER`: The component's container element, include it's `containerTemplate`, if provided, is displayed during a render.
  - `HIDE_CONTAINER`: The component's container element, include it's `containerTemplate`, if provided, is hidden during close.
  - `SHOW_COMPONENT`: The component element is displayed during render
  - `HIDE_COMPONENT`: The component element is hidden during render

#### defaultLogLevel `string | Object<string>`

The default logging level required for this component. Options are: 

  - `'debug'`
  - `'info'`
  - `'warn'`
  - `'error'`
  
```javascript
defaultLogLevel: 'error'
```

Note that this value can be overriden by passing 'logLevel' as a prop when rendering the component.


#### autoResize `boolean | { height: boolean, width: boolean, element: string }`

When set to `true`, makes the zoid parent iframe resize automatically when the child component size changes.
You can also decide whether you want autoresizing for `width` or `height`

```javascript
autoResize: true
```
```javascript
autoResize: {
    width: true,
    height: false,
}
```

Note that by default it matches the `html` element of your content. (`body` if you are using IE9 or IE10).
You can override this setting by specifying a custom selector as an `element` property.

```javascript
autoResize: {
    width: true,
    height: true,
    element: '.my-selector',
}
```

#### allowedParentDomains `string | Array<string | RegEx>`

A string, array of strings or reqular expresions to be used to validate parent domain. If parent domain doesn't match any item, communication from child to parent will be prevented. The default value is '*' which match any domain.
  
```javascript
allowedParentDomains: [ 
    "http://localhost",
    /^http:\/\/www\.mydomain\.com$/
  ]
```

#### buildUrl `(props) => url`

Function which can be specified instead of `url` if you need to dynamically generate the url with the user-provided props.

```javascript
buildUrl(props) {
    return `https://${ props.locale }.foo.com`;
}
```

### defaultEnv `string`

Default env to use when specifying `url` as a mapping of env to url.

```javascript
url: {
    local: 'http://localhost:8000/mycomponent',
    dev: 'http://my-dev-site.com:8000/mycomponent',
    live: 'https://my-live-site.com/mycomponent'
},

defaultEnv: 'live'
```

Note: See `url` definition for note on overriding defaultEnv.

#### domain `string | { env : string }`

A string, or map of env to strings, for the domain which will be loaded in the iframe or popup.

Only required if the domain which will be rendered is different to the domain specified in the `url` setting - for example, if the original url does a 302 redirect to a different domain or subdomain.

```javascript
url: 'https://foo.com/login',

domain: 'https://subdomain.foo.com'
```

```javascript
url: {
    local: 'https://localhost.foo.com/login',
    production: 'https://foo.com/login'
},

domain: {
    local: 'https://subdomain.localhost.foo.com',
    production: 'https://subdomain.foo.com'
}
```

#### contexts `{ context : boolean }`

Contexts to allow, between `iframe` and `popup`.

```javascript
contexts: {
    iframe: true,
    popup: false
}
```

```javascript
contexts: {
    iframe: false,
    popup: true
}
```

```javascript
contexts: {
    iframe: true,
    popup: true
}
```

### defaultContext `string`

If both `iframe` and `popup` are set to `true` in the `contexts` setting, determines which should be picked by default.

```javascript
defaultContext: 'popup'
```

### validate `(component, props) => void`

Function which is passed all of the props at once and may validate them. Useful for validating inter-dependant props.

```javascript
validate: function(component, props) {
    if (props.name === 'Batman' && props.strength < 10) {
        throw new Error(`Batman must have at least 10 strength`);
    }
}
```

#### scrolling `boolean`

Whether to allow scrolling for iframe components. Defaults to `false`.

#### bridgeUrl `string | { env : string }`

The url for a [post-robot bridge](https://github.com/krakenjs/post-robot#parent-to-popup-messaging). Will be automatically loaded in a hidden iframe when a popup component is rendered, to allow communication between the parent window and the popup in IE/Edge.

This is only necessary if you are creating a popup component which needs to run in IE and/or Edge.

```javascript
bridgeUrl: 'https://foo.com/bridge'
```

```javascript
bridgeUrl: {
    local: 'https://localhost.foo.com/bridge',
    production: 'https://foo.com/bridge'
}
```

#### bridgeDomain `string | { env : string }`

Required if the final domain of the bridge is different to that of the initial `bridgeUrl` provided - for example, if the original url does a 302 redirect to a different domain or subdomain.

```javascript
bridgeUrl: 'https://foo.com/bridge',

bridgeDomain: 'https://subdomain.foo.com'
```

```javascript
bridgeUrl: {
    local: 'https://localhost.foo.com/bridge',
    production: 'https://foo.com/bridge'
},

bridgeDomain: {
    local: 'https://subdomain.localhost.foo.com',
    production: 'https://subdomain.foo.com'
}
```

# `Component`

### `Component.render(props, container)`

Render the component to the given container element.

#### props `Object`

Object containing all of the props required by the given component

#### container `string | HTMLElement`

Element selector, or element, into which the component should be rendered.

Defaults to `document.body`.

### `Component.renderTo(win, props, container)`

Equivalent to `Component.render()` but allows rendering to a remote window. For example, a child component may render a new component to the parent page.

- The component must have been registered on the target window
- The component must be rendered from within the iframe of an existing component
- The component being rendered must have the same domain as the component initiating the render

#### win `Window`

The target window to which the component should be rendered. Ordinarily this will be `window.parent`.

### `Component.init(props, context, container)`

Shortcut to instantiate a component on a parent page, with props. Returns instance of `ParentComponent`. Does not render the component. Render the instance using `ParentComponent.render(container)`. Useful for obtaining the parent instance for inter-component operations.

#### props `Object`

Object containing all of the props required by the given component

#### context `string` (optional)

Context type of the component (`iframe`, `popup`)

#### container `string | HTMLElement`

Element selector, or element, into which the component should be rendered.

Defaults to `document.body`.

### `Component.driver(name, dependencies)`

Register a component with your framework of choice, so it can be rendered natively in your app.

#### React

```javascript
let MyReactZoidComponent = MyZoidComponent.driver('react', {
    React: React, 
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

