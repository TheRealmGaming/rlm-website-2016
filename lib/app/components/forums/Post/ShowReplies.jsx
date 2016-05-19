import React from 'react';

ShowReplies = React.createClass({
  render() {
    return (
      <div>
        {this.props.items.map( ( items, index ) => {
          return <AllReplies key={index} items={items} />;
        })}
      </div>
    );
  }
});
