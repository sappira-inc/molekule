import React from 'react';
import { renderWithTheme } from '../../test/utils';
import Linkify from './Linkify';

describe('Linkify', () => {
  test('converts links to anchor tags', () => {
    const component = renderWithTheme(<Linkify>Hello! https://google.com is a cool site.</Linkify>);

    expect(component).toMatchSnapshot();
  });

  test('escapes HTML entities', () => {
    const component = renderWithTheme(<Linkify>{`<span onmouseover=alert('XSS')></span>`}</Linkify>);

    expect(component).toMatchSnapshot();
  });
});
