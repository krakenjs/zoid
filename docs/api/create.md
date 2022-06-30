# Create new component

```javascript
zoid.create({ ...options });
```

Create a component definition, which will be loaded in both the parent and child windows.

## tag `string` [required]

A tag-name for the component, used for:

- Loading the correct component in the child window or frame
- Generating framework drivers
- Logging

```javascript
const MyComponent = zoid.create({
    tag: 'my-component-tag',
    ...
});
```

## url `string | ({ props }) => string` [required]

The full url that will be loaded when your component is rendered, or a function returning the url.

This must include a protocol (http:, https:, or about:); it cannot be scheme-relative.

```javascript
const MyComponent = zoid.create({
  tag: "my-component",
  url: "https://my-site.com/my-component",
});

url: "https://www.my-site.com/mycomponent";
```

```javascript
const MyComponent = zoid.create({
    tag: 'my-component',
    url: ({ props }) => {
        return (props.env === 'development')
            ? 'http://dev.my-site.com/mycomponent'
            : 'https://www.my-site.com/mycomponent';
});
```

## dimensions `{ width : string, height : string }`

The dimensions for your component, in css-style units, with support for `px` or `%`.

```javascript
const MyComponent = zoid.create({
  tag: "my-component",
  url: "https://my-site.com/my-component",
  dimensions: {
    width: "300px",
    height: "200px",
  },
});
```

```javascript
const MyComponent = zoid.create({
  tag: "my-component",
  url: "https://my-site.com/my-component",
  dimensions: {
    width: "80%",
    height: "90%",
  },
});
```

## props `{ [string] : PropDefinition }`

A mapping of prop name to prop settings. Helpful for setting default values, decorating values, adding props to the query string of your component url, and more.

Note: you are not required to create a prop definition for each new prop. By default, anything passed in as a prop when instantiating your component, will be automatically passed to the child window in `window.xprops`.

```javascript
const MyComponent = zoid.create({
  tag: "my-component",
  url: "https://my-site.com/my-component",

  props: {
    onLogin: {
      type: "function",
    },

    prefilledEmail: {
      type: "string",
      required: false,
    },
  },
});
```

See [Prop Definitions](./prop-definitions.md) for all options which can be passed to prop definitions.

## containerTemplate `(opts) => HTMLElement`

A function which should return a DOM element, rendered on the parent page and containing the iframe element (or rendered behind the popup window).

zoid will pass `opts.frame` and `opts.prerenderFrame` to this function, which is a pre-generated element your component will be rendered into. These must be inserted somewhere into the DOM element you return, for frame-based components

The `opts` parameter is [the same](#opts) as the parameter used in `prerenderTemplate`

Best used with [jsx-pragmatic](https://github.com/krakenjs/jsx-pragmatic). You can use [babel](https://babeljs.io/docs/plugins/transform-react-jsx/) with a `/* @jsx node */` comment, to transpile the jsx down to regular javascript.

```javascript
/* @jsx node */

import { node, dom } from "jsx-pragmatic";

var MyLoginZoidComponent = zoid.create({
  tag: "my-login",
  url: "https://www.mysite.com/login",

  containerTemplate: function ({ uid, doc, frame, prerenderFrame }) {
    return (
      <div id={uid} class="container">
        <style>
          {`
                        #${uid}.container {
                            border: 5px solid red;
                        }
                    `}
        </style>

        <node el={frame} />
        <node el={prerenderFrame} />
      </div>
    ).render(dom({ doc }));
  },
});
```

As with React, you are also free to skip using JSX and just use `node` from `jsx-pragmatic` directly:

```javascript
import { node, dom } from "jsx-pragmatic";

var MyLoginZoidComponent = zoid.create({
  tag: "my-login",
  url: "https://www.mysite.com/login",

  containerTemplate: function containerTemplate({
    uid,
    doc,
    frame,
    prerenderFrame,
  }) {
    return node(
      "div",
      { id: uid, class: "container" },
      node(
        "style",
        null,
        `
                #${uid}.container {
                    border: 5px solid red;
                }
            `
      ),
      node("node", { el: frame }),
      node("node", { el: prerenderFrame })
    ).render(dom({ doc }));
  },
});
```

Since `containerTemplate` requires a DOM element to be returned, you're also free to manually create the element hierarchy using built-in browser methods like `doc.createElement`:

```javascript
import { node, dom } from "jsx-pragmatic";

var MyLoginZoidComponent = zoid.create({
  tag: "my-login",
  url: "https://www.mysite.com/login",

  containerTemplate: function containerTemplate({
    doc,
    uid,
    frame,
    prerenderFrame,
  }) {
    let container = doc.createElement("div");
    container.id = uid;
    container.appendChild(frame);
    container.appendChild(prerenderFrame);
    return container;
  },
});
```

If no `containerTemplate` function is defined, then a default is used. The default template can be found [here](https://github.com/krakenjs/zoid/blob/main/src/component/templates/container.js).

## prerenderTemplate `(opts) => HTMLElement`

A function which should return a DOM element, rendered in place of the iframe element, or inside the popup window, as it loads.

Useful if you want to display a loading spinner or pre-render some content as the component loads.

Best used with [jsx-pragmatic](https://github.com/krakenjs/jsx-pragmatic). You can use [babel](https://babeljs.io/docs/plugins/transform-react-jsx/) with a `/* @jsx node */` comment, to transpile the jsx down to regular javascript.

```javascript
/* @jsx node */

import { node, dom } from "jsx-pragmatic";

var MyLoginZoidComponent = zoid.create({
  tag: "my-login",
  url: "https://www.mysite.com/login",

  prerenderTemplate: function ({ doc }) {
    return (<p>Please wait while the component loads...</p>).render(
      dom({ doc })
    );
  },
});
```

As with React, you are also free to skip using JSX and just use `node` directly:

```javascript
import { node, dom } from "jsx-pragmatic";

var MyLoginZoidComponent = zoid.create({
  tag: "my-login",
  url: "https://www.mysite.com/login",

  prerenderTemplate: function containerTemplate({ doc }) {
    return node(
      "p",
      null,
      `
            Please wait while the component loads...
        `
    ).render(dom({ doc }));
  },
});
```

Since `prerenderTemplate` only requires a DOM element, you're also free to manually create the element hierarchy using built-in browser methods like `doc.createElement`.

**Note:** if you're using `document` method, you must use the `doc` passed to `prerenderTemplate`, so the element is created using the target document of the new iframe or popup window, **not** the document of the parent page. This is essential for browser compatibility.

```javascript
import { node, dom } from "jsx-pragmatic";

var MyLoginZoidComponent = zoid.create({
  tag: "my-login",
  url: "https://www.mysite.com/login",

  prerenderTemplate: function containerTemplate({ doc }) {
    const p = doc.createElement("p");
    p.innerText = "Please wait while the component loads...";
    return p;
  },
});
```

### opts

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

### Listening to zoid events

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

## autoResize `{ height: boolean, width: boolean, element: string }`

Makes the iframe resize automatically when the child window size changes.

```javascript
const MyComponent = zoid.create({
  tag: "my-component",
  url: "https://my-site.com/my-component",
  autoResize: {
    width: false,
    height: true,
  },
});
```

Note that by default it matches the `body` element of your content.
You can override this setting by specifying a custom selector as an `element` property.

```javascript
const MyComponent = zoid.create({
  tag: "my-component",
  url: "https://my-site.com/my-component",
  autoResize: {
    width: false,
    height: true,
    element: ".my-selector",
  },
});
```

Recommended to only use autoResize for height. Width has some strange effects, especially when scroll bars are present.

## allowedParentDomains `string | Array<string | RegEx>`

A string, array of strings or reqular expresions to be used to validate parent domain. If parent domain doesn't match any item, communication from child to parent will be prevented. The default value is '\*' which match any domain.

```javascript
const MyComponent = zoid.create({
  tag: "my-component",
  url: "https://my-site.com/my-component",
  allowedParentDomains: ["http://localhost", /^http:\/\/www\.mydomain\.com$/],
});
```

## domain `string`

A string, or map of env to strings, for the domain which will be loaded in the iframe or popup.

Only required if the domain which will be rendered is different to the domain specified in the `url` setting - for example, if the original url does a 302 redirect to a different domain or subdomain.

```javascript
const MyComponent = zoid.create({
  tag: "my-component",
  url: "https://foo.com/login",
  domain: "https://subdomain.foo.com",
});
```

## defaultContext `string`

Determines which should be picked by default when `render()` is called. Defaults to `iframe`.

```javascript
const MyComponent = zoid.create({
  tag: "my-component",
  url: "https://my-site.com/my-component",
  defaultContext: "popup",
});
```

## validate `({ props }) => void`

Function which is passed all of the props at once and may validate them. Useful for validating inter-dependant props.

```javascript
const MyComponent = zoid.create({
  tag: "my-component",
  url: "https://my-site.com/my-component",
  validate: function ({ props }) {
    if (props.name === "Batman" && props.strength < 10) {
      throw new Error(`Batman must have at least 10 strength`);
    }
  },
});
```

## eligible `({ props : { [string] : any } }) => boolean`

Function which determines if the component is eligible to be rendered.

```javascript
const FirefoxOnlyButton = zoid.create({
  tag: "my-component",
  url: "https://my-site.com/my-component",
  eligible: () => {
    if (isFireFox()) {
      return true;
    } else {
      return false;
    }
  },
});
```

Now anyone can check eligibility prior to rendering the component:

```javascript
const myComponent = MyComponent();

if (myComponent.isEligible()) {
  myComponent.render("#my-container");
}
```

If the component is not eligible, calling `.render(...)` will return a rejected promise:

const myComponent = MyComponent();

myComponent.render('#my-container').catch(err => {
console.error(err); // This will happen if we're not in firefox
});

## exports `{ [string] : ExportDefinition }`

## exports `({ getExports : () => Promise<{ [string] : any }> }) => { [string] : Promise<any> }`

Used to map exports from the child (passed with `xprops.export(...)`) to properties on the parent component instance.

```javascript
const CreatePostForm = zoid.create({
  tag: "create-post-form",
  url: "https://my-site.com/component/create-post-form",

  exports: {
    submit: {
      type: "function",
    },
  },
});
```

Once this mapper is defined, the child window may export values up to the parent:

```javascript
window.xprops.export({
  submit: () => {
    document.querySelector("form#createPost").submit();
  },
});
```

The parent window may call these exports at any time:

```javascript
const postForm = CreatePostForm();
postForm.render("#create-post-form-container");

document.querySelector("button#submitForm").addEventListener("click", () => {
  postForm.submit();
});
```

## bridgeUrl `string | ({ props }) => string`

The url or a function returning the url for a [post-robot bridge](https://github.com/krakenjs/post-robot#parent-to-popup-messaging). Will be automatically loaded in a hidden iframe when a popup component is rendered, to allow communication between the parent window and the popup in IE/Edge.

This is only necessary if you are creating a popup component which needs to run in IE and/or Edge.

```javascript
const MyComponent = zoid.create({
  tag: "my-component",
  url: "https://my-site.com/my-component",
  bridgeUrl: "https://foo.com/bridge",
});
```

```javascript
const MyComponent = zoid.create({
  tag: "my-component",
  url: "https://my-site.com/my-component",
  bridgeUrl: ({ props }) => {
    return props.env === "development"
      ? "http://foo.dev/bridge"
      : "https://foo.com/bridge";
  },
});
```

## exports `({ getExports : () => Promise<{ [string] : any }> }) => { [string] : Promise<any> }`

Used to map exports from the child (passed with `xprops.export(...)`) to properties on the parent component instance.

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
    document.querySelector("form#createPost").submit();
  },
});
```

The parent window may call these exports at any time:

```javascript
const postForm = CreatePostForm();
postForm.render("#create-post-form-container");

document.querySelector("button#submitForm").addEventListener("click", () => {
  postForm.submit();
});
```

## children `() => { [string] : ZoidComponent }`

Set up components which will be renderable as children of the current component

```javascript
const CardNumberField = zoid.create({
    tag: 'card-number-field',
    url: 'https://my-site.com/component/card-fields/number'
});

const CardCVVField = zoid.create({
    tag: 'card-cvv-field',
    url: 'https://my-site.com/component/card-fields/cvv'
});

const CardExpiryField = zoid.create({
    tag: 'card-expiry-field',
    url: 'https://my-site.com/component/card-fields/expiry'
});

const CardFields = zoid.create({
    tag: 'card-fields',
    url: 'https://my-site.com/component/card-fields',

    children: () => {
        return {
            NumberField: CardNumberField,
            CVVField: CardCVVField,
            ExpiryField: CardExpiryField
        };
    };
});
```

These children will now be renderable as children of the parent:

```javascript
const cardFields = CardFields({
  style: {
    borderColor: "red",
  },
});

cardFields.NumberField().render("#card-number-field-container");
cardFields.CVVField().render("#card-cvv-field-container");
cardFields.ExpiryField().render("#card-expiry-field-container");
```

The children will inherit both `props` and `export` from the parent, in `window.xprops.parent`.

```javascript
console.log("Parent style:", window.xprops.parent.style);
```

```javascript
window.xprops.parent.export({
  submit: () => {
    document.querySelector("form#cardFields").submit();
  },
});
```
