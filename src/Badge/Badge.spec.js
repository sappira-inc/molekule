import React from 'react';
import { renderWithTheme } from '../../test/utils';
import Badge from './Badge';

test('Badge', () => {
  const component = renderWithTheme(<Badge>I&apos;m a badge!</Badge>);

  expect(component.toJSON()).toMatchSnapshot();
});
