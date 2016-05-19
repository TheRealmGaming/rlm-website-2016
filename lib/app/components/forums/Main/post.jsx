import React from 'react';

Post = React.createClass({
  render() {
    return (
      <table className="table sharp">
        <thead>
          <tr>
            <td colSpan="6"><b>Title</b></td>
            <td colSpan="2"><b>Category</b></td>
            <td colSpan="2"><b>Author</b></td>
            <td colSpan="2"><b>Replies</b></td>
          </tr>
        </thead>
        <tbody>
          {this.props.post.map( ( post, index ) => {
            return <PostList key={index} post={post} />;
          })}
        </tbody>
      </table>
    );
  }
});
