import React from 'react';

export const Home = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {
    var profile = Meteor.subscribe("profiles");
    return {
      profilesNumber: Profiles.find().fetch().length,
      currentUser: Meteor.user()
    }
  },

  componentDidMount() {
    var title = "The Realm Gaming";
    DocHead.setTitle(title);

    var metaInfo = {name: "description", content: "The Realm Gaming is an international gaming community that plays everything from Minecraft to CS:GO and more" };
    DocHead.addMeta(metaInfo);

    var fragment = {name: "fragment", content: "!"};
    DocHead.addMeta(fragment);
  },

  resendVerify: function(event) {
    event.preventDefault();

    Meteor.call( 'sendVerificationLink', ( error, response ) => {
      if ( error ) {
        Bert.alert( error.reason, 'danger' );
      } else {
        let email = Meteor.user().emails[ 0 ].address;
        Bert.alert( `Verification sent to ${ email }!`, 'success' );
      }
    });
  },

  render() {
    let homePage;
    let { currentUser } = this.data;

    if (currentUser) {
      if (currentUser.emails[0].verified == false) {
        var bg = {
          backgroundImage: 'url(https://s3-eu-west-1.amazonaws.com/the-realm-ireland/assets/rl1.jpg)',
          opacity: '0.6'
        };
        homePage = (
          <div className="home-page page">

            <div className="container">
              <div className="panel panel-default sharp transparent-bg">
                <div className="panel-body">
                  You need to verify your email address before using The Realm Gaming. <a href="#" onClick={ this.resendVerify } className="resend-verification-link">Resend verification link</a>
                </div>
              </div>
            </div>

            <div className="image" style={bg}>
            </div>

            <div className="social-accounts">
              <a href="https://www.facebook.com/therealmgaming" className="margin-right"><i className="fa fa-facebook"></i></a>
              <a href="https://twitter.com/RealmBurger" className="margin-right"><i className="fa fa-twitter"></i></a>
              <a href="http://steamcommunity.com/groups/TheRealmCommunity" className="margin-right"><i className="fa fa-steam"></i></a>
              <a href="https://www.youtube.com/user/TheRealmVids"><i className="fa fa-youtube"></i></a>
            </div>
          </div>
        )
      } else {
      var bg = {
        backgroundImage: 'url(https://s3-eu-west-1.amazonaws.com/the-realm-ireland/assets/rl1.jpg)',
        opacity: '0.6'
      };
      homePage = (
        <div className="home-page page">

          <div className="container">
          </div>

          <div className="image" style={bg}>
          </div>

          <div className="social-accounts">
            <a href="https://www.facebook.com/therealmgaming" className="margin-right"><i className="fa fa-facebook"></i></a>
            <a href="https://twitter.com/RealmBurger" className="margin-right"><i className="fa fa-twitter"></i></a>
            <a href="http://steamcommunity.com/groups/TheRealmCommunity" className="margin-right"><i className="fa fa-steam"></i></a>
            <a href="https://www.youtube.com/user/TheRealmVids"><i className="fa fa-youtube"></i></a>
          </div>
        </div>
      )
      }
    } else {
      var bg = {
        backgroundImage: 'url(https://s3-eu-west-1.amazonaws.com/the-realm-ireland/assets/bgBody.jpg)'
      };
      homePage = (
        <div className="home-page wrapper">
          <div className="image" style={bg}>
          </div>

          <div className="social-accounts">
            <a href="https://www.facebook.com/therealmgaming" className="margin-right"><i className="fa fa-facebook"></i></a>
            <a href="https://twitter.com/RealmBurger" className="margin-right"><i className="fa fa-twitter"></i></a>
            <a href="http://steamcommunity.com/groups/TheRealmCommunity" className="margin-right"><i className="fa fa-steam"></i></a>
            <a href="https://www.youtube.com/user/TheRealmVids"><i className="fa fa-youtube"></i></a>
          </div>

          <div className="notfound-area">
            <div>
              <div className="text-center container">
                <div className="home-center-area">
                  <h1 className="site-header">Join a large, open and friendly Gaming Community</h1>
                  <h3 className="promo-text">Join { this.data.profilesNumber } members online today!</h3>
                  <a href="/signup/" className="btn btn-primary sharp top-buffer">Register Now</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div>
        { homePage }
      </div>
    )
  }
});
