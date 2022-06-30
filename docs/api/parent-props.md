# Parent Props

## window `Window | ProxyWindow`

Pass in a custom window to render the zoid component to. Passing this option will suppress zoid from opening a new window.

This value can also be a `ProxyWindow` type (a window serialized by `post-robot` which can be transferred via post message).

```javascript
document.querySelector("button#clickme").addEventListener("click", () => {
  const customPopup = window.open();
  MyComponent({
    window: customPopup,
  }).render();
});
```

## timeout `number`

A timeout after which a component render should fail/error out.

```javascript
MyComponent({
  timeout: 1000,
})
  .render("#container")
  .catch((err) => {
    console.warn("Component render errored", err); // This could be a timeout error
  });
```

## cspNonce `string`

A CSP nonce that will be passed to any inline `script` or `style` tags rendered by zoid in the default `containerTemplate` or `prerenderTemplate` functions.

```javascript
MyComponent({
  cspNonce: "xyz12345",
}).render("#container");
```

## onRender `() => void`

Called immediately when a render is triggered

```javascript
MyComponent({
  onRender: () => {
    console.log("The component started to render!");
  },
}).render("#container");
```

## onDisplay `() => void`

Called when the component has completed its initial prerender

```javascript
MyComponent({
  onDisplay: () => {
    console.log("The component was displayed!");
  },
}).render("#container");
```

## onRendered `() => void`

Called when the component has completed its full render

```javascript
MyComponent({
  onRendered: () => {
    console.log("The component was fully rendered!");
  },
}).render("#container");
```

## onClose `() => void`

Called when the component is first closed

```javascript
MyComponent({
  onClose: () => {
    console.log("The component was closed!");
  },
}).render("#container");
```

## onDestroy `() => void`

Called when the component is fully destroyed

```javascript
MyComponent({
  onDestroy: () => {
    console.log("The component was fully destroyed!");
  },
}).render("#container");
```

## onResize `() => void`

Called when the component is resized

```javascript
MyComponent({
  onResize: () => {
    console.log("The component was resized!");
  },
}).render("#container");
```

## onFocus `() => void`

Called when the component is focused

```javascript
MyComponent({
  onFocus: () => {
    console.log("The component was focused!");
  },
}).render("#container");
```
