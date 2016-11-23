import React, { Component } from 'react';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="app-class container-fluid">
        {this.props.children}
      </div>
    );
  }
}

export default App;
