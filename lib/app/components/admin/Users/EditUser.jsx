import React from 'react';

EditUser = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    Meteor.subscribe("profiles");
    return {
      userProfile: Profiles.findOne({ username: this.props.username })
    }
  },

  updateRole(event) {
    event.preventDefault();

    primary = {
      roles: event.target.role.value,
      currentRole: this.data.userProfile.roles,
      username: this.data.userProfile.username
    }

    role = event.target.role.value;

    if(role == '...') {
      Bert.alert({title: "Cannot update role", type: 'danger', style: 'growl-top-right'});
    } else {
      Meteor.call('UpdatePrimaryRole', primary);
      Bert.alert({title: "Role Updated", type: 'success', icon: 'fa-check', style: 'growl-top-right'});
    }
  },

  updateSecondary(event) {
    event.preventDefault();

    secondary = {
      roles: event.target.secondary.value,
      currentRole: this.data.userProfile.secondary,
      username: this.data.userProfile.username
    }

    role = event.target.secondary.value;

    if(role == '...') {
      Bert.alert({title: "Cannot update role", type: 'danger', style: 'growl-top-right'});
    } else {
      Meteor.call('UpdateSecondaryRole', secondary);
      Bert.alert({title: "Secondary Role Updated", type: 'success', icon: 'fa-check', style: 'growl-top-right'});
    }
  },

  updateUsername(event) {
    event.preventDefault();

    user = {
      newUsername: event.target.upUsername.value,
      username: this.data.userProfile.username
    }

    newUsername = event.target.upUsername.value;

    if(!newUsername) {
      Bert.alert({title: "Cannot update Username", type: 'danger', style: 'growl-top-right'});
    } else {
      Meteor.call('UpdateUsername', user);
      Bert.alert({title: "Username Updated", type: 'success', icon: 'fa-check', style: 'growl-top-right'});
      FlowRouter.go('/dashboard/users/');
    }
  },

  componentDidMount() {
    var title = "Edit " + this.data.userProfile.username + " | The Realm Gaming";
    DocHead.setTitle(title);
  },

  render() {
    if( this.data.userProfile.roles == 'Admin' ) {
      color = 'green';
    } else if( this.data.userProfile.roles == 'Trial' ) {
      color = 'red';
    } else if( this.data.userProfile.roles == 'Member' ) {
      color = 'blue';
    }
    return(
      <div className="right-content-area">
        <div className="container-fluid">
          <GridRow>
            <GridColumn className="col-md-12">
              <h1 className="text-center">Edit { this.data.userProfile.username }</h1>
            </GridColumn>
            <GridColumn className="col-md-12 top-buffer">
              <GridRow>
                <GridColumn className="col-md-4">
                  <form onSubmit={ this.updateUsername }>
                    <div className="form-group">
                      <label htmlFor="upUsername">Username:</label>
                      <input type="text" className="form-control" name="upUsername" />
                    </div>
                    <div className="form-group">
                      <PrimaryButton label="Update Username" />
                    </div>
                  </form>
                </GridColumn>
                <GridColumn className="col-md-4">
                  <form onSubmit={ this.updateRole }>
                    <div className="form-group">
                      <label htmlFor="role">Primary Role: (Current is { this.data.userProfile.roles })</label>
                      <select className="form-control" name="role">
                        <option>...</option>
                        <option value="Admin">Admin</option>
                        <option value="Member">Member</option>
                        <option value="Trial">Trial</option>
                        <option value="Guest">Guest</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <PrimaryButton label="Update Role" />
                    </div>
                  </form>
                </GridColumn>
                <GridColumn className="col-md-4">
                  <form onSubmit={ this.updateSecondary }>
                    <div className="form-group">
                      <label htmlFor="secondary">Secondary Role:</label>
                      <select className="form-control" name="secondary">
                        <option>...</option>
                        <option value="Moderator">Moderator</option>
                        <option value="Helper">Helper</option>
                        <option value="None">None</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <PrimaryButton label="Update Role" />
                    </div>
                  </form>
                </GridColumn>
                <GridColumn className="col-md-4">
                </GridColumn>
              </GridRow>
            </GridColumn>
          </GridRow>
        </div>
      </div>
    )
  }
});
