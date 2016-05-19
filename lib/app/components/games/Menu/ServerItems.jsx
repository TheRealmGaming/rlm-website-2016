import React from 'react';

ServerItems = React.createClass({
  render() {
    return (
      <a href={ "/games/" + this.props.servers.slug }>
        { this.props.servers.title }
      </a>
    );
  }
});
