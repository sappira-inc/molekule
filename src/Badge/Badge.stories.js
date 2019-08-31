import React from 'react';
import Badge from './Badge';

export default {
  title: 'Components|Badge',
  component: Badge,
};

export const Basic = () => <Badge>Default Badge</Badge>;

export const Variants = () => (
  <>
    <Badge>Default</Badge>
    <Badge variant="success" ml={2}>
      Success
    </Badge>
    <Badge variant="danger" ml={2}>
      Danger
    </Badge>
    <Badge variant="warning" ml={2}>
      Caution
    </Badge>
  </>
);

export const Sizes = () => (
  <>
    <Badge size="sm">Small</Badge>
    <Badge ml={2}>Medium</Badge>
    <Badge size="lg" ml={2}>
      Large
    </Badge>
  </>
);
