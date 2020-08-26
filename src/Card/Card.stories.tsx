import React from 'react';
import Card from './Card';

export default {
  title: 'Components|Card',
  component: Card,
};

export const Basic = () => (
  <Card>
    <Card.Header>Header</Card.Header>
    <Card.Body>
      A card is a flexible and extensible content container. It includes options for headers and footers, a wide variety
      of content, contextual background colors, and powerful display options.
    </Card.Body>
    <Card.Footer>Footer</Card.Footer>
  </Card>
);

export const BodyOnly = () => (
  <Card>
    <Card.Body>
      A card is a flexible and extensible content container. It includes options for headers and footers, a wide variety
      of content, contextual background colors, and powerful display options.
    </Card.Body>
  </Card>
);
