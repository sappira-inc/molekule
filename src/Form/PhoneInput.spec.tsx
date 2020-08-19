import React from 'react';
import { renderWithTheme, fireEvent, act } from '../test/utils';
import PhoneInput from './PhoneInput';
import { ThemeProvider } from '../ThemeProvider';

describe('<PhoneInput />', () => {
  const renderInput = (props?: any): any => {
    const utils = renderWithTheme(<PhoneInput placeholder="Input" {...props} />);
    return {
      ...utils,
      input: utils.getByPlaceholderText('Input'),
    };
  };

  const updateInputValue = (input: any, value: any) => {
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

    fireEvent.keyDown(input, { key: 'Backspace' });
    updateInputValue(input, '(408');
    expect(input.value).toEqual('(408');
  });

  test('updates internally when value prop changes', () => {
    const { input, rerender } = renderInput({ value: '(408)' });
    rerender(
      <ThemeProvider>
        <PhoneInput placeholder="input" value="4087213456" />
      </ThemeProvider>
    );
    expect(input.value).toEqual('(408) 721-3456');
  });

  test('handles country codes', () => {
    const { input } = renderInput({ value: '14088675309' });

    expect(input.value).toEqual('1 (408) 867-5309');
  });

  describe('truncates a number that is too long', () => {
    test('with country code', () => {
      const { input } = renderInput({ value: '1408867530903133' });

      expect(input.value).toEqual('1 (408) 867-5309');
    });

    test('without country code', () => {
      const { input } = renderInput({ value: '408867530903133' });

      expect(input.value).toEqual('(408) 867-5309');
    });
  });
});
