import React from 'react';

Dashboard = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    Meteor.subscribe("profiles");
    Meteor.subscribe("posts");
    Meteor.subscribe("replies");
    return {
      loggedIn: Meteor.userId(),
      profiles: Profiles.find().fetch().length,
      posts: Posts.find().fetch().length,
      replies: Replies.find().fetch().length
    }
  },

  componentDidMount() {
    var title = "Dashboard | The Realm Gaming";
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
            <div className="row">
              <div className="col-md-6">
                <div className="card cut-out">
                  <h3>Members</h3>
                  <h1>{ this.data.profiles }</h1>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card cut-out">
                  <h3>Forum Posts</h3>
                  <h1>{ this.data.posts }</h1>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="card cut-out">
                  <h3>Forum Replies</h3>
                  <h1>{ this.data.replies }</h1>
                </div>
              </div>
              <div className="col-md-6">
              </div>
            </div>
          </div>
      </div>
    )
  }
});
