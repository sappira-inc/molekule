import React from 'react';
import { DateInput } from './DateInput';

export default {
  title: 'Components|Forms/DateInput',
  component: DateInput,
};

export const Basic = () => <DateInput placeholder="Date of Birth" label="Date of Birth" initialValue="04/01/2001" />;
