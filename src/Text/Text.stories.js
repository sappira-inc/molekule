import React from 'react';
import Text from './Text';

export default {
  title: 'Components|Text',
  component: Text,
};

export const Basic = () => (
  <>
    <Text>The basic text component renders as a {'<span />'}</Text>
    <Text as="h1">It can render as other tags, like this {'<H1/>'}</Text>
    <Text color="red">It can use colors from the theme</Text>
  </>
);
