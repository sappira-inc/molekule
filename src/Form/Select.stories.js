import React from 'react';
import { Select } from './Select';

export default {
  title: 'Components|Forms/Select',
  component: Select,
};
const defaultProps = {
  id: 'select',
  name: 'select',
  label: 'Example',
  options: [{ id: 1, value: 'male', label: 'Male' }, { id: 1, value: 'female', label: 'Female' }],
};

export const Basic = () => <Select {...defaultProps} />;
