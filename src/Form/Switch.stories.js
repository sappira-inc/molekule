import React from 'react';
import { Switch } from './Switch';

export default {
  title: 'Components|Forms/Switch',
  component: Switch,
};

export const Basic = () => <Switch />;

export const Colors = () => <Switch variant="red" />;

export const Sizes = () => <Switch size={32} />;
