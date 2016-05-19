import React from 'react';

PostPage = React.createClass({
  mixins: [ReactMeteorData],

  // Load items
  getMeteorData () {
    Meteor.subscribe("profiles");
    Meteor.subscribe("replies");
    Meteor.subscribe("categories");
    Meteor.subscribe("posts");
    var id = this.props._id;
    return {
      posts: Posts.findOne({ _id: id }),
      currentUser: Profiles.findOne({ username: Meteor.user().username }),
      categories: Categories.find({}, {sort: { title: 1 }}).fetch(),
      replies: Replies.find({ parent: this.props._id }, {sort: { createdAt: 1 }}).fetch()
    };
  },

  // <head> Area
  componentDidMount() {
    var title = this.data.posts.title + " | The Realm Gaming";
    DocHead.setTitle(title);

    var metaInfo = {name: "description", content: this.data.posts.title + " - Forums at The Realm Gaming" };
    DocHead.addMeta(metaInfo);

    var fragment = {name: "fragment", content: "!"};
    DocHead.addMeta(fragment);
  },

  // Switching the reply box state
  getInitialState: function() {
    return {
      slide: false,
      editSlide: false,
      editSource: '',
      titleSource: '',
      source: ''
    };
  },

  handleSlide: function() {
    this.setState({
      slide: !this.state.slide
    });
  },

  handleEditSlide: function(event) {
    this.setState({
      editSlide: !this.state.editSlide
    });
  },

  handleChange: function(event) {
    this.setState({
      source: event.target.value
    });
  },

  handleEditChange: function(event) {
    this.setState({
      editSource: event.target.value
    });
  },

  handleTitleChange: function(event) {
    this.setState({
      titleSource: event.target.value
    });
  },

  mdPreview() {
    var mdContent = parseMarkdown( this.state.source );
    return <div dangerouslySetInnerHTML={{__html: mdContent}}></div>
  },

  editPreview() {
    if( this.state.editSource == '' ) {
      var editContent = parseMarkdown( this.data.posts.content );
    } else {
      var editContent = parseMarkdown( this.state.editSource );
    }
    return <div dangerouslySetInnerHTML={{__html: editContent}}></div>
  },

  // Show Post Handler
  showPost() {
    var owner = Profiles.findOne({ username: this.data.posts.owner });
    var ownerLink = "/profile/" + owner.username;
    var postOwner = this.data.posts.owner;
    if( postOwner == Meteor.user().username ) {
      owned = true;
    } else if ( Roles.userIsInRole( Meteor.userId(), ['Admin'] ) ) {
      owned = true;
    } else {
      owned = false;
    }
    var content = parseMarkdown( this.data.posts.content );
    var time = moment.unix( this.data.posts.createdAt / 1000).format("MMMM Do YYYY, h:mm a");
    if( owned == true ) {
      return (
        <div className="row">
          <div className="col-md-2 col-sm-4 col-xs-4 owner-area">
            <a href={ ownerLink }>
              <img className="post-avatar" src={ owner.avatar } />
            </a>
            <a className="text-center" href={ ownerLink }>
              <h4>{ owner.username }</h4>
            </a>
          </div>
          <div className="col-md-10 col-sm-8 col-xs-8 content-area">
            <div className="col-md-12">
              <div className="row time-area">
                <span className="time">Created at { time }</span>
              </div>
            </div>
            <div dangerouslySetInnerHTML={{__html: content}}></div>
            <div className="col-md-12 edit-delete">
              <div className="row">
                <a href="" onClick={ this.handleEditSlide } className="grey-out trans"><i className="fa fa-pencil"></i></a>
                <a href="" onClick={ this.deletePost } className="grey-out trans"><i className="fa fa-trash-o"></i></a>
              </div>
            </div>
          </div>
        </div>
      );
    } else if( owned == false ) {
      return (
        <div className="row">
          <div className="col-md-2 col-sm-4 col-xs-4 owner-area">
            <a href={ ownerLink }>
              <img className="post-avatar" src={ owner.avatar } />
            </a>
            <a className="text-center" href={ ownerLink }>
              <h4>{ owner.username }</h4>
            </a>
          </div>
          <div className="col-md-10 col-sm-8 col-xs-8 content-area">
            <div dangerouslySetInnerHTML={{__html: content}}></div>
          </div>
        </div>
      );
    }
  },

  // Reply Submit Handler
  replySubmit(event) {
    event.preventDefault();

    addReply = this.data.posts.replies + 1;

    reply = {
      replyCount: addReply,
      content: event.target.replyContent.value,
      username: Meteor.user().username,
      parent: this.data.posts._id
    }

    content = event.target.replyContent.value;

    if (!content) {
      Bert.alert("Everything needs to be filled in. Try again.", "danger")
    }
    else {
      Meteor.call('addReply', reply);
      Bert.alert({title: "Reply added", icon: "fa-check", type: "success", style: 'growl-top-right'});
    }
  },

  // Edit Post Submit Handler
  editPost(event) {
    event.preventDefault();

    post = {
      content: event.target.postEdit.value,
      title: event.target.postTitle.value,
      category: event.target.category.value,
      id: this.data.posts._id
    }

    content = event.target.postEdit.value;

    if (!content) {
      Bert.alert("Everything needs to be filled in. Try again.", "danger")
    }
    else {
      Meteor.call('editPost', post);
      Bert.alert({title: "Post Edited", icon: "fa-check", type: "success", style: 'growl-top-right'});
    }
  },

  // Delete Post
  deletePost(event) {
    event.preventDefault();

    post = {
      id: this.data.posts._id
    }

    Meteor.call('deletePost', post);
    Bert.alert({title: "Post Deleted", icon: "fa-trash-o", type: "success", style: 'growl-top-right'});
    FlowRouter.go('/forums/');
  },

  loadInProgress() {
    if(Meteor.loggingIn()) {
      return true;
    } else {
      return false;
    }
  },

  getPermission() {
    if(Roles.userIsInRole(Meteor.userId(), ['Guest'])) {
      return true;
    } else {
      return false;
    }
  },

  redirect() {
    Bert.alert({title: "Cannot use the forums while Guest", type: 'danger', icon: 'fa-times', style: 'growl-top-right'});
    FlowRouter.go('/');
  },

  canShow() {
    return (
      <div>
        {this.getPermission()?  this.redirect() : this.theContent()}
      </div>
    );
  },

  theContent() {
    if (this.data.postLoading) {
      return <Loading />;
    }

    buttonStyle = {
      marginTop: '0'
    }

    var editPost = this.state.editSlide ? 'edit-post slideUp' : 'edit-post slideDown';
    var addReply = this.state.slide ? 'add-reply slideUp' : 'add-reply slideDown';
    var addFormButton = this.state.slide ? 'add-post-fixed-right-up' : 'add-post-fixed-right-bottom';
    return (
      <div className="page post-page">
        <div className="forum-header">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-sm-12 col-xs-12 text-left">
              <h2 style={ buttonStyle }>{this.data.posts.title}</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="post-content">
          <div className="container">
            { this.showPost() }
          </div>
        </div>
        <ShowReplies items={ this.data.replies } />
        <div className={ addFormButton }>
          <button type="button" onClick={this.handleSlide} style={ buttonStyle } className="btn btn-primary sharp"><i className="fa fa-reply"></i> Add Reply</button>
        </div>
        <div className={ addReply }>
          <div className="container">
            <form onSubmit={ this.replySubmit }>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <textarea className="form-control post-textarea" name="replyContent" id="replyContent" defaultValue={this.state.source} onChange={ this.handleChange } placeholder="Add your reply here. Markdown accepted."></textarea>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="md-preview form-control">
                    { this.mdPreview() }
                  </div>
                </div>
                <div className="col-md-12">
                  <button type="submit" className="btn btn-primary sharp trans" onClick={ this.handleSlide }>Submit</button> <a className="cancel" href="" onClick={this.handleSlide}>Cancel</a>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className={ editPost }>
          <div className="container">
            <form onSubmit={ this.editPost }>
              <div className="row">
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <input type="text" name="postTitle" className="form-control sharp" defaultValue={ this.data.posts.title } onChange={ this.handleTitleChange } />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <CategoryList category={ this.data.categories } />
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <textarea className="form-control post-textarea" name="postEdit" id="postEdit" defaultValue={ this.data.posts.content } onChange={ this.handleEditChange }></textarea>
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
  },

  render: function () {
    return (
      <div>
        {this.loadInProgress()?  <Loading /> : this.canShow()}
      </div>
    );
  }
});
