import React from 'react';
import { renderWithTheme } from '../../test/utils';
import Card from './Card';

test('Card', () => {
  const component = renderWithTheme(
    <Card>
      <Card.Header>Header</Card.Header>
      <Card.Body>Body</Card.Body>
      <Card.Footer>Footer</Card.Footer>
    </Card>
  );

  expect(component.toJSON()).toMatchSnapshot();
});
