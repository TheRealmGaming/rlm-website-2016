Meteor.methods({
  addRole: function() {
    console.log("User added as Trial!");
    Roles.addUsersToRoles( Meteor.user(), ['Trial'] );
  }
});
