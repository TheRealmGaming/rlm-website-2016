import React from 'react';

AddMedia = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    var username = Meteor.user().username;
    return {
      currentUser: Profiles.findOne({ username: username })
    }
  },

  submitYoutube(event) {
    event.preventDefault();

    social = {
      username: Meteor.user().username,
      user: this.data.currentUser._id,
      youtube: event.target.youtube.value,
      twitch: event.target.twitch.value
    }

    Meteor.call('addMedia', social);
    Bert.alert({title: 'Social Accounts Updated', type: 'success', style: 'growl-top-right', icon: 'fa-check'});

  },

  handleChange: function(event) {
    this.setState({value: event.target.value});
  },

  render() {
    return (
      <form onSubmit={ this.submitYoutube }>
        <h3>Social Accounts</h3>
        <div className="form-group">
          <input type="text" className="form-control" name="youtube" defaultValue={ this.data.currentUser.youtube } onChange={ this.handleChange } placeholder="Youtube Channel URL. Eg: https://www.youtube.com/user/TheRealmVids" />
        </div>
        <div className="form-group">
          <input type="text" className="form-control" name="twitch" defaultValue={ this.data.currentUser.twitch } onChange={ this.handleChange } placeholder="Twitch Channel URL. Eg: http://www.twitch.tv/therealmgaming" />
        </div>
        <button type="submit" className="btn btn-primary sharp">Submit</button>
      </form>
    )
  }
});
