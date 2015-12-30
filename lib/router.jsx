FlowRouter.route('/', {
  action(params) {
    const containerElement = document.getElementById("react-root");
    ReactLayout.render( App );
  }
});

FlowRouter.route('/login', {
  name: "login",
  action() {
    ReactLayout.render( App, { yield: <Login /> });
  }
});
