FlowRouter.route('/', {
  action() {
    ReactLayout.render(App);
  },
  fastRender: true
});
