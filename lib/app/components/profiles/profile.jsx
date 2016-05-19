import React from 'react';

Profile = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    var profile = Meteor.subscribe("profiles", this.props.username);
    Meteor.subscribe("badges", this.props.username);
    return {
      userProfile: Profiles.findOne({ username: this.props.username }),
      userBadges: Badges.findOne({ owner: this.props.username }),
      profileLoading: ! profile.ready()
    }
  },

  componentDidMount() {
    var title = this.data.userProfile.username + " | The Realm Gaming";
    DocHead.setTitle(title);

    var metaInfo = {name: "description", content: this.data.userProfile.username + " user profile"};
    DocHead.addMeta(metaInfo);

    var fragment = {name: "fragment", content: "!"};
    DocHead.addMeta(fragment);
  },

  renderBio() {
    bio = parseMarkdown( this.data.userProfile.bio );

    return (
      <div className="panel panel-default sharp top-buffer bio">
        <div className="panel-body">
          <h3 className="text-center">Bio</h3>
          <hr></hr>
          <div dangerouslySetInnerHTML={{__html: bio}}></div>
        </div>
      </div>
    )
  },

  renderBadges() {
    if(this.data.userProfile.roles == 'Admin') {
      return <span className="label admin sharp">Admin</span>;
    } else if(this.data.userProfile.roles == 'Member') {
      return <span className="label member sharp">Member</span>;
    } else if(this.data.userProfile.roles == 'Trial') {
      return <span className="label trial sharp">Trial</span>;
    }
  },

  renderYoutube() {
    if (!this.data.userBadges.youtuber) {
      return;
    } else {
      return <a href={ this.data.userProfile.youtube }><span className="label youtuber sharp"><i className="fa fa-youtube-play"></i> Youtuber</span></a>;
    }
  },

  renderStreamer() {
    if (!this.data.userBadges.streamer) {
      return;
    } else {
      return <a href={ this.data.userProfile.twitch }><span className="label streamer sharp"><i className="fa fa-twitch"></i> Streamer</span></a>;
    }
  },

  render() {
    // Display loading while retrieving profile
    if (this.data.profileLoading) {
      return <Loading />;
    }

    // Inline styles
    var divStyle = {
      backgroundImage: 'url(' + this.data.userProfile.cover + ')'
    }
    return (
      <div className="wrapper">
        <div className="cover-photo" style={ divStyle }>
        </div>
        <div className="profile-top container">
          <div className="row">
            <div className="col-md-3">
              <img className="profile-avatar" src={ this.data.userProfile.avatar } />
              { this.renderBio() }
            </div>
            <div className="col-md-9">
              <h1 className="white shadowed">{ this.data.userProfile.username }</h1>
              <h4 className="shadowed badges">
                { this.renderBadges() }
                { this.renderYoutube() }
                { this.renderStreamer() }
              </h4>
            </div>
          </div>
        </div>
      </div>
    )
  }
});
