import React from 'react';
import { boolean, text } from '@storybook/addon-knobs';
import Box from '../Box';
import { Checkbox } from './Checkbox';

export default {
  title: 'Components|Forms/Checkbox',
  component: Checkbox,
};

export const Basic = () => (
  <Checkbox id="checkbox" name="checkbox" label="I'm a checkbox" disabled={boolean('Disabled', false)} />
);

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

export const FocusColor = () => (
  <>
    <Checkbox id="checkbox" name="checkbox" label="Default Focus Color" />
    <Checkbox id="checkbox" name="checkbox" label="Default Focus Color" />
    <Checkbox
      id="checkbox"
      name="checkbox"
      label="Custom Focus Color"
      colorFocus={text('Custom Focus Color', 'papayawhip')}
    />
  </>
);

export const Sizes = () => (
  <>
    <Checkbox id="checkbox" name="checkbox" label="I'm a checkbox" size="sm" />
    <Checkbox id="checkbox" name="checkbox" label="I'm a checkbox" />
  </>
);

export const Errors = () => (
  <Checkbox id="checkbox" name="checkbox" label="I'm a checkbox" size="sm" error="Something is seriously wrong" />
);
