import React from 'react';

Cover = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    var username = Meteor.user().username;
    return {
      currentUser: Profiles.findOne({ username: username })
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
        Bert.alert(err.reason, 'danger', 'growl-top-right');
      }
      else {
        Meteor.call('updateCover', downloadUrl);
        Bert.alert({title: 'Success: New cover uploaded', type: 'success', style: 'growl-top-right', icon: 'fa-check'});
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
                  <img src={ this.data.currentUser.cover } />
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
