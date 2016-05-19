Meteor.startup(function () {
  post = Posts.find().fetch();
  if( !post.replies || post.replies == 0 ) {
    replyNo = Replies.find({ parent: post._id }).fetch().length;
    Posts.update({ _id: post._id }, {$set: { replies: replyNo }});
  }
  if( !post.updatedAt ) {
    Posts.update({ _id: post._id }, {$set: { updatedAt: post.createdAt }});
  }
});
