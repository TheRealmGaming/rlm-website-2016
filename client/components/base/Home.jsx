Home = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      currentUser: Meteor.user()
    }
  },

  render() {
    let homePage;
    let { currentUser } = this.data;

    if (currentUser) {
      homePage = (
        <div className="home-page">
          <p><a href="/profile/Korus/">Korus Profile</a></p>
        </div>
      )
    } else {
      homePage = (
        <div className="home-page">

        </div>
      )
    }

    return (
      <div className="container">
        { homePage }
      </div>
    )
  }
});
