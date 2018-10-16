import React, { Component } from 'react';
import { ThemeProvider } from '../src';

class App extends Component {
  componentDidMount() {
    if (!this.constructor.injected) {
      this.constructor.injected = true;
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.href = 'https://cdn.materialdesignicons.com/2.8.94/css/materialdesignicons.min.css';
      document.head.appendChild(link);
    }
  }

  render() {
    return <ThemeProvider>{this.props.children}</ThemeProvider>;
  }
}

export default App;
