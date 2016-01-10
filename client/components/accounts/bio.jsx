  // Bio component
  Bio = React.createClass({
    mixins: [ReactMeteorData],

    getMeteorData() {
      return {
        currentUser: Meteor.user()
      }
    },

    handleChange: function(event) {
      this.setState({value: event.target.value});
    },

    bioSubmit(event) {
      event.preventDefault();

      // Parse the input
      var bioInput = document.getElementById( "bio-field" ).value;

      Meteor.users.update({
        _id: Meteor.userId()
      }, {
        $set: {
          'profile.bio': bioInput
        }
      });
      toastr.success('Bio updated');
    },

    render: function() {
      return (
        <form onSubmit={this.bioSubmit}>
          <div className="form-group bio-field">
            <h3>Bio</h3>
            <textarea className="form-control sharp fast-trans" id="bio-field" defaultValue={ this.data.currentUser.profile.bio } onChange={ this.handleChange }></textarea>
          </div>
          <button type="submit" className="btn btn-primary sharp">Update Bio</button>
          <hr></hr>
        </form>
      )
    }
  });
