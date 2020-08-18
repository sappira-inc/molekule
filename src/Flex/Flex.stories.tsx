import React from 'react';

import Box from '../Box';
import Flex from './Flex';

export default {
  title: 'Components|Flex',
  component: Flex,
};

export const Basic = () => (
  <Flex>
    <Box m={2} p={2} flex={1} style={{ backgroundColor: 'gainsboro' }}>
      I take up the remaining space
    </Box>
    <Box m={2} p={2} style={{ backgroundColor: 'gainsboro' }}>
      I am a Box
    </Box>
    <Box m={2} p={2} style={{ backgroundColor: 'gainsboro' }}>
      I am Box
    </Box>
  </Flex>
);
