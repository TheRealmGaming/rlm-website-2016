Cover = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      currentUser: Meteor.user()
    }
  },

  coverSubmit(event) {
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
        toastr.success("Success: New cover uploaded");
        coverUrl = { 'profile.cover': downloadUrl };
        Meteor.users.update({ _id: Meteor.userId() }, { $set: coverUrl });
      }
    });
  },

  render() {
    return (
      <form onSubmit={this.coverSubmit}>
        <div className="form-group">
          <h3>Cover image</h3>
          <div className="alert alert-danger sharp">
            <strong>Minimum width</strong> 1920px - <strong>Minimum height</strong> 600px
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="coverInput">
                <label htmlFor="cover-input">
                  <img className="trans" src={ this.data.currentUser.profile.cover } />
                </label>
                <input id="cover-input" type="file" onChange={ this.coverSubmit } />
              </div>
            </div>
          </div>
        </div>
      </form>
    )
  }
});
