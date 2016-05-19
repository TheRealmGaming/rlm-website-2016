import React from 'react';

export const AppHeader = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {
    Meteor.subscribe("servers");
    return {
      servers: Servers.find({}, {sort: {title: 1}}).fetch(),
      currentUser: Meteor.user()
    }
  },

  getInitialState: function() {
    return {
      transform: 'navbar navbar-inverse navbar-fixed-top trans'
    };
  },

  componentDidMount() {
    var linkInfo = {rel: "icon", type: "image/png", href: "cropped-realm-final-r-192x192.png"};
    DocHead.addLink(linkInfo);
  },

  ifAdmin() {
    if(Roles.userIsInRole(Meteor.userId(), 'Admin')) {
      return <li><a href="/dashboard">Dashboard</a></li>;
    }
  },

  handleLogout() {
    Meteor.logout();
    FlowRouter.go("/login");
  },

  render() {
    let { currentUser } = this.data;

    if (currentUser) {
      loggedIn = (
        <ul className="nav navbar-nav">
          <li><a href="/forums">Forums</a></li>
          <li className="dropdown">
            <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Games <span className="caret"></span></a>
            <ul className="dropdown-menu">
              <ServerMenu servers={this.data.servers} />
            </ul>
          </li>
        </ul>
      )
    }
    else {
      loggedIn = (
        <ul className="nav navbar-nav">
          <li className="dropdown">
            <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Games <span className="caret"></span></a>
            <ul className="dropdown-menu">
              <ServerMenu servers={this.data.servers} />
            </ul>
          </li>
        </ul>
      )
    }

    if (currentUser) {
      loginButton = (
        <ul className="nav navbar-nav navbar-right">
          <li className="dropdown">
          <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{currentUser.username} <span className="caret"></span></a>
          <ul className="dropdown-menu">
            { this.ifAdmin() }
            <li><a href="/edit-profile">Edit Profile</a></li>
            <li role="separator" className="divider"></li>
            <li><a href="" onClick={this.handleLogout}><i className="fa fa-sign-out"></i> Logout</a></li>
          </ul>
        </li>
        </ul>
      )
    }
    else {
      loginButton = (
        <ul className="nav navbar-nav navbar-right">
          <li><a href="/login">Login</a></li>
          <li><a href="/signup">Sign Up</a></li>
        </ul>
      )
    }

    return (
      <nav className="navbar navbar-inverse navbar-fixed-top trans">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="/"><img src="https://s3-eu-west-1.amazonaws.com/the-realm-ireland/assets/rlm-med.png" /></a>
          </div>
            { loggedIn }
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            { loginButton }
          </div>
        </div>
      </nav>
    );
  }
});
