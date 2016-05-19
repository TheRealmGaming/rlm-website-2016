Meteor.methods ({
  deleteGame: function(gameId) {
    Servers.remove(gameId);
  }
});
