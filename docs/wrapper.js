import React, { Component } from 'react';
import { createGlobalStyle } from 'styled-components';
import { ThemeProvider } from '../src';

const GlobalStyle = createGlobalStyle `
  * {
    box-sizing: border-box;
  }
`

class App extends Component {
  render() {
    return (
      <>
        <GlobalStyle />
        <ThemeProvider>{this.props.children}</ThemeProvider>
      </>
    );
  }
}

export default App;
