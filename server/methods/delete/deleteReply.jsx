Meteor.methods({
  deleteReply( del ) {
    Replies.remove(del.id);
    Posts.update({ _id: del.parent }, {$set: { replies: del.replyCount  }});
  }
});
