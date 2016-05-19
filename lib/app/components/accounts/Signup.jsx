import React from 'react';

Signup = React.createClass({
  handleSubmit(event) {
    event.preventDefault();

    user = {
      email: event.target.email.value,
      username: event.target.username.value,
      password: event.target.password.value
    }

    password = event.target.password.value,
    passwordConfirm = event.target.passwordConfirm.value;

    if (password != passwordConfirm) {
      Bert.alert("Passwords do not match", 'danger')
    } else if (!user.email) {
      Bert.alert("You must provide an email address", 'danger')
    } else if (!user.username) {
      Bert.alert("You must provide a username", 'danger')
    } else {
      Meteor.call('signUp', user);
      /* Meteor.call('sendVerificationLink', (error, response) => {
        if(error) {
          Bert.alert( error.reason, 'danger');
        } else {
          Bert.alert( 'Welcome!', 'success');
        }
      }); */
      Bert.alert("Welcome! verification email has been sent to your email address.", "success");
      FlowRouter.go('/login');
    }
  },

  render() {
    var bg = {
      backgroundImage: 'url(https://s3-eu-west-1.amazonaws.com/the-realm-ireland/assets/bgBody.jpg)'
    };
    return (
      <div className="signup page-short">
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
                <h1 className="login-header">Sign Up</h1>
                <form id="login" className="login" onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="username">Email</label>
                    <input type="email" name="email" className="form-control" placeholder="Email" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="username" name="username" className="form-control" placeholder="Username" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password"><span className="pull-left">Password</span></label>
                    <input type="password" name="password" className="form-control" placeholder="Password" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="passwordConfirm"><span className="pull-left">Confirm Password</span></label>
                    <input type="password" name="passwordConfirm" className="form-control" placeholder="Confirm Password" />
                  </div>
                  <div className="form-group top-buffer">
                    <input type="submit" className="btn btn-lg btn-primary sharp" value="Sign Up" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
