# Render

## Basic Render (same window)

```javacript
Component(props).render(container, ?context)
```

Render the component to the given container element.

### props `{ [string] : any }`

Object containing all of the props required by the given component. These can be user-defined props, or pre-defined built-in props.

```javascript
MyComponent({
    foo: 'bar',
    onBaz: () => {
        console.log('Baz happened');
    }
}).render('#container');
```

See [Parent Props](./parent-props.md) for built-in props that can be passed to any zoid component.

### container `string | HTMLElement`

Element selector, or element, into which the component should be rendered.

Defaults to `document.body`.

### context `iframe | popup`

The context to render to. Defaults to `defaultContext`, or if `defaultContext` is not set, `iframe`.

## Remote render (different window)

```javascript
Component(props).renderTo(win, container, ?context)
```

Equivalent to `Component().render()` but allows rendering to a remote window. For example, a child component may render a new component to the parent page.

- The component must have been registered on the target window
- The component must be rendered from within the iframe of an existing component
- The component being rendered must have the same domain as the component initiating the render

### win `Window`

The target window to which the component should be rendered. Ordinarily this will be `window.parent`.

### props `{ [string] : any }`

Object containing all of the props required by the given component

### container `string`

Element selector, into which the component should be rendered. Must be a string for remote rendering

Defaults to `document.body`.

### context `iframe | popup`

The context to render to. Defaults to `defaultContext`, or if `defaultContext` is not set, `iframe`.