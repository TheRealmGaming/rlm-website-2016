EditProfile = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      currentUser: Meteor.user()
    }
  },

  render() {
    let avatar;
    let { currentUser } = this.data;

    avatar = (
      <img src={ currentUser.profile.avatar }></img>
    )
    return (
      <div className="wrapper">
        <div className="container profile-container">
          <h1 className="text-center">Edit Profile</h1>

          <div className="row">
            <div className="col-md-3 col-sm-4 col-xs-12">
              { avatar }
            </div>
            <div className="col-md-9 col-sm-8 col-xs-12">

            </div>
          </div>
        </div>
      </div>
    )
  }
});
