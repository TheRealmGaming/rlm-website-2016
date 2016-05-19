Profiles = new Mongo.Collection('profiles');

let ProfilesSchema = new SimpleSchema({
  "avatar": {
    type: String,
    label: "User Avatar"
  },
  "bio": {
    type: String,
    label: "User bio"
  },
  "cover": {
    type: String,
    label: "User cover image"
  },
  "createdAt": {
    type: String,
    label: "Date Created"
  },
  "roles": {
    type: String,
    allowedValues: ['Admin', 'Member', 'Trial', 'Guest'],
    label: "Primary Role"
  },
  "secondary": {
    type: String,
    allowedValues: ['Moderator', 'Helper', 'None'],
    label: "Secondary Roles",
    optional: true
  },
  "username": {
    type: String,
    label: "Username"
  },
  "youtube": {
    type: String,
    label: "Youtube URL",
    optional: true
  },
  "twitch": {
    type: String,
    label: "Twitch URL",
    optional: true
  }
});

Profiles.attachSchema( ProfilesSchema );
