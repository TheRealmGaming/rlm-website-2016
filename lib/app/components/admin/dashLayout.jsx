import React from 'react';

LeftMenu = React.createClass({
  render() {
    return (
      <div className="left-nav">
        <div className="dash-home">
          <a href="/"><img src="https://s3-eu-west-1.amazonaws.com/the-realm-ireland/assets/rlm-med.png" /></a>
        </div>
        <ul className="dash-menu">
          <a href="/dashboard/users/"><li>Users</li></a>
          <a href="/dashboard/forums/"><li>Forums</li></a>
          <a href="/dashboard/games/"><li>Games</li></a>
        </ul>
      </div>
    )
  }
});

export const DashLayout = ({content}) => (
  <div className="dashboard">
    <LeftMenu />
    {content}
  </div>
);
