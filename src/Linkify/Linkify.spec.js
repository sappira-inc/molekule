import React from 'react';
import { renderWithTheme } from '../../test/utils';
import Linkify from './Linkify';

describe('Linkify', () => {
  test('converts links to anchor tags', () => {
    const component = renderWithTheme(<Linkify>Hello! https://google.com is a cool site.</Linkify>);

    expect(component).toMatchSnapshot();
  });

  test('escapes HTML entities', () => {
    const component = renderWithTheme(
      <Linkify>{`<img src="fake.jpg" onError={() => {}} alt="hacker" /><span>heheh got hacked</span>`}</Linkify>
    );

    expect(component).toMatchSnapshot();
  });

  test('can receive linkStyle', () => {
    const component = renderWithTheme(
      <Linkify linkStyle={{ color: 'magenta' }}>Hello! https://google.com is a cool site.</Linkify>
    );

    expect(component).toMatchSnapshot();
  });
});
