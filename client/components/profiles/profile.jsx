Profile = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    var username = this.props.username;
    return {
      userProfile: Meteor.users.findOne({"username": username })
    }
  },

  renderBio() {
    bio = parseMarkdown( this.data.userProfile.profile.bio );

    return (
      <div className="panel panel-default sharp top-buffer">
        <div className="panel-body">
          <h3 className="text-center">Bio</h3>
          <hr></hr>
          <div dangerouslySetInnerHTML={{__html: bio}}></div>
        </div>
      </div>
    )
  },

  render() {
    var divStyle = {
      backgroundImage: 'url(' + this.data.userProfile.profile.cover + ')'
    }
    return (
      <div className="wrapper">
        <div className="cover-photo" style={ divStyle }>
        </div>
        <div className="profile-top container">
          <div className="row">
            <div className="col-md-3">
              <img src={ this.data.userProfile.profile.avatar } />
              { this.renderBio() }
            </div>
            <div className="col-md-9">
              <h1 className="white shadowed">{ this.data.userProfile.username }</h1>
              <h4 className="white"><span className="label label-danger sharp">{ this.data.userProfile.roles[0] }</span></h4>
            </div>
          </div>
        </div>
      </div>
    )
  }
});
