Meteor.methods({
  UpdateUsername( name ) {
    user = Meteor.users.findOne({ username: name.username });
    userId = user._id;
    Profiles.update({ username: name.username }, {$set: { username: name.newUsername } });
    Meteor.users.update( userId, { $set: { username: name.newUsername } });
    Badges.update( { owner: name.username }, { $set: { owner: name.newUsername } } );
    Posts.update( { owner: name.username }, { $set: { owner: name.newUsername} } );
    Posts.update( { owner: name.username }, { $set: { owner: name.newUsername} } );
  }
});
