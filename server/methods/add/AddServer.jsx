Meteor.methods ({
  AddServer: function(server) {
    var formattedSlug = server.title.toLowerCase().replace(/ /g,'-').replace(/[-]+/g, '-').replace(/[^\w\x80-\xFF-]+/g,'');
    Servers.insert({
      title: server.title,
      slug: formattedSlug,
      rules: server.rules,
      cover: server.cover,
      address: server.address,
      managers: server.managers,
      website: server.website
    });
  }
});
