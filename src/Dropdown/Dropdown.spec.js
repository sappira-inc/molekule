import React, { Fragment } from 'react';
import { renderWithTheme } from '../../test/utils';
import Dropdown from './Dropdown';
import Button from '../Button';

test('Dropdown', () => {
  const component = renderWithTheme(
    <Dropdown trigger={<Button>Trigger</Button>}>
      {() => (
        <Fragment>
          <Dropdown.Header>Test</Dropdown.Header>
          <Dropdown.Body>Body</Dropdown.Body>
          <Dropdown.Footer>Footer</Dropdown.Footer>
        </Fragment>
      )}
    </Dropdown>,
    {
      createNodeMock: () => ({
        addEventListener: () => {},
        removeEventListener: () => {},
      }),
    }
  );

  expect(component.toJSON()).toMatchSnapshot();
});
