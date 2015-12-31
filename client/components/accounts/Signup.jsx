Signup = React.createClass({
  handleSubmit(event, text) {
    event.preventDefault();
    var email = event.target.email.value;
    var username = event.target.username.value;
    var password = event.target.password.value;
    var passwordConfirm = event.target.passwordConfirm.value;

    if (password != passwordConfirm) {
      toastr.error("Passwords do not match")
    }
    else {
      Accounts.createUser({
        email: email,
        username: username,
        password: password
      }, function(err) {
        if (err) {
          toastr.error(err.reason)
        }
        else {
          FlowRouter.go("/")
        }
      });
    }
  },
  render() {
    var bg = {
      backgroundImage: 'url(http://www.the-realm-gaming.co.uk/wp-content/themes/realm-new//images/dark-souls.jpg)'
    };
    return (
      <div className="wrapper">
        <div className="image" style={bg}>
        </div>

        <div className="login-area">
          <div>
            <div className="center-align container">
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
                  <div className="form-group">
                    <input type="submit" className="btn btn-success" value="Sign Up" />
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
