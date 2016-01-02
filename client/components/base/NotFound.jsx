NotFound = React.createClass({
  render() {
    var bg = {
      backgroundImage: 'url(sc.jpg)'
    };
    return (
      <div className="wrapper">
        <div className="image" style={bg}>
        </div>

        <div className="notfound-area">
          <div>
            <div className="text-center container">
              <div className="notfound-form">
                <h1 className="notfound-header">Oops!</h1>
                <p>Looks like that page doesn't exist. Try again!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
});
