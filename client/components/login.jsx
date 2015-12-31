Login = React.createClass({
  componentDidMount() {
    Modules.client.login( { form: "#login" } );
  },
  handleSubmit( event ) {
    event.preventDefault();
  },
  render() {
    var bg = {
      backgroundImage: 'url(http://www.the-realm-gaming.co.uk/wp-content/themes/realm-new//images/dark-souls.jpg)'
    };
    return (
      <div class="wrapper">
        <div className="image" style={bg}>
        </div>

        <div className="login-area">
          <div>
            <div className="center-align container">
              <div className="login-form">
                <h1 className="login-header">Login</h1>
                <form id="login" className="login" onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="email" name="username" className="form-control" placeholder="Username" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password"><span className="pull-left">Password</span>&nbsp;<a className="pull-right" href="/recover-password">Forgot Password?</a></label>
                    <input type="password" name="password" className="form-control" placeholder="Password" />
                  </div>
                  <div className="form-group">
                    <input type="submit" className="btn btn-success" value="Login" />
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
