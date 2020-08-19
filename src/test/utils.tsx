import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from '../ThemeProvider';

export function renderWithTheme(component: any, options = {}) {
  return render(<ThemeProvider>{component}</ThemeProvider>, options);
}

export * from '@testing-library/react';
