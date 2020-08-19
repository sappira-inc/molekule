import React from 'react';
import { renderWithTheme } from '../test/utils';
import Linkify from './Linkify';

describe('Linkify', () => {
  test('converts links to anchor tags', () => {
    const { asFragment } = renderWithTheme(<Linkify source="Hello! https://google.com is a cool site." />);

    expect(asFragment()).toMatchSnapshot();
  });

  test('escapes HTML entities', () => {
    const { asFragment } = renderWithTheme(
      <Linkify source={`<img src="fake.jpg" onError={() => {}} alt="hacker" /><span>heheh got hacked</span>`} />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('can receive linkStyle', () => {
    const { asFragment } = renderWithTheme(
      <Linkify linkStyle={{ color: 'magenta' }} source="Hello! https://google.com is a cool site." />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('can render markdown', () => {
    const { asFragment } = renderWithTheme(<Linkify source="[this is a link](http://google.com)" />);

    expect(asFragment()).toMatchSnapshot();
  });

  test('reformats code blocks', () => {
    const linkContent = "dear doctor,\n\n    I'm \"5'9\" and 160'";
    const { asFragment } = renderWithTheme(<Linkify source={linkContent} />);

    expect(asFragment()).toMatchSnapshot();
  });
});
