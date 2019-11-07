import React from 'react';
import Accordion from './Accordion';
import Box from '../Box';
import Text from '../Text';

export default {
  title: 'Components|Accordion',
  component: Accordion,
};

const Title = ({ children }) => <Text fontWeight={500}>{children}</Text>;

const Content = ({ children }) => (
  <Box ml={3} p={2} backgroundColor="greyLight">
    {children}
  </Box>
);

export const Basic = () => (
  <Accordion
    items={[
      {
        title: <Title>Item One</Title>,
        content: <Content>Item One Content</Content>,
      },
      {
        title: <Title>Item Two</Title>,
        content: <Content>Item Two Content</Content>,
      },
      {
        title: <Title>Item Three</Title>,
        content: <Content>I'm open by default!</Content>,
        isOpenByDefault: true,
      },
    ]}
  />
);
