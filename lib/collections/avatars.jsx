Avatars = new FS.Collection("avatars", {
  stores: [new FS.Store.FileSystem("avatars")]
});

Avatars.allow({
  insert: function() { return true; },
  update: function() { return true; },
  download: function(userId, fileObj) { return true; }
});
