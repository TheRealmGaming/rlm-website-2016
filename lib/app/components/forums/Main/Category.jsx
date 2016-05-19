import React from 'react';

Category = React.createClass({
  render() {
    return (
      <option value={this.props.category.title}>
        {this.props.category.title}
      </option>
    );
  }
});
