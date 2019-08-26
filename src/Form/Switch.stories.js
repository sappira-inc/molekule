import React from 'react';
import { Switch } from './Switch';

export default {
  title: 'Components|Forms/Switch',
  component: Switch,
};

const defaultProps = {
  id: 'switch',
  name: 'switch',
};

export const Basic = () => <Switch {...defaultProps} />;

export const Colors = () => <Switch {...defaultProps} variant="red" />;

export const Sizes = () => <Switch {...defaultProps} size={64} inset={8} />;
