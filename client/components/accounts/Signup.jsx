Signup = React.createClass({
  handleSubmit(event, text) {
    event.preventDefault();

    var coverArray = [
      'http://smashgn.de/images/slider/image_1920x750.jpg',
      'http://madewith.unity.com/sites/default/files/game-developer/header-image/typoman.jpg',
      'http://madewith.unity.com/sites/default/files/game/header-image/desktop/manifoldgarden_game_banner_1.png',
      'http://madewith.unity.com/sites/default/files/game-developer/header-image/header_36.jpg',
      'http://meadowhillinteractive.com/georgeng/wp-content/uploads/2014/03/ConceptArt02.jpg',
      'https://cdn0.artstation.com/p/assets/images/images/000/560/532/large/tommy-scott-home-is-where-the-swamp-is-fb.jpg?1426787043'
    ];

    email = event.target.email.value;
    username = event.target.username.value;
    password = event.target.password.value,
    passwordConfirm = event.target.passwordConfirm.value;
    cover = coverArray[Math.floor(Math.random() * coverArray.length)];

    if (password != passwordConfirm) {
      toastr.error("Passwords do not match")
    }
    else {
      Accounts.createUser({
        email: email,
        username: username,
        password: password,
        profile: {
          avatar: "http://1.gravatar.com/avatar/ad516503a11cd5ca435acc9bb6523536?s=512",
          bio: "This user doesn't have a biography yet.",
          cover: cover
        }
      }, function(err) {
        if (err) {
          toastr.error(err.reason)
        }
        else {
          Meteor.call('addRole');
          FlowRouter.go("/edit-profile");
        }
      });
    }
  },

  render() {
    var bg = {
      backgroundImage: 'url(bg.jpg)'
    };
    return (
      <div className="signup">
        <div className="image" style={bg}>
        </div>

        <div className="login-area">
          <div>
            <div className="text-center container">
              <div className="login-form">
                <h1 className="login-header">Sign Up</h1>
                <form id="login" className="login" onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="username">Email</label>
                    <input type="email" name="email" className="form-control" placeholder="Email" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="username" name="username" className="form-control" placeholder="Username" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password"><span className="pull-left">Password</span></label>
                    <input type="password" name="password" className="form-control" placeholder="Password" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="passwordConfirm"><span className="pull-left">Confirm Password</span></label>
                    <input type="password" name="passwordConfirm" className="form-control" placeholder="Confirm Password" />
                  </div>
                  <div className="form-group top-buffer">
                    <input type="submit" className="btn btn-lg btn-primary sharp" value="Sign Up" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
