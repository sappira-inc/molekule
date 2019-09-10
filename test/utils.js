import React from 'react';
import { render } from '@testing-library/react';
import ThemeProvider from '../src/ThemeProvider';

export function renderWithTheme(component, options = {}) {
  return render(<ThemeProvider>{component}</ThemeProvider>, options);
}

export * from '@testing-library/react';
