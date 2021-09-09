# Prop Definitions

## type `string`

  The data-type expected for the prop

  - `'string'`
  - `'number'`
  - `'boolean'`
  - `'object'`
  - `'function'`
  - `'array'`

## required `boolean`

  Whether or not the prop is mandatory. Defaults to `true`.

  ```javascript
  onLogin: {
      type: 'function',
      required: false
  }
  ```

## default `({ props }) => value`

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

## validate `({ value, props }) => void`

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

## queryParam `boolean | string | (value) => string`

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

## value `({ props }) => value`

  The value for the prop, if it should be statically defined at component creation time

  ```javascript
  userAgent: {
      type: 'string',
      value() {
          return window.navigator.userAgent;
      }
  }
  ```

## decorate `({ value, props }) => value`

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

## serialization `string`

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

## alias `string`

  An aliased name for the prop

  ```javascript
  onLogin: {
      type: 'function',
      alias: 'onUserLogin'
  }
  ```