import React from 'react';
import { mount } from 'enzyme';
import { renderWithTheme, fireEvent, wait, waitForDomChange } from '../../test/utils';
import defaultTheme from '../theme';
import Dropdown from './Dropdown';
import Button from '../Button';

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

describe('<Dropdown />', () => {
  let renderUtils;

  const renderDropdown = () => {
    const wrapper = document.createElement('div');
    wrapper.setAttribute('tabindex', 1);
    const utils = renderWithTheme(
      <Dropdown portalNode={wrapper} trigger={<Button>Trigger</Button>}>
        <Dropdown.Header>Header</Dropdown.Header>
        <Dropdown.Body>
          <Dropdown.Item data-testid="item-one">One</Dropdown.Item>
          <Dropdown.Item data-testid="item-two">Two</Dropdown.Item>
        </Dropdown.Body>
        <Dropdown.Footer>Footer</Dropdown.Footer>
      </Dropdown>,
      {
        container: document.body.appendChild(wrapper),
      }
    );
    return {
      wrapper,
      ...utils,
    };
  };

  const assertDropdownOpen = () =>
    wait(() => {
      expect(renderUtils.queryByText('Header')).toBeInTheDocument();
    });

  const assertDropdownClosed = () =>
    wait(() => {
      expect(renderUtils.queryByText('Header')).not.toBeInTheDocument();
    });
 
  const assertMountedDropdownOpen = wrapper => {
    expect(wrapper).toMatchSnapshot('is open');
    expect(wrapper.find('footer')).toHaveLength(1);
  }

  const openDropdown = async (eventCallback) => {
    const trigger = renderUtils.getByText('Trigger');
    const callback = eventCallback || clickTrigger;
    callback(trigger);
    return assertDropdownOpen();
  };

  beforeEach(() => {
    renderUtils = renderDropdown();
  });

  test('only renders trigger on mount', () => {
    expect(renderUtils.asFragment()).toMatchSnapshot();
  });

  const stopPropagation = jest.fn()
  const preventDefault = jest.fn()
  const clickTrigger = trigger => {
    fireEvent.click(trigger, { stopPropagation, preventDefault });
  };

  const baseTrigger = { stopPropagation, preventDefault };
  const triggerEvents = {
    'click': { type: 'click', ...baseTrigger },
    'space': { type: 'keypress', key: 'Space', which: 32, ...baseTrigger },
    'enter': { type: 'keypress', key: 'Enter', which: 13, ...baseTrigger },
  };

  const mountAndOpenDropdown = (triggerEvent = triggerEvents.click) => {
    const wrapper = mount(<Dropdown theme={defaultTheme} trigger={<div>Trigger</div>}>
          <Dropdown.Header>Test</Dropdown.Header>
          <Dropdown.Body>Body</Dropdown.Body>
          <Dropdown.Footer>Footer</Dropdown.Footer>
    </Dropdown>);

    // open on trigger
    const trigger = (wrapper.find('[role="button"]'));
    trigger.simulate(triggerEvent.type, triggerEvent);
    wrapper.update();
    return wrapper;
  };

  // use enzyme since can't trigger keypress
  Object.keys(triggerEvents).forEach( async eventKey => {
    const event = triggerEvents[eventKey];
    test(`menu opens with focus via ${eventKey} trigger`, async () => {
       const wrapper = await mountAndOpenDropdown(event);
       assertMountedDropdownOpen(wrapper);
    });
  });

  test('closes when escape is pressed', async () => {
    await openDropdown();
    fireEvent.keyDown(document.body, { key: 'Escape' });
    await assertDropdownClosed();
  });

  // use enzyme since can't trigger blur via dom
  test('closes on blur event', async () => {
    const wrapper = await mountAndOpenDropdown();
    assertMountedDropdownOpen(wrapper);

    // blur dropdown menu
    const menu = wrapper.find('.laCjkz');
    menu.simulate('blur', { type: 'blur', stopPropagation, preventDefault });

    wrapper.update();
    expect(wrapper).toMatchSnapshot('is closed');
    expect(wrapper.find('footer')).toHaveLength(0);
  })

  test('arrow keys navigate to focusable elements', async () => {
    await openDropdown();
    const itemOne = renderUtils.getByTestId('item-one');
    const itemTwo = renderUtils.getByTestId('item-two');
    const isFocused = node => node === document.activeElement;

    // First focusable element in tree should be selected on first arrow down
    fireEvent.keyDown(document.body, { key: 'ArrowDown' });
    expect(isFocused(itemOne)).toBeTruthy();

    // Arrow up on first item should bring us to last item
    fireEvent.keyDown(document.body, { key: 'ArrowUp' });
    expect(isFocused(itemTwo)).toBeTruthy();

    fireEvent.keyDown(document.body, { key: 'ArrowUp' });
    expect(isFocused(itemOne)).toBeTruthy();
  });
});

