Meteor.publish("usernames", function () {
    return Meteor.users.find({username: this.username});
});
