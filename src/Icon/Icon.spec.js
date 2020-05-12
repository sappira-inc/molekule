import React from 'react';
import { renderWithTheme } from '../../test/utils';
import Icon from './Icon';

describe('<Icon />', () => {
  test('renders', () => {
    const { asFragment } = renderWithTheme(<Icon name="message" />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders with passed class name', () => {
    const { asFragment } = renderWithTheme(<Icon className="bagels" name="message" />);

    expect(asFragment()).toMatchSnapshot();
  });
});
