EditProfile = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      currentUser: Meteor.user(),
      profile: Profiles.findOne({owner: Meteor.userId()})
    }
  },

  avatarSubmit(event) {
    event.preventDefault();

    // Get files
    files = event.target.files[0];

    // Set uploader
    const uploader = new Slingshot.Upload( "uploadToAmazonS3" );

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

  render: function() {
    return (
      <div className="wrapper">
        <div className="container profile-container">
          <h1 className="text-center">Edit Profile</h1>

          <div className="row top-buffer">
            <div className="col-md-3 col-sm-4 col-xs-12">
              <div className="avatarInput">
                <label htmlFor="file-input">
                  <img src={ this.data.currentUser.profile.avatar } />
                </label>

                <input id="file-input" type="file" onChange={this.avatarSubmit} />
              </div>
            <h2>{ this.data.currentUser.username }</h2>
            <p>{ this.data.currentUser.emails[0].address }</p>
            </div>
            <div className="col-md-9 col-sm-8 col-xs-12">
              <div className="panel panel-default sharp">
                <div className="panel-body">Use this page to change your avatar, edit your bio and more.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
});
