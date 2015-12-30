Login = React.createClass({
  componentDidMount() {
    Modules.client.login( { form: "#login" } );
  },
  handleSubmit( event ) {
    event.preventDefault();
  },
  render() {
    return (
      <div className="login-area">
        <h2 className="page-header">Login</h2>
        <form id="login" className="login" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="emailAddress">Email Address</label>
            <input type="email" name="emailAddress" className="form-control" placeholder="Email Address" />
          </div>
          <div className="form-group">
            <label htmlFor="password"><span className="pull-left">Password</span> <a className="pull-right" href="/recover-password"> Forgot Password?</a></label>
            <input type="password" name="password" className="form-control" placeholder="Password" />
          </div>
          <div className="form-group">
            <input type="submit" className="btn btn-success" value="Login" />
          </div>
        </form>
        <p>Don't have an account? <a href="/signup">Sign Up</a>.</p>
      </div>
    );
  }
});
