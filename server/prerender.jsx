// Use Prerender with your token
var prerenderio = Npm.require('prerender-node').set('prerenderToken', 'Bol8gFxdjMI4yfitVNou');
// Feed it to middleware! (app.use)
WebApp.connectHandlers.use(prerenderio);
