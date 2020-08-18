import React from 'react';
import Button from './Button';

export default {
  title: 'Components|Button',
  component: Button,
};

export const All = () => (
  <Button.Group>
    <Button>Primary Button</Button>
    <Button variant="secondary">Secondary Button</Button>
    <Button variant="grey">Grey Button</Button>
    <Button variant="primaryText">Text Button</Button>
  </Button.Group>
);

export const Variants = () => (
  <Button.Group>
    <Button variant="primary">Primary</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="success">Successful</Button>
    <Button variant="danger">Dangerous</Button>
    <Button variant="warning">Cautious</Button>
    <Button variant="grey">Informational</Button>
  </Button.Group>
);

export const IconButtons = () => (
  <Button.Group>
    <Button leftIcon="alert">Primary Button</Button>
    <Button variant="success" rightIcon="alert-circle" rightIconProps={{ size: 24 }}>
      Success Button
    </Button>

    <Button leftIcon="alert" />
  </Button.Group>
);

export const ButtonGroups = () => (
  <Button.Group>
    <Button>One</Button>
    <Button>Two</Button>
    <Button variant="secondary">Three</Button>
  </Button.Group>
);

export const Sizes = () => (
  <Button.Group>
    <Button size="sm">Small Button</Button>
    <Button>Medium Button</Button>
    <Button size="lg">Large Button</Button>
  </Button.Group>
);

export const Loading = () => (
  <Button.Group>
    <Button loading>Loading...</Button>
    <Button loading variant="secondary">
      Loading...
    </Button>
  </Button.Group>
);

export const FullWidth = () => <Button block>Full Width</Button>;
