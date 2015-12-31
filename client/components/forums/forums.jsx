Forums = React.createClass({
  mixins: [ReactMeteorData],

  // Loads items from the Tasks collection and puts them on this.data.tasks
  getMeteorData () {
    return {posts: Posts.find({}, {
        sort: {
          createdAt: -1
        }
      }).fetch()}
  },

  getInitialState: function() {
    return {};
  },

  // Render the posts
  renderPosts() {
    // Get tasks from this.data.tasks
    return this.data.posts.map((post) => {
      return <Post key={post._id} post={post}/>;
    });
  },

  render: function () {
    return (
      <div className="container">
        <h2>Forums</h2>
        <ul>
          {this.data.posts.map(function (post) {
            return <li key={post._id}>{post.content}</li>;
          })}
        </ul>
      </div>
    );
  }
});
