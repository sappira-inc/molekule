import React from 'react';
import Box from '../Box';
import { Checkbox } from './Checkbox';

export default {
  title: 'Components|Forms/Checkbox',
  component: Checkbox,
};

export const Basic = () => <Checkbox id="checkbox" name="checkbox" label="I'm a checkbox" />;

export const LongText = () => (
  <Box width={300}>
    <Checkbox
      id="checkbox"
      name="checkbox"
      label="'Cause I've been goin' off and they don't know when it's stoppin'
And when you get to toppin', I see that you've been learnin'"
    />
  </Box>
);

export const Colors = () => (
  <Checkbox id="checkbox" name="checkbox" colorOn="green" colorOff="red" label="Red Off, Green On" />
);
