import React, { Fragment } from 'react';
import { shallow, mount } from 'enzyme';
import { renderWithTheme } from '../../test/utils';
import Dropdown from './Dropdown';
import Button from '../Button';
import defaultTheme from '../theme';

jest.mock('popper.js', () => {
  const PopperJS = jest.requireActual('popper.js');

  return class Popper {
    static placements = PopperJS.placements;

    constructor() {
      return {
        destroy: () => {},
        scheduleUpdate: () => {},
      };
    }
  };
});

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

// TODO: create trigger event list, and loop through to test
test('it opens on toggle event: ${event}', () => {
  const stopPropagation = jest.fn();
  const wrapper = shallow(<Dropdown theme={defaultTheme} trigger={<Button>Trigger</Button>}>
      {() => (
        <Fragment>
          <Dropdown.Header>Test</Dropdown.Header>
          <Dropdown.Body>Body</Dropdown.Body>
          <Dropdown.Footer>Footer</Dropdown.Footer>
        </Fragment>
      )}
    </Dropdown>);

  expect(wrapper).toMatchSnapshot()
  
  // open on trigger
  const trigger = wrapper.childAt(0);
  trigger.simulate('click', { type: 'click', stopPropagation });

  // blur dropdown and focus on menu
  wrapper.simulate('blur', { type: 'blur' });

  // blur dropdown without focus on menu
  expect(wrapper).toMatchSnapshot()
})

// helpers
/*
const shallowWithTheme = (tree, theme) => {
  const context = shallow(<ThemeProvider theme={theme} />)
    .instance()
    .getChildContext()
  return shallow(tree, { context })
}

const wrapper = shallowWithTheme(<Button />, theme)
test('it works', () => {
  const wrapper = mount(<Button />)
  expect(wrapper).toMatchSnapshot()
}) */
