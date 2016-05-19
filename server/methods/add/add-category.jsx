Meteor.methods ({
  AddCategory: function(cat) {
    Categories.insert({
      title: cat.title
    });
  }
});
