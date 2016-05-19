import React from 'react';

ForumsDash = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    Meteor.subscribe("categories");
    return {
      categories: Categories.find({}, {sort: { title: 1 }}).fetch()
    }
  },

  componentDidMount() {
    var title = "Forums Dashboard | The Realm Gaming";
    DocHead.setTitle(title);
  },

  render() {
    if(!Roles.userIsInRole(this.data.loggedIn, 'Admin')) {
      Bert.alert({title: 'Not an admin', type: 'danger', style: 'growl-top-right', icon: 'fa-exclamation'});
      FlowRouter.go('/');
    }
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
