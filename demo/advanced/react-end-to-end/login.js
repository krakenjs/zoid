window.LoginZoidComponent = zoid.create({
  // The html tag used to render my component

  tag: "my-login-component",

  // The url that will be loaded in the iframe or popup, when someone includes my component on their page

  url: new URL("login.htm", window.location.href).href,
});
