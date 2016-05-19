Meteor.methods({
  updateCategory( category ) {
    Categories.update( category._id, { $set: {title: category.title} });
  }
});
