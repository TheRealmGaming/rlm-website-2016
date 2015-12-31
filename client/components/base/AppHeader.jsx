AppHeader = React.createClass({
  render() {
    return (
      <div className="container">
        <nav className="navbar navbar-default navbar-fixed">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="/"><img src="http://www.the-realm-gaming.co.uk/wp-content/uploads/2015/10/realm-final-blue-md.png" /></a>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li><a href="/forums">Forums</a></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li><a href="/login">Login</a></li>
              <li><a href="/signup">Sign Up</a></li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
});
