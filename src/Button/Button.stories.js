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

// hi
export const Sizes = () => (
  <Button.Group>
    <Button size="sm">I'm Small</Button>
    <Button>I'm Normal</Button>
    <Button size="lg">I'm Large</Button>
  </Button.Group>
);

export const Loading = () => (
  <Button.Group>
    <Button loading>I'm loading</Button>
    <Button loading variant="secondary">
      I'm loading
    </Button>
  </Button.Group>
);
