import React from 'react';
import { RadioGroup } from './RadioGroup';

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

export const Vertical = () => <RadioGroup name="radio" id="radio" choices={defaultValues} />;

export const Horizontal = () => <RadioGroup horizontal name="radio" id="radio" choices={defaultValues} />;

export const Colors = () => (
  <RadioGroup colorOn="green" colorOff="red" name="radio" id="radio" choices={defaultValues} value="radio2" />
);

export const Sizes = () => (
  <RadioGroup
    iconSize={10}
    fontSize={10}
    name="radio"
    id="radio"
    choices={defaultValues}
    styles={{ CheckboxContainer: { margin: 0 }, Label: { marginLeft: 6 } }}
  />
);
