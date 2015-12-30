// App component - represents the whole app
App = React.createClass({
  // Render the page!
  render() {
    return (
      <div>
        <AppHeader />

        <main>
          {this.props.content}
        </main>
      </div>
    );
  }
});
