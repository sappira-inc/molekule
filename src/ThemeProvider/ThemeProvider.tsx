import React, { FC } from 'react';
import { ThemeProvider as SCThemeProvider, DefaultTheme } from 'styled-components';
import merge from 'lodash/merge';
import { createTheme } from '../createTheme';

interface ThemeProviderProps {
  theme?: Partial<DefaultTheme>;
}

export const ThemeProvider: FC<ThemeProviderProps> = props => {
  const theme = merge(createTheme(props.theme), props.theme);

  return <SCThemeProvider theme={theme}>{props.children}</SCThemeProvider>;
};
