Meteor.startup(function () {
  if (Categories.find({}).count() === 0) {
    Categories.insert({
      "title": "Games"
    });
    Categories.insert({
      "title": "Streaming"
    });
    Categories.insert({
      "title": "Other"
    });
  }
});
