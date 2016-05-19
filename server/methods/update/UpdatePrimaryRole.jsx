Meteor.methods({
  UpdatePrimaryRole( role ) {
    user = Meteor.users.findOne({ username: role.username });
    userId = user._id;
    Profiles.update({ username: role.username }, {$set: { roles: role.roles } });
    Roles.removeUsersFromRoles( userId, role.currentRole );
    Roles.addUsersToRoles( userId, role.roles );
  }
});
