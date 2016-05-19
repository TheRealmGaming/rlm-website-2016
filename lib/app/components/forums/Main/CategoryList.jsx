import React from 'react';

CategoryList = React.createClass({
  render() {
    return (
      <select className="form-control sharp" name="category">
        {this.props.category.map( ( category, index ) => {
          return <Category key={index} category={category} />;
        })}
      </select>
    );
  }
});
