import React from 'react';
import { render } from 'react-testing-library';
import ThemeProvider from '../src/ThemeProvider';

export function renderWithTheme(component, options = {}) {
  return render(<ThemeProvider>{component}</ThemeProvider>, options);
}

export * from 'react-testing-library';
