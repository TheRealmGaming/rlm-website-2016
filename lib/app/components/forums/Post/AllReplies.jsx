import React from 'react';

AllReplies = React.createClass({
  mixins: [ReactMeteorData],

  // Load items
  getMeteorData () {
    Meteor.subscribe("profiles");
    Meteor.subscribe("replies");
    return {
      currentUser: Profiles.findOne({ username: Meteor.user().username }),
      parent: Posts.findOne({ _id: this.props.items.parent })
    };
  },

  // Switching the edit box state
  getInitialState: function() {
    return {
      slide: false,
      editSource: ''
    };
  },

  handleEditSlide: function(event) {
    this.setState({
      editSlide: !this.state.editSlide
    });
  },

  // Delete Post
  deleteReply(event) {
    event.preventDefault();

    removeReply = this.data.parent.replies - 1;

    post = {
      replyCount: removeReply,
      parent: this.props.items.parent,
      id: this.props.items._id
    }

    Meteor.call('deleteReply', post);
    Bert.alert({title: "Reply Deleted", icon: "fa-trash-o", type: "success", style: 'growl-top-right'});
    FlowRouter.go('/forums/');
  },

  // Edit Post Submit Handler
  editReply(event) {
    event.preventDefault();

    post = {
      content: event.target.postEdit.value,
      id: this.props.items._id
    }

    content = event.target.postEdit.value;

    if (!content) {
      Bert.alert("Everything needs to be filled in. Try again.", "danger")
    }
    else {
      Meteor.call('editReply', post);
      Bert.alert({title: "Post Edited", icon: "fa-check", type: "success", style: 'growl-top-right'});
    }
  },

  editPreview() {
    if( this.state.editSource == '' ) {
      var editContent = parseMarkdown( this.props.items.content );
    } else {
      var editContent = parseMarkdown( this.state.editSource );
    }
    return <div dangerouslySetInnerHTML={{__html: editContent}}></div>
  },

  adminButtons() {
    if( this.props.items.owner == Meteor.user().username ) {
      owned = true;
    } else if( Roles.userIsInRole( Meteor.userId(), ['Admin'] ) ) {
      owned = true;
    } else {
      owned = false;
    }
    if( owned == true ) {
      return (
        <div className="col-md-12 edit-delete">
          <div className="row">
            <a href="" onClick={ this.handleEditSlide } className="grey-out trans"><i className="fa fa-pencil"></i></a>
            <a href="" onClick={ this.deleteReply } className="grey-out trans"><i className="fa fa-trash-o"></i></a>
          </div>
        </div>
      );
    } else if( owned == false ) {
      return;
    }
  },

  render() {
    var editReply = this.state.editSlide ? 'edit-post slideUp' : 'edit-post slideDown';
    var time = moment.unix( this.props.items.createdAt / 1000).format("MMMM Do YYYY, h:mm a");
    return (
      <div>
        <div className="reply-content">
          <div className="container">
            <div key={ this.props.items._id } className="row single-reply">
              <div className="col-md-2 col-sm-4 col-xs-4 owner-area">
                <a href={"/profile/" + this.props.items.owner}>
                  <img className="post-avatar" src={ Profiles.findOne({ username: this.props.items.owner }).avatar } />
                </a>
                <a className="text-center" href={"/profile/" + this.props.items.owner}>
                  <h4>{ this.props.items.owner }</h4>
                </a>
              </div>
              <div className="col-md-10 col-sm-8 col-xs-8 content-area">
                <div className="col-md-12">
                  <div className="row time-area">
                    <span className="time">Created at { time }</span>
                  </div>
                </div>
                <div dangerouslySetInnerHTML={{__html: parseMarkdown( this.props.items.content )}}></div>
                { this.adminButtons() }
              </div>
            </div>
          </div>
        </div>
        <div className={ editReply }>
          <div className="container">
            <form onSubmit={ this.editReply }>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <textarea className="form-control post-textarea" name="postEdit" id="postEdit" defaultValue={ this.props.items.content } onChange={ this.handleEditChange }></textarea>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="md-preview form-control">
                    { this.editPreview() }
                  </div>
                </div>
                <div className="col-md-12">
                  <button type="submit" className="btn btn-primary sharp trans" onClick={ this.handleEditSlide }>Submit</button> <a className="cancel" href="" onClick={this.handleEditSlide}>Cancel</a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
});
