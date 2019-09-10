import React from 'react';
import Container from './Container';

export default {
  title: 'Components|Grid/Container',
  component: Container,
};

export const Basic = () => (
  <Container>
    <div>I'm a container with content</div>
  </Container>
);

export const Fluid = () => (
  <Container fluid>
    <div>I'm a fluid container so I take up all the space I'm given</div>
  </Container>
);
