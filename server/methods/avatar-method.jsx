Meteor.methods({
  updateAvatar: function(downloadUrl) {
    userID = Profiles.findOne({ username: Meteor.user().username })._id;
    avatarUrl = { 'avatar': downloadUrl };
    Profiles.update({ _id: userID }, { $set: avatarUrl });
  }
});
