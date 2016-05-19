Meteor.methods({
  addMedia: function(social) {

    // Add to profiles
    if (!social.youtube) {
      Profiles.update({ _id: social.user }, {
        $set: {
          'twitch': social.twitch
        }
      });
      Badges.update({ owner: social.username }, {
        $set: {
          'streamer': 'true'
        }
      });
    } else if (!social.twitch) {
      Profiles.update({ _id: social.user }, {
        $set: {
          'youtube': social.youtube
        }
      });
      Badges.update({ owner: social.username }, {
        $set: {
          'youtuber': 'true'
        }
      });
    } else {
      Profiles.update({ _id: social.user }, {
        $set: {
          'youtube': social.youtube,
          'twitch': social.twitch
        }
      });
      Badges.update({ owner: social.username }, {
        $set: {
          'youtuber': 'true',
          'streamer': 'true'
        }
      });
    }
  }
});
