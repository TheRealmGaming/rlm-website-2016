import React from 'react';

EditProfile = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    var profile = Meteor.subscribe("profiles");
    return {
      currentUser: Profiles.findOne({ username: Meteor.user().username })
    }
  },

  componentDidMount() {
    var title = "Edit Profile - " + this.data.currentUser.username + " | The Realm Gaming";
    DocHead.setTitle(title);

    var metaInfo = {name: "description", content: "Edit profile - " + this.data.currentUser.username };
    DocHead.addMeta(metaInfo);
  },

  avatarSubmit(event) {
    event.preventDefault();

    // Get files
    files = event.target.files[0];

    // Set uploader
    var uploader = new Slingshot.Upload( "uploadToAmazonS3" );

    // Upload files
    uploader.send(files, function( err, downloadUrl) {
      if (err) {
        Bert.alert(err.reason, 'danger', 'growl-top-right');
      }
      else {
        Bert.alert({title: 'Success: Avatar uploaded', type: 'success', style: 'growl-top-right', icon: 'fa-check'});
        Meteor.call('updateAvatar', downloadUrl);
      }
    });
  },

  renderBio() {
    bio = parseMarkdown( this.data.currentUser.bio );

    return (
      <div className="panel panel-default sharp top-buffer bio">
        <div className="panel-body">
          <h4>Bio</h4>
          <hr></hr>
          <div dangerouslySetInnerHTML={{__html: bio}}></div>
        </div>
      </div>
    )
  },

  render: function() {
    var ownProfile = '/profile/' + this.data.currentUser.username + '/';
    var buttonStyle = {
      marginTop: '25px'
    }
    return (
      <div className="profile-wrapper page">
        <div className="container profile-container">
          <div className="row">
            <div className="col-md-9 col-xs-6 col-sm-6">
              <h1>Edit Profile</h1>
            </div>
            <div className="col-md-3 col-sm-6 col-xs-6 text-right">
              <a href={ ownProfile } style={ buttonStyle } className="btn btn-primary sharp">View your profile</a>
            </div>
          </div>
          <div className="row top-buffer bot-buffer">
            <div className="col-md-3 col-sm-4 col-xs-12">
              <div className="avatarInput">
                <label htmlFor="file-input">
                  <img src={ this.data.currentUser.avatar } />
                </label>

                <input id="file-input" type="file" onChange={ this.avatarSubmit } />
              </div>
            <h2>{ this.data.currentUser.username }</h2>
            { this.renderBio() }
            </div>
            <div className="col-md-9 col-sm-8 col-xs-12">
              <div className="panel panel-default sharp">
                <div className="panel-body">Use this page to change your avatar, edit your bio and more.</div>
              </div>
              <Bio />
              <Cover />
              <AddMedia />
            </div>
          </div>
        </div>
      </div>
    )
  }
});
