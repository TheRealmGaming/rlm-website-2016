import React from 'react';

NotFound = React.createClass({
  render() {
    var bg = {
      backgroundImage: 'url(https://s3-eu-west-1.amazonaws.com/the-realm-ireland/assets/bgBody.jpg)'
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
