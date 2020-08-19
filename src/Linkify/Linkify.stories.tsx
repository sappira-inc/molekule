import React from 'react';
import Linkify from './Linkify';

export default {
  title: 'Components|Linkify',
  component: Linkify,
};

export const Basic = () => {
  const markdownString = `Checkout http://google.com. <span onmouseover="alert('yo')">Another</span> one that's not so great is http://bing.com. You could also checkout duckduckgo.com if you're into that whole privacy thing. <img src="fake.jpg" onError={() => {}} alt="hacker" /> Oh, and you should also check out https://heydoctor.co. And this [markdown link](https://heydoctor.com)\n\n    I used to be interpreted as a code block but I shouldn't be anymore!!! And strings can have multiple       spaces      inside`;

  return <Linkify linkStyle={{ color: 'magenta' }} source={markdownString} />;
};
