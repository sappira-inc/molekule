import React from 'react';
import { renderWithTheme, fireEvent, act } from '../../test/utils';
import DateInput from './DateInput';
import ThemeProvider from '../ThemeProvider';

describe('<DateInput />', () => {
  const renderInput = props => {
    const utils = renderWithTheme(<DateInput placeholder="Input" {...props} />);
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
    const value = '12/05/1992';
    const { input } = renderInput({ value });

    expect(input.value).toEqual(value);
  });

  test("prefixes month and day block with a 0 when second number isn't possible", () => {
    const { input } = renderInput();

    updateInputValue(input, '4');
    expect(input.value).toEqual('04/');

    updateInputValue(input, '04/4');
    expect(input.value).toEqual('04/04/');
  });

  test("doesn't prefix when second number is possible", () => {
    const { input } = renderInput();

    updateInputValue(input, '1');
    expect(input.value).toEqual('1');

    updateInputValue(input, '12/1');
    expect(input.value).toEqual('12/1');
  });

  test('truncates a date string that is too long', () => {
    const { input } = renderInput({ value: '12/05/19922222' });

    expect(input.value).toEqual('12/05/1992');
  });

  // @FIXME: Tried to test actual backspace with fireEvent.keyDown here to no avail
  test('can remove trailing slash when backspacing', () => {
    const { input } = renderInput({ value: '12/05/' });

    updateInputValue(input, '12/05');
    expect(input.value).toEqual('12/05');
  });

  test('updates internally when value prop changes', () => {
    const { input, rerender } = renderInput({ value: '01/05' });
    rerender(
      <ThemeProvider>
        <DateInput placeholder="input" value="01/09/1990" />
      </ThemeProvider>
    );
    expect(input.value).toEqual('01/09/1990');
  });
});
