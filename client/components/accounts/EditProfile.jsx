EditProfile = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      currentUser: Meteor.user()
    }
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
        toastr.error(err.reason);
      }
      else {
        toastr.success("Success: Avatar uploaded");
        avatarUrl = { 'profile.avatar': downloadUrl };
        Meteor.users.update({ _id: Meteor.userId() }, { $set: avatarUrl });
      }
    });
  },

  renderBio() {
    bio = parseMarkdown( this.data.currentUser.profile.bio );

    return (
      <div className="panel panel-default sharp top-buffer">
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
      marginTop: '15px'
    }
    return (
      <div className="profile-wrapper">
        <div className="container profile-container">
          <div className="row">
            <div className="col-md-9 col-xs-6 col-sm-6">
              <h1>Edit Profile</h1>
            </div>
            <div className="col-md-3 col-sm-6 col-xs-6 text-right">
              <a href={ ownProfile } style={ buttonStyle } className="btn btn-primary sharp">View your profile</a>
            </div>
          </div>
          <div className="row top-buffer">
            <div className="col-md-3 col-sm-4 col-xs-12">
              <div className="avatarInput">
                <label htmlFor="file-input">
                  <img className="trans" src={ this.data.currentUser.profile.avatar } />
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
            </div>
          </div>
        </div>
      </div>
    )
  }
});
