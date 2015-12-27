Login = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    return {
      user: Meteor.user()
    }
  },

  logout() {
    Meteor.logout();
  },

  getLogoutButton() {
    return <a href='#' onClick={this.logout}></a>
  },

  render() {
    return (
      <div className="content">
        <div id="header">
          <h1>Login</h1>
          {this.data.user? this.getLogoutButton() : null}
        </div>
      </div>
    );
  }
});
