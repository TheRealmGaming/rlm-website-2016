Meteor.methods ({
  addPost: function(post) {
    Posts.insert({
      title: post.title,
      category: post.category,
      content: post.content,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      owner: post.username,
      replies: 0
    });
  }
});
