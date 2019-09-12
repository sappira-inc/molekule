import React from 'react';
import { boolean } from '@storybook/addon-knobs';
import { RadioGroup } from './RadioGroup';
import Box from '../Box';

export default {
  title: 'Components|Forms/RadioGroup',
  component: RadioGroup,
};

const defaultValues = [
  {
    id: 1,
    value: 'radio1',
    name: 'radio1',
    label: 'Radio 1',
  },
  {
    id: 2,
    value: 'radio2',
    name: 'radio2',
    label: 'Radio 2',
  },
];

export const Vertical = () => (
  <RadioGroup name="radio" id="radio" choices={defaultValues} disabled={boolean('Disabled', false)} />
);

export const Horizontal = () => <RadioGroup horizontal name="radio" id="radio" choices={defaultValues} />;

export const Colors = () => (
  <RadioGroup colorOn="green" colorOff="red" name="radio" id="radio" choices={defaultValues} value="radio2" />
);

export const Sizes = () => (
  <>
    <Box mb={24}>
      <RadioGroup name="radio" id="radio" size="sm" choices={defaultValues} />
    </Box>
    <Box mb={24}>
      <RadioGroup name="radio" id="radio" choices={defaultValues} />
    </Box>
  </>
);
