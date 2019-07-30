import React from 'react';
import { renderWithTheme } from '../../test/utils';
import SearchInput from './SearchInput';
import ThemeProvider from '../ThemeProvider';

describe('<SearchInput />', () => {
  const renderInput = props => {
    const utils = renderWithTheme(<SearchInput placeholder="Search" label="Search" {...props} />);
    return {
      ...utils,
      input: utils.getByPlaceholderText('Search'),
    };
  };

  test('snapshot', () => {
    const { asFragment } = renderInput();
    expect(asFragment()).toMatchSnapshot();
  });

  test('initally sets the value', () => {
    const value = 'Search item';
    const { input } = renderInput({ value });

    expect(input.value).toEqual('Search item');
  });

  test('updates internally when value prop changes', () => {
    const { input, rerender } = renderInput({ value: 'Searching' });
    rerender(
      <ThemeProvider>
        <SearchInput placeholder="Search" />
      </ThemeProvider>
    );
    expect(input.value).toEqual('Searching');
  });
});
