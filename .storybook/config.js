import React from 'react';
import { configure, addDecorator,addParameters } from '@storybook/react';
import 'storybook-chromatic';
import { withA11y } from '@storybook/addon-a11y';
import { withKnobs } from '@storybook/addon-knobs';
import { createGlobalStyle } from 'styled-components';
import { ThemeProvider } from '../src';
import theme from './theme';

const GlobalStyle = createGlobalStyle`
    @font-face {
      font-family: "Tiempos";
      font-weight: 500;
      font-style: normal;
      src: url(//cdn.heydoctor.com/fonts/TiemposHeadlineWeb-Semibold.woff2) format('woff2');
    }

    * {
      font-family: "Avenir", sans-serif !important;
      box-sizing: border-box;
    }

    h1, h2 {
      font-family: "Tiempos", serif !important
    }
`;

addParameters({
  options: {
    theme,
    panelPosition: 'bottom'
  },
});

addDecorator(withKnobs);
addDecorator(withA11y);
addDecorator(story => (
  <ThemeProvider>
    <>
      <GlobalStyle />
      {story()}
    </>
  </ThemeProvider>
));

// automatically import all files ending in *.stories.js
configure(
  [
    require.context('../src', true, /\.stories\.mdx$/),
    require.context('../src', true, /\.stories\.js$/),
  ],
  module
);
