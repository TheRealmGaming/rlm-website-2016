import React from 'react';

GamesPage = React.createClass({
  mixins: [ReactMeteorData],

  // Load items
  getMeteorData () {
    Meteor.subscribe("servers");
    return {
      server: Servers.findOne({ slug: this.props.slug })
    }
  },

  componentDidMount() {
    var title = this.data.server.title + " | The Realm Gaming";
    DocHead.setTitle(title);

    var metaInfo = {name: "description", content: this.data.server.title + " at The Realm Gaming"};
    DocHead.addMeta(metaInfo);

    var fragment = {name: "fragment", content: "!"};
    DocHead.addMeta(fragment);
  },

  renderAddress() {
    if( this.data.server.address ) {
      return <p><b>Server Address:</b> { this.data.server.address }</p>;
    } else {
      return;
    }
  },

  renderManagers() {
    if( this.data.server.managers ) {
      return <p><b>Managers:</b> { this.data.server.managers }</p>;
    } else {
      return;
    }
  },

  renderWebsite() {
    var smallMargin = { marginTop: '10px' };
    if( this.data.server.website ) {
      return <a className="btn btn-success sharp" style={ smallMargin } href={ this.data.server.website }>Server Website</a>;
    } else {
      return;
    }
  },

  renderDesc() {
    desc = parseMarkdown( this.data.server.rules );
    return <div dangerouslySetInnerHTML={{__html: desc}}></div>;
  },

  render() {
    var divStyle = {
      backgroundImage: 'url(' + this.data.server.cover + ')'
    }
    return (
      <div className="wrapper">
        <div className="cover-photo" style={ divStyle }>
        </div>
        <div className="profile-top container">
          <h1 className="text-center white shadowed">{ this.data.server.title }</h1>
        </div>
        <div className="container game-container">
          <div className="row">
            <div className="col-md-3">
              <div className="panel panel-default sharp bio">
                <div className="panel-body">
                  <h3 className="text-center">Info</h3>
                  <hr></hr>
                  { this.renderAddress() }
                  { this.renderManagers() }
                  { this.renderWebsite() }
                </div>
              </div>
            </div>
            <div className="col-md-9">
              { this.renderDesc() }
            </div>
          </div>
        </div>
      </div>
    )
  }
});
