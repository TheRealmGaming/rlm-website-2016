Meteor.methods ({
  deleteUsers: function(username) {
    Profiles.remove({ username: username });
    Meteor.users.remove({ username: username });
  }
});
