import React from 'react';
import { renderWithTheme, fireEvent } from '../../test/utils';
import SearchInput from './SearchInput';

describe('<SearchInput />', () => {
  const renderInput = props => {
    const utils = renderWithTheme(<SearchInput placeholder="Search" label="Search" {...props} />);
    return {
      ...utils,
      input: utils.getByPlaceholderText('Search'),
      closeIcon: utils.queryByTestId('right-icon'),
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

  test('onChange gets called when supplied', () => {
    const handleChange = jest.fn();
    const { input } = renderInput({ onChange: handleChange });

    fireEvent.change(input, { target: { value: 'a' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(input.value).toBe('a');
  });

  test('value is cleared', async () => {
    const { input, closeIcon } = renderInput({ value: 'Example' });

    fireEvent.click(closeIcon);
    expect(input.value).toBe('');
  });
});
