Replies = new Mongo.Collection('replies');

Replies.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Replies.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});
