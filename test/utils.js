import React from 'react';
import renderer from 'react-test-renderer';
import ThemeProvider from '../src/ThemeProvider';

export function renderWithTheme(component, options) {
  return renderer.create(<ThemeProvider>{component}</ThemeProvider>, options);
}
