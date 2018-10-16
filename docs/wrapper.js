import React, { Component } from 'react';
import { ThemeProvider } from '../src';

class App extends Component {
  render() {
    return <ThemeProvider>{this.props.children}</ThemeProvider>;
  }
}

export default App;
