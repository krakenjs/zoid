window.MyLoginButtonComponent = zoid.create({
  // The html tag used to render my component

  tag: "my-login-button-component",

  // The url that will be loaded in the iframe or popup, when someone includes my component on their page

  url: new URL("login-button.htm", window.location.href).href,

  // The size of the component on their page

  dimensions: {
    width: "250px",
    height: "100px",
  },
});
