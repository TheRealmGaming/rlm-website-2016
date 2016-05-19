import React from 'react';

ServerMap = React.createClass({
  deleteGame: function(event, itemId) {
    event.preventDefault();

    Meteor.call('deleteGame', itemId, (error, result) => {
      if (!error) {
        Bert.alert({title: "Game Deleted", type: 'success', icon: 'fa-check', style: 'growl-top-right'});
      }
    });
  },

  renderItems( item ) {
    return <li key={ item._id } item={ item } className="list-group-item">
      { item.title }<a className="deleteGame" href="" onClick={ e => this.deleteGame(e, item._id) }><i className="fa fa-times"></i></a>
    </li>;
  },

  render() {
    return (
      <ul className="list-group">
        {this.props.servers.map( ( servers, index ) => {
          return this.renderItems( servers );
        })}
      </ul>
    )
  }
});
