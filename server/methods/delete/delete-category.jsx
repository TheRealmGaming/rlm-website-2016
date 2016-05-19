Meteor.methods ({
  deleteCategory: function(catId) {
    Categories.remove(catId);
  }
});
