Meteor.publish("badges", function() {
  return Badges.find();
});
