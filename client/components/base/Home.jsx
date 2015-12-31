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
        <div className="wrapper">

        </div>
      )
    } else {
      homePage = (
        <div className="wrapper">
          
        </div>
      )
    }

    return (
      <div></div>
    )
  }
});
