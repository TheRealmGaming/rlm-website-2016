import React from 'react';

DashCategory = React.createClass({
  render() {
    return (
      <li>
        {this.props.category.title}
      </li>
    );
  }
});
