Meteor.methods({
  updateCover: function(downloadUrl) {
    userID = Profiles.findOne({ username: Meteor.user().username })._id;
    coverUrl = { 'cover': downloadUrl };
    Profiles.update({ _id: userID }, { $set: coverUrl });
  }
});
