import React from 'react';

DashCategoryList = React.createClass({
  deleteCat: function(event, itemId) {
    event.preventDefault();

    Meteor.call('deleteCategory', itemId, (error, result) => {
      if (!error) {
        Bert.alert({title: "Category Deleted", type: 'success', icon: 'fa-check', style: 'growl-top-right'});
      }
    });
  },

  renderItems( item ) {
    return <li key={ item._id } item={ item } className="list-group-item">
      { item.title }<a className="deleteCat" href="" onClick={ e => this.deleteCat(e, item._id) }><i className="fa fa-times"></i></a>
    </li>;
  },

  render() {
    return (
      <ul className="list-group categories">
        {this.props.category.map( ( item ) => {
          return this.renderItems( item );
        })}
      </ul>
    );
  }
});
