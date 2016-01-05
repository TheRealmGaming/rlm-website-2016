EditProfile = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      currentUser: Meteor.user(),
      avatarImage: Avatars.findOne({_id: Meteor.user().profile.avatar})
    }
  },

  getAvatar() {

  },

  avatarSubmit(event) {
    event.preventDefault();
    FS.Utility.eachFile(event, function(file) {
      Avatars.insert(file, function (err, fileObj) {
        if (err){
          // error
          toastr.error(error.reason);
        } else {
          // Success!
          toastr.success('Upload successful');
        Meteor.users.update({_id: Meteor.userId() }, {$set: { 'profile.avatar': fileObj._id }});
        };
      });
  	});
  },

  render: function() {
    return (
      <div className="wrapper">
        <div className="container profile-container">
          <h1 className="text-center">Edit Profile</h1>

          <div className="row top-buffer">
            <div className="col-md-3 col-sm-4 col-xs-12 avatarup">
            <a href="" data-toggle="modal" data-target="#newAvatar">
              <img src={this.data.currentUser.profile.avatar} />
            </a>
            </div>
            <div className="col-md-9 col-sm-8 col-xs-12">

            </div>
          </div>
        </div>

        <div className="modal fade" id="newAvatar" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content sharp">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title">Change avatar</h4>
              </div>
              <form onChange={this.avatarSubmit}>
                <div className="modal-body top-buffer bot-buffer">
                  <div className="fileinput fileinput-new" data-provides="fileinput">
                    <input type="file" />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-default sharp" data-dismiss="modal">Close</button>
                  <input type="submit" className="btn btn-primary sharp" value="Submit" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
});
