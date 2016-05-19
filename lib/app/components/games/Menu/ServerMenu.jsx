import React from 'react';

ServerMenu = React.createClass({
  render() {
    return (
      <li>
        {this.props.servers.map( ( servers, index ) => {
          return <ServerItems key={index} servers={servers} />;
        })}
      </li>
    )
  }
});
