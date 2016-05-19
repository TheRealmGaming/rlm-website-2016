Meteor.publish("replies", function() {
  return Replies.find();
});
