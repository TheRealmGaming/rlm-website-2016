import React from 'react';

UsersDash = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    Meteor.subscribe("users");
    Meteor.subscribe("profiles");
    return {
      loggedIn: Meteor.userId(),
      users: Meteor.users.find({}, {sort: { username: 1 }}).fetch(),
      profiles: Profiles.find({}, {sort: { username: 1}}).fetch()
    }
  },

  componentDidMount() {
    var title = "Users Dashboard | The Realm Gaming";
    DocHead.setTitle(title);
  },

  render() {
    if(!Roles.userIsInRole(this.data.loggedIn, 'Admin')) {
      Bert.alert({title: 'Not an admin', type: 'danger', style: 'growl-top-right', icon: 'fa-exclamation'});
      FlowRouter.go('/');
    }
    return (
      <div className="right-content-area">
          <div className="container-fluid">
            <GridRow>
              <GridColumn className="col-md-12 col-sm-12">
                <h1 className="text-center">Users</h1>
              </GridColumn>
              <GridColumn className="col-md-12 col-sm-12">
                <Users users={ this.data.profiles } />
              </GridColumn>
            </GridRow>
          </div>
      </div>
    )
  }
});
