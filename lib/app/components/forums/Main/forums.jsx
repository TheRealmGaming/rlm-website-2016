import React from 'react';

Forums = React.createClass({
  mixins: [ReactMeteorData],

  // Load items
  getMeteorData () {
    Meteor.subscribe("profiles");
    Meteor.subscribe("categories");
    var posts = Meteor.subscribe("posts");
    return {
      posts: Posts.find({}, {sort: {createdAt: -1}}).fetch(),
      currentUser: Profiles.findOne({ username: Meteor.user().username }),
      categories: Categories.find({}, {sort: { title: 1 }}).fetch(),
      postLoading: ! posts.ready()
    }
  },

  componentDidMount() {
    var title = "Forums | The Realm Gaming";
    DocHead.setTitle(title);

    var metaInfo = {name: "description", content: "Forums at The Realm Gaming" };
    DocHead.addMeta(metaInfo);

    var fragment = {name: "fragment", content: "!"};
    DocHead.addMeta(fragment);
  },

  postSubmit(event) {
    event.preventDefault();

    post = {
      title: event.target.postTitle.value,
      content: event.target.postContent.value,
      username: Meteor.user().username,
      category: event.target.category.value
    }

    title = event.target.postTitle.value;
    content = event.target.postContent.value;

    if (!title || !content) {
      Bert.alert("Everything needs to be filled in. Try again.", "danger")
    }
    else {
      Meteor.call('addPost', post);
      Bert.alert({title: "Post added", type: 'success', icon: 'fa-check', style: 'growl-top-right'});
      document.getElementsByName("postTitle").value = "";
      document.getElementsByName("postContent").value = "";
    }
  },

  getInitialState: function() {
    return {
      slide: false,
      source: "",
      sorted: -1
    };
  },

  handleSlide: function(event) {
    this.setState({
      slide: !this.state.slide
    });
  },

  handleChange: function(event) {
    this.setState({
      source: event.target.value
    });
  },

  mdPreview() {
    var mdContent = parseMarkdown( this.state.source );
    return <div dangerouslySetInnerHTML={{__html: mdContent}}></div>
  },

  loadInProgress() {
    Meteor.loggingIn();
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
      marginTop: '0px'
    }
    headerImg = {
      backgroundImage: 'url(https://s3-eu-west-1.amazonaws.com/the-realm-ireland/assets/dnd3.jpg)'
    }
    var addForm = this.state.slide ? 'add-form slideUp' : 'add-form slideDown';
    var addFormButton = this.state.slide ? 'add-post-fixed-right-up' : 'add-post-fixed-right-bottom';
    return (
      <div className="wrapper">
        <div className="forum-header">
          <div className="header-img" style={ headerImg }>
            <h2 className="text-center">Forums</h2>
          </div>
        </div>
        <div className="forum-list">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <Post post={ this.data.posts} />
              </div>
            </div>
          </div>
        </div>
        <div className={ addFormButton }>
          <button type="button" onClick={this.handleSlide} style={ buttonStyle } className="btn btn-primary sharp"><i className="fa fa-plus"></i> Add Post</button>
        </div>
        <div className={ addForm }>
          <div className="container">
            <form onSubmit={ this.postSubmit }>
              <div className="row">
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <input type="text" name="postTitle" className="form-control sharp" placeholder="Your post title" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <CategoryList category={ this.data.categories } />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <textarea className="form-control post-textarea" defaultValue={this.state.source} name="postContent" onChange={ this.handleChange } placeholder="Add your post here. Markdown accepted."></textarea>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="row">
                    <div className="md-preview form-control">
                      { this.mdPreview() }
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <button type="submit" className="btn btn-primary sharp trans" onClick={ this.handleSlide }>Submit</button> <a className="cancel" href="" onClick={ this.handleSlide }>Cancel</a>
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
