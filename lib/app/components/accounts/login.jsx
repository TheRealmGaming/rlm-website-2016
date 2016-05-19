import React from 'react';

Login = React.createClass({
  handleSubmit(event, text) {
    event.preventDefault();
    var username = event.target.username.value;
    var password = event.target.password.value;

    Meteor.loginWithPassword(username, password, function (err) {
      if (err) {
        Bert.alert(err.reason, 'danger', 'growl-top-right');
      }
      else
      {
        FlowRouter.go("/");
      }
    });
  },
  render() {
    var bg = {
      backgroundImage: 'url(https://s3-eu-west-1.amazonaws.com/the-realm-ireland/assets/bgBody.jpg)'
    };
    return (
      <div className="login page-short">
        <div className="image" style={bg}>
        </div>

        <div className="social-accounts">
          <a href="https://www.facebook.com/therealmgaming" className="margin-right"><i className="fa fa-facebook"></i></a>
          <a href="https://twitter.com/RealmBurger" className="margin-right"><i className="fa fa-twitter"></i></a>
          <a href="http://steamcommunity.com/groups/TheRealmCommunity" className="margin-right"><i className="fa fa-steam"></i></a>
          <a href="https://www.youtube.com/user/TheRealmVids"><i className="fa fa-youtube"></i></a>
        </div>

        <div className="login-area">
          <div>
            <div className="text-center container">
              <div className="login-form">
                <h1 className="login-header">Login</h1>
                <form id="login" className="login top-buffer" onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="username" name="username" className="form-control" placeholder="Username" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password"><span className="pull-left">Password</span>&nbsp;<a className="pull-right" href="/recover-password">Forgot Password?</a></label>
                    <input type="password" name="password" className="form-control" placeholder="Password" />
                  </div>
                  <div className="form-group top-buffer bot-buffer">
                    <input type="submit" className="btn btn-primary sharp" value="Login" />
                  </div>
                </form>
                <p>Don't have an account? <a href="/signup">Sign Up</a>.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
