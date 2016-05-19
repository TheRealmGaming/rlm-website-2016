Meteor.methods({
  signUp: function(user) {
    var coverArray = [
      'http://smashgn.de/images/slider/image_1920x750.jpg',
      'http://madewith.unity.com/sites/default/files/game-developer/header-image/typoman.jpg',
      'http://madewith.unity.com/sites/default/files/game/header-image/desktop/manifoldgarden_game_banner_1.png',
      'http://madewith.unity.com/sites/default/files/game-developer/header-image/header_36.jpg',
      'http://meadowhillinteractive.com/georgeng/wp-content/uploads/2014/03/ConceptArt02.jpg',
      'https://cdn0.artstation.com/p/assets/images/images/000/560/532/large/tommy-scott-home-is-where-the-swamp-is-fb.jpg?1426787043'
    ];
    cover = coverArray[Math.floor(Math.random() * coverArray.length)];

    // Create the new user
    id = Accounts.createUser({
      email: user.email,
      password: user.password,
      username: user.username
    });

    Profiles.insert({
      username: user.username,
      avatar: "http://1.gravatar.com/avatar/ad516503a11cd5ca435acc9bb6523536?s=512",
      bio: "This user does not have a biography yet.",
      cover: cover,
      createdAt: Date.now(),
      roles: "Guest",
      secondary: "None"
    });

    Badges.insert({
      owner: user.username,
      guest: 'true'
    });

    // Add user to Trial role
    Roles.addUsersToRoles(id, ['Guest']);

    // Send verification Email
    Accounts.sendVerificationEmail(id);
  }
});
