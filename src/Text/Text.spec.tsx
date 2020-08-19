import React from 'react';
import { renderWithTheme } from '../test/utils';
import Text from './Text';

describe('Text', () => {
  test('default to <span>', () => {
    const { asFragment } = renderWithTheme(<Text>Hey!</Text>);
    expect(asFragment()).toMatchSnapshot();
  });

  test('"as" prop', () => {
    const { asFragment } = renderWithTheme(<Text as="h1">Hey!</Text>);
    expect(asFragment()).toMatchSnapshot();
  });

  test('"color" prop', () => {
    const { asFragment } = renderWithTheme(<Text color="red">Hey!</Text>);
    expect(asFragment()).toMatchSnapshot();
  });
});
