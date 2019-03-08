import React, { Fragment } from 'react';
import { shallow, mount } from 'enzyme';
import { renderWithTheme } from '../../test/utils';
import Dropdown from './Dropdown';
import Button from '../Button';
import defaultTheme from '../theme';
import { focusEvents, blurEvents, triggerEvents } from './Dropdown';

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


triggerEvents.forEach( event => {

test(`it opens on toggle event: ${event}`, () => {
  const stopPropagation = jest.fn();
  const wrapper = shallow(<Dropdown theme={defaultTheme} trigger={<Button>Trigger</Button>} on={event}>
      {() => (
        <Fragment>
          <Dropdown.Header>Test</Dropdown.Header>
          <Dropdown.Body>Body</Dropdown.Body>
          <Dropdown.Footer>Footer</Dropdown.Footer>
        </Fragment>
      )}
    </Dropdown>);

  // open on trigger
  const trigger = wrapper.childAt(0);
  trigger.simulate(event, { type: event, stopPropagation });
  expect(wrapper).toMatchSnapshot()
})

const blurEvent = blurEvents[event];
const focusEvent = focusEvents[event];

test(`closes on ${blurEvents[event]} event`, async done => {
  const stopPropagation = jest.fn();
  const wrapper = shallow(<Dropdown theme={defaultTheme} trigger={<Button>Trigger</Button>} on={event}>
      {() => (
        <Fragment>
          <Dropdown.Header>Test</Dropdown.Header>
          <Dropdown.Body>Body</Dropdown.Body>
          <Dropdown.Footer>Footer</Dropdown.Footer>
        </Fragment>
      )}
    </Dropdown>);

  
  // open on trigger
  const trigger = wrapper.childAt(0);
  trigger.simulate(event, { type: event, stopPropagation });

  // blur dropdown
  wrapper.simulate(blurEvent, { type: blurEvent, stopPropagation });
  await setTimeout(() => {
    wrapper.update();
    expect(wrapper).toMatchSnapshot();
    done();
  }, 180);
})

test(`remains open on ${blurEvent} + menu ${focusEvent}`, async done => {
  const stopPropagation = jest.fn();
  const wrapper = shallow(<Dropdown theme={defaultTheme} trigger={<Button>Trigger</Button>} on={event}>
      {() => (
        <Fragment>
          <Dropdown.Header>Test</Dropdown.Header>
          <Dropdown.Body>Body</Dropdown.Body>
          <Dropdown.Footer>Footer</Dropdown.Footer>
        </Fragment>
      )}
    </Dropdown>);

  // open on trigger
  const trigger = wrapper.childAt(0);
  trigger.simulate(event, { type: event, stopPropagation });

  // blur dropdown and focus on menu
  const menu = wrapper.childAt(1).childAt(0);
  wrapper.simulate(blurEvent, { type: blurEvent, stopPropagation });
  menu.simulate(focusEvent, { type: focusEvent, stopPropagation });
  await setTimeout(() => {
    wrapper.update();
    expect(wrapper).toMatchSnapshot();
    done();
  }, 180);
})
});
