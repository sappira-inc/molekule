import React from 'react';
import { renderWithTheme, fireEvent, wait, waitForDomChange, act } from '../../test/utils';
import DateInput from './DateInput';

describe('<Dropdown />', () => {
  const render = props => renderWithTheme(<DateInput placeholder="Input" {...props} />);

  test('only renders trigger on mount', () => {
    const utils = render();
    expect(utils.asFragment()).toMatchSnapshot();
  });

  test('initally sets the value', () => {
    const placeholder = 'Date of Birth';
    const value = '12/05/1992';
    const utils = render({
      value,
      placeholder,
    });
    const input = utils.getByPlaceholderText(placeholder);
    expect(input.value).toEqual(value);
  });

  test('prefixes with a 0 in months below 10', () => {
    const utils = render();
    const input = utils.getByPlaceholderText('Input');
    act(() => {
      fireEvent.change(input, { target: { value: '4' } });
    });
    expect(input.value).toEqual('04/');
  });
});
