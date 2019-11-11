import React from 'react';
import { ThemeProvider as SCThemeProvider } from 'styled-components';
import merge from 'lodash/mgerge';
import defaultTheme from '../theme';

const ThemeProvider = props => {
  const theme = merge(defaultTheme(props.theme), props.theme);

  return <SCThemeProvider theme={theme}>{props.children}</SCThemeProvider>;
};

export default ThemeProvider;
