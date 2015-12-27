FlowRouter.route('/', {
  action() {
    ReactLayout.render(App);
  },
  fastRender: true
});

FlowRouter.route('/login', {
  action(params) {
    ReactLayout.render(Login);
  },
  fastRender: true
});
