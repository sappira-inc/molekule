import React from 'react';
import Row from './Row';
import Container from './Container';
import Column from './Column';
import ExampleBox from './ExampleBox';

export default {
  title: 'Components|Grid/Column',
  component: Column,
};

export const EqualWidth = () => (
  <Container>
    <Row>
      <Column>
        <ExampleBox>Column</ExampleBox>
      </Column>
      <Column>
        <ExampleBox>Column</ExampleBox>
      </Column>
      <Column>
        <ExampleBox>Column</ExampleBox>
      </Column>
    </Row>
  </Container>
);

export const UnequalWidth = () => (
  <Container>
    <Row>
      <Column xs={8}>
        <ExampleBox>Column</ExampleBox>
      </Column>
      <Column>
        <ExampleBox>Column</ExampleBox>
      </Column>
      <Column>
        <ExampleBox>Column</ExampleBox>
      </Column>
    </Row>
  </Container>
);

export const Breakpoints = () => (
  <Container>
    <Row>
      <Column xs={8} sm={12} md={6} lg={12}>
        <ExampleBox>Column</ExampleBox>
      </Column>
      <Column>
        <ExampleBox>Column</ExampleBox>
      </Column>
      <Column>
        <ExampleBox>Column</ExampleBox>
      </Column>
    </Row>
  </Container>
);

export const Ordering = () => (
  <Container>
    <Row>
      <Column order={12}>
        <ExampleBox>1</ExampleBox>
      </Column>
      <Column>
        <ExampleBox>2</ExampleBox>
      </Column>
      <Column>
        <ExampleBox>3</ExampleBox>
      </Column>
    </Row>
  </Container>
);

export const Offsets = () => (
  <Container>
    <Row>
      <Column xs={4} xsOffset={2}>
        <ExampleBox>1</ExampleBox>
      </Column>
    </Row>
  </Container>
);
