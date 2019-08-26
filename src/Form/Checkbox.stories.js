import React from 'react';
import { Checkbox } from './Checkbox';

export default {
  title: 'Components|Forms/Checkbox',
  component: Checkbox,
};

export const Basic = () => <Checkbox id="checkbox" name="checkbox" />;

export const Colors = () => (
  <>
    <Checkbox id="checkbox" name="checkbox" colorOn="green" colorOff="red" />
    <Checkbox id="checkbox" name="checkbox" colorOn="green" colorOff="red" value />
  </>
);
