import React from 'react';

UserList = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    Meteor.subscribe("profiles");
    return {
      profiles: Profiles.find().fetch()
    }
  },

  deleteUser: function(event, username) {
    event.preventDefault();

    Meteor.call('deleteUsers', username, (error, result) => {
      if (!error) {
        Bert.alert({title: "User Deleted", type: 'success', icon: 'fa-check', style: 'growl-top-right'});
      }
    });
  },

  showSecondary() {
    var userProfile = Profiles.findOne({ username: this.props.users.username });
    return userProfile.secondary;
  },

  showCreated() {
    var userProfile = Profiles.findOne({ username: this.props.users.username });
    var dateString = moment.unix( userProfile.createdAt / 1000).format("DD/MM/YYYY");
    return dateString;
  },

  render() {
    if( !this.props.users.roles ) {
      primary = 'None';
    } else {
      primary = this.props.users.roles;
    }

    editUserLink = '/dashboard/users/edit/' + this.props.users.username;
    return (
      <tr>
        <td colSpan="6" className="trans">
          { this.props.users.username }
        </td>
        <td colSpan="2" className="trans">
          { primary }
        </td>
        <td colSpan="2" className="trans">
          { this.showSecondary() }
        </td>
        <td colSpan="2" className="trans">
          { this.showCreated() }
        </td>
        <td colSpan="1">
          <a className="editeuser text-center" href={ editUserLink }><i className="fa fa-pencil"></i></a>
        </td>
        <td colSpan="1">
          <a className="deleteuser text-center" href="" onClick={ e => this.deleteUser(e, this.props.users.username) }><i className="fa fa-times"></i></a>
        </td>
      </tr>
    );
  }
});
