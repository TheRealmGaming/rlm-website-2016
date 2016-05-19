import React from 'react';

ForumsDash = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    Meteor.subscribe("categories");
    return {
      categories: Categories.find({}, {sort: { title: 1 }}).fetch()
    }
  },

  render() {
    return (
      <div className="right-content-area">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <h1 className="text-center">Forums</h1>
            </div>
            <div className="col-md-12">
              <h3 className="text-center">Categories</h3>
              <AddCategory />
              <DashCategoryList category={ this.data.categories } />
            </div>
          </div>
        </div>
      </div>
    )
  }
});
