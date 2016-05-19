import React from 'react';

Users = React.createClass({
  render() {
    return (
      <table className="table sharp userslist">
        <thead>
          <tr>
            <td colSpan="6"><b>Username</b></td>
            <td colSpan="2"><b>Primary Role</b></td>
            <td colSpan="2"><b>Secondary Role</b></td>
            <td colSpan="2"><b>Joined</b></td>
            <td colSpan="1"><b>Edit</b></td>
            <td colSpan="1"><b>Delete</b></td>
          </tr>
        </thead>
        <tbody>
          {this.props.users.map( ( users, index ) => {
            return <UserList key={index} users={users} />;
          })}
        </tbody>
      </table>
    );
  }
});
