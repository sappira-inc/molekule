import React from 'react';
import Icon from './Icon';

export default {
  title: 'Components|Icon',
  component: Icon,
};

export const Basic = () => (
  <>
    <Icon name="alert-circle" color="red" size={40} />
    <Icon name="account" color="green" size={40} />
  </>
);
