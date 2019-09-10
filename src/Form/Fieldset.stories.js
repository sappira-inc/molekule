import React from 'react';
import Fieldset from './Fieldset';
import Input from './Input';

export default {
  title: 'Components|Forms/Fieldset',
  component: Fieldset,
};

export const Basic = () => (
  <Fieldset legend="Profile Information">
    <Input label="First Name" />
    <Input label="Last Name" />
  </Fieldset>
);
