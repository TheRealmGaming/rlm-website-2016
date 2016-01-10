AppHeader = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      currentUser: Meteor.user()
    }
  },

  handleLogout() {
    Meteor.logout();
    FlowRouter.go("/login");
  },

  render() {
    let loginButton;
    let { currentUser } = this.data;

    if (currentUser) {
      loginButton = (
        <ul className="nav navbar-nav navbar-right">
          <li className="dropdown">
          <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{currentUser.username} <span className="caret"></span></a>
          <ul className="dropdown-menu">
            <li><a href="/edit-profile">Edit Profile</a></li>
            <li role="separator" className="divider"></li>
            <li><a href="" onClick={this.handleLogout}>Logout</a></li>
          </ul>
        </li>
        </ul>
      )
    }
    else {
      loginButton = (
        <ul className="nav navbar-nav navbar-right">
          <li><a href="/login">Login</a></li>
          <li><a href="/signup">Sign Up</a></li>
        </ul>
      )
    }

    return (
<<<<<<< HEAD
      <nav className="navbar navbar-default navbar-fixed-top trans">
=======
      <nav className="navbar navbar-default navbar-fixed-top">
>>>>>>> origin/master
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="/"><img src="realm-final-blue-md.png" /></a>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li><a href="/forums">Forums</a></li>
            </ul>
            { loginButton }
          </div>
        </div>
      </nav>
    );
  }
});
