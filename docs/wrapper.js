import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { ThemeProvider } from '../src';

const GlobalStyle = createGlobalStyle`
    @font-face {
      font-family: "Tiempos";
      font-weight: 500;
      font-style: normal;
      src: url(//cdn.heydoctor.com/fonts/TiemposHeadlineWeb-Semibold.woff2) format('woff2');
    }

    * {
      font-family: "Avenir", sans-serif !important;
    }

    h1 {
      font-family: "Tiempos", serif !important;
      font-size: 38px;
    }
`;

export default ({ children }) => (
  <ThemeProvider>
    <>
      <GlobalStyle />
      {children}
    </>
  </ThemeProvider>
);
