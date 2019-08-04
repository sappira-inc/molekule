import React from 'react';
import { createGlobalStyle, css } from 'styled-components';
import { ThemeProvider } from '../src';

const GlobalStyle = createGlobalStyle`
  ${({ theme }) => css`
    ${theme.fonts.map(
      font => css`
                @font-face {f
                  font-family: "${font.name}";
                  font-weight: ${font.weight || 500};
                  font-style: normal;
                  src: url(${font.url}) format("${font.format || 'woff2'}");
                }
              `
    )}

    * {
      font-family: "${theme.typography.bodyFontFamily}", sans-serif !important;
    }

    h1 {
      font-family: "${theme.typography.headerFontFamily}", serif !important;
      font-size: 38px;
      color: ${theme.colors.black};
    }
  `}
`;

export default ({ children }) => (
  <ThemeProvider>
    <>
      <GlobalStyle />
      {children}
    </>
  </ThemeProvider>
);
