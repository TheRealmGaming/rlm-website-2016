function renderMainLayoutWith(component) {
  ReactLayout.render(MainLayout, {
    header: <AppHeader />,
    content: component,
    footer: <AppFooter />
  });
}

FlowRouter.route('/', {
  name: "Home",
  action(params) {
    renderMainLayoutWith(<Home />);
  }
});

FlowRouter.route('/signup', {
  name: "Signup",
  action(params) {
    renderMainLayoutWith(<Signup />);
  }
});

FlowRouter.route('/login', {
  name: "login",
  action() {
    renderMainLayoutWith(<Login />);
  }
});

FlowRouter.route('/edit-profile', {
  action(params) {
    renderMainLayoutWith(<EditProfile />);
  }
});

FlowRouter.route('/forums', {
  name: "forums",
  action() {
    renderMainLayoutWith(<Forums />);
  },
  fastRender: true
});

// Not found route
FlowRouter.notFound = {
  action: function() {
    renderMainLayoutWith(<NotFound />);
  }
};
