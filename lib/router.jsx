FlowRouter.route('/', {
  action(params) {
    const containerElement = document.getElementById("react-root");
    ReactLayout.render( App );
  }
});

FlowRouter.route('/login', {
  name: "login",
  action() {
    ReactLayout.render( App, { content: <Login /> });
  }
});

FlowRouter.route('/forums', {
  name: "forums",
  action() {
    ReactLayout.render( App, { content: <Forums /> });
  }
});
