Meteor.methods({
  editPost ( edits ) {
    thePost = Posts.findOne({ _id: edits.id });
    Posts.update(edits.id, {$set: { content: edits.content, title: edits.title, category: edits.category } });
  }
});
