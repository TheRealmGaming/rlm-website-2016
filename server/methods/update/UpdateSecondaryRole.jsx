Meteor.methods({
  UpdateSecondaryRole( secondary ) {
    Profiles.update({ username: secondary.username }, {$set: { secondary: secondary.roles } });
  }
});
