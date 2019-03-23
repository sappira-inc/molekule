import React from 'react';
import { renderWithTheme, fireEvent, act } from '../../test/utils';
import PhoneInput from './PhoneInput';

describe('<PhoneInput />', () => {
  const renderInput = props => {
    const utils = renderWithTheme(<PhoneInput placeholder="Input" {...props} />);
    return {
      ...utils,
      input: utils.getByPlaceholderText('Input'),
    };
  };

  const updateInputValue = (input, value) => {
    act(() => {
      fireEvent.change(input, { target: { value } });
    });
  };

  test('snapshot', () => {
    const { asFragment } = renderInput();
    expect(asFragment()).toMatchSnapshot();
  });

  test('initally sets the value', () => {
    const value = '4087213456';
    const { input } = renderInput({ value });

    expect(input.value).toEqual('(408) 721-3456');
  });

  test('area code and hyphens', () => {
    const { input } = renderInput({ value: '408' });

    expect(input.value).toEqual('(408)');

    updateInputValue(input, '(408) 7214');
    expect(input.value).toEqual('(408) 721-4');
  });

  test('can delete paren', () => {
    const { input } = renderInput({ value: '(408)' });

    updateInputValue(input, '(408');
    expect(input.value).toEqual('(408');
  });
});
