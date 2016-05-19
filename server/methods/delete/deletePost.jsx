Meteor.methods({
  deletePost( del ) {
    Replies.remove({ parent: del.id });
    Posts.remove(del.id);
  }
});
