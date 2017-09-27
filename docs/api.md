xcomponent api
--------------

## `xcomponent.create({ ...options })`

Create a component definition, which will be loaded in both the parent and child windows.

### options

#### tag `string` [required]

A tag-name for the component, used for:

- Logging
- Auto-generating an angular directive

```javascript
tag: 'my-component-tag'
```

#### url `string | Object<string>` [required]

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

#### autoResize `boolean`

When set to `true`, makes the xcomponent parent iframe resize automatically when the child component size changes

```javascript
dimensions: {
    width: '300px',
    height: '200px'
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

- **def** `function()`

  A function returning the default value for the prop, if none is passed

- **childDef** `any`

  A function returning the default value for the prop, if none is passed, but called in the child window

- **validate** `function(value, props)`

  A function to validate the passed value. Should throw an appopriate error if invalid.

- **queryParam** `boolean | string`

  Should a prop be passed in the url. If a string, this specifies the url param name which will be used.

- **value** `any`

  The value for the prop, if it should be statically defined at component creation time

- **decorate** `function(value)`

  A function used to decorate the prop at render-time. Called with the value of the prop, should return the new value.

- **promisify** `boolean`

  Should a function prop be turned into a promise-returning function

- **noop** `boolean`

  Should a function prop default to noop

- **once** `boolean`

  Should a function prop be turned into a one-time function

- **memoize** `boolean`

  Should a function prop be turned into a memoizing function

- **serialization** `string`

  If `'json'`, the prop will be JSON stringified before being inserted into the url, otherwise the prop will be converted to dot-notation.

- **alias** `string`

  An aliased name for the prop
