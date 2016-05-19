import React from 'react';

AddCategory = React.createClass({
  getInitialState: function() {
    return {
      inputValue: ""
    };
  },

  handleChange: function(event) {
    this.setState({
      inputValue: event.target.value
    });
  },

  catSubmit(event) {
    event.preventDefault();

    cat = {
      title: event.target.title.value
    }

    title = event.target.title.value;

    if(!title) {
      Bert.alert({title: "Category Empty", type: 'danger', style: 'growl-top-right'});
    } else {
      Meteor.call('AddCategory', cat);
      Bert.alert({title: "Category added", type: 'success', icon: 'fa-check', style: 'growl-top-right'});
      this.setState({
        inputValue: ""
      });
    }
  },

  render() {
    return (
      <div className="categories">
        <form onSubmit={this.catSubmit}>
          <div className="form-group">
            <input
              className="form-control sharp"
              name="title"
              type='text'
              value={this.state.inputValue}
              onChange={this.handleChange}
              placeholder="Add Category"
            />
          </div>
          <div className="form-group">
            <PrimaryButton label="Add Category" />
          </div>
        </form>
      </div>
    );
  }
});
