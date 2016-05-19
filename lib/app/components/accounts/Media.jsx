import React from 'react';

Media = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    var username = Meteor.user().username;
    return {
      currentUser: Profiles.findOne({ username: username })
    }
  },

  mediaSubmit(event) {

  },

  render() {
    return (
      <form onSubmit={ this.mediaSubmit }>

      </form>
    )
  }
});
