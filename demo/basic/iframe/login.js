
window.MyLoginXComponent = xcomponent.create({

    // The html tag used to render my component

    tag: 'my-login-component',

    // The url that will be loaded in the iframe or popup, when someone includes my component on their page

    url: xcomponent.getCurrentScriptDir() + '/login.htm'
	
});
