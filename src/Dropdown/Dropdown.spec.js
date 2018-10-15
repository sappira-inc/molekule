import React, { Fragment } from 'react';
import { mountWithTheme } from '../../test/utils';
import Dropdown from './Dropdown';
import Button from '../Button';

test('Dropdown', () => {
  const component = mountWithTheme(
    <Dropdown trigger={<Button>Trigger</Button>}>
      {() => (
        <Fragment>
          <Dropdown.Header>Test</Dropdown.Header>
          <Dropdown.Body>Body</Dropdown.Body>
          <Dropdown.Footer>Footer</Dropdown.Footer>
        </Fragment>
      )}
    </Dropdown>
  );

  expect(component).toMatchSnapshot();
});
