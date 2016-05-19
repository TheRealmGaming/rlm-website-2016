Meteor.methods ({
  addReply: function(reply) {
    Replies.insert({
      parent: reply.parent,
      content: reply.content,
      createdAt: Date.now(),
      owner: reply.username
    });
    Posts.update({ _id: reply.parent }, {$set: { updatedAt: Date.now(), replies: reply.replyCount  }});
  }
});
