import React from 'react';
import { CheckboxGroup } from './CheckboxGroup';

export default {
  title: 'Components|Forms/CheckboxGroup',
  component: CheckboxGroup,
};

const choices = [
  {
    id: 1,
    value: 'test',
    label: 'Checkbox 1',
  },
  {
    id: 2,
    value: 'test2',
    label: 'Checkbox 2',
  },
];

export const Vertical = () => <CheckboxGroup horizontal name="checkboxes" id="checkboxes" choices={choices} />;

export const Horizontal = () => <CheckboxGroup horizontal name="checkboxes" id="checkboxes" choices={choices} />;

export const Exclusivity = () => (
  <CheckboxGroup
    horizontal
    name="checkboxes"
    id="checkboxes"
    choices={[
      ...choices,
      {
        id: 3,
        value: 'neither',
        label: 'Neither',
        exclusive: true,
      },
    ]}
  />
);
