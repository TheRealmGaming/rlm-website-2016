Meteor.methods({
  updateBio: function(bio) {

    Profiles.update({ _id: bio.user }, {
      $set: {
        'bio': bio.bioInput
      }
    });
  }
});
