Meteor.startup(function () {
  if (!Meteor.users.findOne({ username: 'admin' })) {
    id = Accounts.createUser({
      username: 'admin',
      email: 'admin@the-realm-gaming.co.uk',
      password: 'TheRealm2015'
    });
    // Add to admin role
    Roles.addUsersToRoles(id, ['Admin']);

    // Insert a profile
    Profiles.insert({
      username: 'admin',
      avatar: "http://1.gravatar.com/avatar/ad516503a11cd5ca435acc9bb6523536?s=512",
      bio: "This user does not have a biography yet.",
      cover: 'http://madewith.unity.com/sites/default/files/game/header-image/desktop/manifoldgarden_game_banner_1.png',
      createdAt: Date.now(),
      youtube: 'https://www.youtube.com/user/TheRealmVids',
      roles: "Admin",
      secondary: "None"
    });

    // Insert Badges
    Badges.insert({
      owner: 'admin',
      admin: "true",
      youtuber: "true"
    });
  }
});
