import React from 'react';

  Bio = React.createClass({
    mixins: [ReactMeteorData],

    getMeteorData() {
      var username = Meteor.user().username;
      return {
        currentUser: Profiles.findOne({ username: username })
      }
    },

    handleChange: function(event) {
      this.setState({value: event.target.value});
    },

    bioSubmit(event) {
      event.preventDefault();

      bio = {
        user: this.data.currentUser._id,
        bioInput: document.getElementById( "bio-field" ).value
      }

      Meteor.call('updateBio', bio);
      Bert.alert({title: 'Bio updated', type: 'success', style: 'growl-top-right', icon: 'fa-check'});
    },

    render: function() {
      var bioStyle = {
        height: '160px'
      }
      return (
        <form onSubmit={this.bioSubmit}>
          <div className="form-group bio-field">
            <h3>Bio</h3>
            <textarea className="form-control sharp fast-trans" id="bio-field" style={ bioStyle } defaultValue={ this.data.currentUser.bio } onChange={ this.handleChange }></textarea>
          </div>
          <button type="submit" className="btn btn-primary sharp">Update Bio</button>
          <hr></hr>
        </form>
      )
    }
  });
