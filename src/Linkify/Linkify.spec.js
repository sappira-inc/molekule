import React from 'react';
import { renderWithTheme } from '../../test/utils';
import Linkify from './Linkify';

describe('Linkify', () => {
  test('converts links to anchor tags', () => {
    const { asFragment } = renderWithTheme(<Linkify>Hello! https://google.com is a cool site.</Linkify>);

    expect(asFragment()).toMatchSnapshot();
  });

  test('escapes HTML entities', () => {
    const { asFragment } = renderWithTheme(
      <Linkify>{`<img src="fake.jpg" onError={() => {}} alt="hacker" /><span>heheh got hacked</span>`}</Linkify>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('can receive linkStyle', () => {
    const { asFragment } = renderWithTheme(
      <Linkify linkStyle={{ color: 'magenta' }}>Hello! https://google.com is a cool site.</Linkify>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('can render markdown', () => {
    const { asFragment } = renderWithTheme(<Linkify>[this is a link](http://google.com)</Linkify>);

    expect(asFragment()).toMatchSnapshot();
  });
});
