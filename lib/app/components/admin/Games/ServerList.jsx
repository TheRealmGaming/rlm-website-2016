import React from 'react';

ServerList = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    Meteor.subscribe("servers");
    return {
      servers: Servers.find().fetch()
    }
  },

  getInitialState: function() {
    return {
      inputValue: "",
      rulesValue: "",
      gameCover: "",
      ipValue: "",
      managersValue: "",
      websiteValue: ""
    };
  },

  handleInputChange: function(event) {
    this.setState({
      inputValue: event.target.value
    });
  },

  handleRulesChange: function(event) {
    this.setState({
      rulesValue: event.target.value
    });
  },

  handleCoverChange: function(event) {
    this.setState({
      gameCover: event.target.value
    });
  },

  handleIpChange: function(event) {
    this.setState({
      ipValue: event.target.value
    });
  },

  handleManagerChange: function(event) {
    this.setState({
      managersValue: event.target.value
    });
  },

  handleWebsiteChange: function(event) {
    this.setState({
      websiteValue: event.target.value
    });
  },

  addServer(event) {
    event.preventDefault();

    server = {
      title: event.target.addTheServer.value,
      rules: event.target.serverRules.value,
      cover: event.target.gameCover.value,
      address: event.target.serverIp.value,
      managers: event.target.managers.value,
      website: event.target.website.value
    }

    game = event.target.addTheServer.value;
    rules = event.target.serverRules.value;

    if(!game || !rules) {
      Bert.alert({title: "Some fields are missing", type: 'danger', style: 'growl-top-right'});
    } else {
      Meteor.call('AddServer', server);
        Bert.alert({title: "Game added", type: 'success', icon: 'fa-check', style: 'growl-top-right'});
        this.setState({
          inputValue: "",
          rulesValue: "",
          gameCover: "",
          ipValue: "",
          managersValue: "",
          websiteValue: ""
        });
      }
  },

  theContent() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center">Games</h1>
          </div>
          <form onSubmit={ this.addServer }>
            <div className="col-md-12 top-buffer">
              <div className="form-group">
                <input
                  className="form-control sharp"
                  name="addTheServer"
                  type='text'
                  value={this.state.inputValue}
                  onChange={this.handleInputChange}
                  placeholder="Add Game"
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control sharp"
                  name="gameCover"
                  type='text'
                  value={this.state.coverValue}
                  onChange={this.handleCoverChange}
                  placeholder="Add Game Cover URL (eg: https://i.ytimg.com/vi/FW9vsrPWujI/maxresdefault.jpg)"
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control sharp"
                  name="serverIp"
                  type='text'
                  value={this.state.ipValue}
                  onChange={this.handleIpChange}
                  placeholder="Server Address (Optional)"
                />
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <input
                      className="form-control sharp"
                      name="managers"
                      type='text'
                      value={this.state.managersValue}
                      onChange={this.handleManagerChange}
                      placeholder="Add managers for this game separated by a comma (Optional)"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <input
                      className="form-control sharp"
                      name="website"
                      type='text'
                      value={this.state.websiteValue}
                      onChange={this.handleWebsiteChange}
                      placeholder="Server website (Optional)"
                    />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <textarea
                className="form-control"
                name="serverRules"
                value={this.state.rulesValue}
                onChange={this.handleRulesChange}
                placeholder="Server Rules or description (Use Markdown)"
                >
                </textarea>
              </div>
              <div className="form-group">
                <PrimaryButton label="Add Game Server" />
              </div>
            </div>
          </form>
          <div className="col-md-12 categories">
            <ServerMap servers={ this.data.servers } />
          </div>
        </div>
      </div>
    );
  },

  noAuthMessage() {
    Bert.alert({title: "Not Authorised to view this page", type: 'danger', style: 'growl-top-right'});
    FlowRouter.go('/');
  },

  authInProgress() {
    Meteor.loggingIn();
  },

  render() {
    return (
      <div className="right-content-area">
        {this.authInProgress()?  <p>Loading...</p> : this.theContent()}
      </div>
    );
  }
});
