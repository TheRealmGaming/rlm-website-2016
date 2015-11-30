// Task component - represents a single todo item
Post = React.createClass({
  propTypes: {
    // This component gets the post to display through a React prop.
    // We can use propTypes to indicate it is required
    post: React.PropTypes.object.isRequired
  },
  render() {
    return (
      <li>{this.props.post.text}</li>
    );
  }
});
