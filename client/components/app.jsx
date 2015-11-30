// ReactCSSTransitionGroup addon
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup

// App component - represents the whole app
App = React.createClass({
  // This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],

  // Loads items from the Tasks collection and puts them on this.data.tasks
  getMeteorData () {
    return {posts: Posts.find({}, {
        sort: {
          createdAt: -1
        }
      }).fetch()}
  },

  // Set add-post form initial state
  getInitialState: function() {
    return { showAddpost: false };
  },

  // Swap onclick state for add-post form
  onClick: function() {
    this.setState({showAddpost: !this.state.showAddpost});
  },

  // Render the posts
  renderPosts() {
    // Get tasks from this.data.tasks
    return this.data.posts.map((post) => {
      return <Post key={post._id} post={post}/>;
    });
  },

  // handleSubmit for the form
  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    var text = React.findDOMNode(this.refs.textInput).value.trim();

    Posts.insert({
      text: text, createdAt: new Date() // current time
    });

    // Clear form
    React.findDOMNode(this.refs.textInput).value = "";
  },

  // Render the page!
  render() {
    return (
      <div className="content-area">
        <div id="header">
          <h1>Forums</h1>
          <h2>Long-term Community Discussions</h2>
        </div>

        <ul>
          {this.renderPosts()}
        </ul>
        <div className="button-float">
          <button className="add-toggle circle" onClick={this.onClick}><i className="fa fa-plus"></i></button>
        </div>
         { this.state.showAddpost ? <Addpost /> : null }
      </div>
    );
  }
});

// Add-post form component
Addpost = React.createClass({
  render: function() {
    return (
      <ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
        <div id="add-post" className="post-add">
          Some Posts
          </div>
      </ReactCSSTransitionGroup>
    );
  }
});
