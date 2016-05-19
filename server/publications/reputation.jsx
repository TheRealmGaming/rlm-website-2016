Meteor.publish("reputation", function() {
  return Reputation.find();
});
