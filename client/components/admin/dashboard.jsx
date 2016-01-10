Dashboard = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    var username = this.props.username;
    return {
      userProfile: Meteor.users.findOne({"username": username })
    }
  },

  render() {
    return (
      <div className="dashboard">
        
      </div>
    )
  }
});
