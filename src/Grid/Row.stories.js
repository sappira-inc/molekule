import React from 'react';
import Row from './Row';
import Container from './Container';
import Column from './Column';
import ExampleBox from './ExampleBox';

export default {
  title: 'Components|Grid/Row',
  component: Row,
};

export const Basic = () => (
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

export const Reversed = () => (
  <Container>
    <Row reverse>
      <Column>
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

export const Vertical = () => (
  <Container>
    <Row vertical>
      <Column>
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
