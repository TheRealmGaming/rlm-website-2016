Meteor.methods({
  editReply ( edits ) {
    theReply = Replies.findOne({ _id: edits.id });
    Replies.update(edits.id, {$set: { content: edits.content } });
  }
});
