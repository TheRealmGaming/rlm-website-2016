import React from 'react';

PostList = React.createClass({
  render() {
    var profile = "/profile/" + this.props.post.owner;
    var postID = "/forums/" + this.props.post._id;
    var categoryLink = "/forums/c/" + this.props.post.category;
    return (
      <tr>
        <td colSpan="6" className="trans">
          <a href={ postID }>{this.props.post.title}</a>
        </td>
        <td colSpan="2" className="trans">
          <a href={ categoryLink }>{ this.props.post.category }</a>
        </td>
        <td colSpan="2" className="trans">
          <a href={ profile } >{this.props.post.owner}</a>
        </td>
        <td colSpan="2">
          <p className="text-muted">{ this.props.post.replies }</p>
        </td>
      </tr>
    );
  }
});
