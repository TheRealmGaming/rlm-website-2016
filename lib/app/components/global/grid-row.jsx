import React from 'react';

GridRow = React.createClass({
  render() {
    return <div className="row">
      { this.props.children }
    </div>;
  }
});
