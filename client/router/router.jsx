import React from 'react';
import {mount} from 'react-mounter';
// load Components
import {MainLayout} from '/lib/app/components/base/MainLayout.jsx';
import {DashLayout} from '/lib/app/components/admin/dashLayout.jsx';
import {Home} from '/lib/app/components/base/Home.jsx';

FlowRouter.route('/', {
  action() {
    mount(MainLayout, {
      content: (<Home />)
    });
  },
  name: 'Home'
});

FlowRouter.route('/signup', {
  action() {
    mount(MainLayout, {
      content: (<Signup />)
    });
  },
  name: "Signup"
});

FlowRouter.route('/login', {
  name: "login",
  action() {
    mount(MainLayout, {
      content: (<Login />)
    });
  }
});

FlowRouter.route( '/verify-email/:token', {
  name: 'verify-email',
  action: function(params) {
    Accounts.verifyEmail( params.token, ( error ) => {
      if ( error ) {
        Bert.alert( error.reason, 'danger' );
      } else {
        FlowRouter.go( '/' );
        Bert.alert( 'Email verified! Thanks!', 'success' );
      }
    });
  }
});

FlowRouter.route('/edit-profile', {
  action() {
    mount(MainLayout, {
      content: (<EditProfile />)
    });
  }
});

FlowRouter.route('/profile/:username', {
  name: 'publicProfile',
  action: function(params) {
    mount(MainLayout, {
      content: (<Profile username={params.username} />)
    });
  }
});


// Forums
FlowRouter.route('/forums', {
  action() {
    mount(MainLayout, {
      content: (<Forums />)
    });
  },
  name: "forums",
});

FlowRouter.route('/forums/:_id', {
  name: "PostPage",
  action: function(params) {
    mount(MainLayout, {
      content: (<PostPage _id={params._id} />)
    });
  }
});

FlowRouter.route('/forums/c/:category', {
  name: "CategoryPage",
  action: function( params ) {
    mount(MainLayout, {
      content: (<CategoryPage title={ params.category } />)
    });
  }
});

// games

FlowRouter.route('/games/:slug', {
  name: "GamesPage",
  action: function( params ) {
    mount(MainLayout, {
      content: (<GamesPage slug={ params.slug } />)
    });
  }
});

// Dashboard
FlowRouter.route('/dashboard', {
  name: "dashboard",
  action() {
    mount(DashLayout, {
      content: (<Dashboard />)
    });
  }
});

FlowRouter.route('/dashboard/forums', {
  name: "ForumsDashboard",
  action() {
    mount(DashLayout, {
      content: (<ForumsDash />)
    });
  }
});

FlowRouter.route('/dashboard/users', {
  name: "UsersDashboard",
  action() {
    mount(DashLayout, {
      content: (<UsersDash />)
    });
  }
});

FlowRouter.route('/dashboard/games', {
  name: "ServersDashboard",
  action() {
    mount(DashLayout, {
      content: (<ServerList />)
    });
  }
});

FlowRouter.route('/dashboard/users/edit/:username', {
  name: "EditUsersDashboard",
  action: function(params) {
    mount(DashLayout, {
      content: (<EditUser username={ params.username } />)
    });
  }
});

// Not found route
FlowRouter.notFound = {
  action() {
    mount(MainLayout, {
      content: (<NotFound />)
    });
  }
};
