import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
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
    let utils;
    act(() => {
      utils = renderWithTheme(
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
    });
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
    act(() => {
      callback(trigger);
    });
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
    'enter': { type: 'keypress', which: '32', ...baseTrigger },
    'space': { type: 'keypress', which: '13', ...baseTrigger },
  };

  const mountAndOpenDropdown = (triggerEvent = triggerEvents.click) => {
    const wrapper = mount(<Dropdown theme={defaultTheme} trigger={<div>Trigger</div>}>
          <Dropdown.Header>Test</Dropdown.Header>
          <Dropdown.Body>Body</Dropdown.Body>
          <Dropdown.Footer>Footer</Dropdown.Footer>
    </Dropdown>);

    // open on trigger
    const trigger = (wrapper.find('[role="button"]'));
    act(() => {
      trigger.simulate(triggerEvent.type, triggerEvent);
    });
    return wrapper;
  };

  // use enzyme since can't trigger keypress
  Object.keys(triggerEvents).forEach( async eventKey => {
    test(`menu opens with focus via ${eventKey} trigger`, async () => {
       const wrapper = await mountAndOpenDropdown();
       assertMountedDropdownOpen(wrapper);
    });
  });

  test('closes when escape is pressed', async () => {
    await openDropdown();
    act(() => {
      fireEvent.keyDown(document.body, { key: 'Escape' });
    });
    await assertDropdownClosed();
  });

  test('closes when menu loses focus', async () => {
    // Swallowing an annoying warning with act that's okay to ignore: https://github.com/facebook/react/issues/14769
    const ogError = console.error;
    console.error = _ => _;

    await openDropdown();

    // Some issues with fireEvent.focus: https://github.com/kentcdodds/react-testing-library/issues/276#issuecomment-473392827
    act(() => {
      renderUtils.wrapper.focus();
    })
    act(() => {
      renderUtils.getByTestId('dropdown-menu').blur();
    })

    await waitForDomChange();
    await assertDropdownClosed();

    console.error = ogError;
  })

  test('arrow keys navigate to focusable elements', async () => {
    await openDropdown();
    const itemOne = renderUtils.getByTestId('item-one');
    const itemTwo = renderUtils.getByTestId('item-two');
    const isFocused = node => node === document.activeElement;

    // First focusable element in tree should be selected on first arrow down
    act(() => {
      fireEvent.keyDown(document.body, { key: 'ArrowDown' });
    })
    expect(isFocused(itemOne)).toBeTruthy();

    // Arrow up on first item should bring us to last item
    act(() => {
      fireEvent.keyDown(document.body, { key: 'ArrowUp' });
    })
    expect(isFocused(itemTwo)).toBeTruthy();

    act(() => {
      fireEvent.keyDown(document.body, { key: 'ArrowUp' });
    })
    expect(isFocused(itemOne)).toBeTruthy();
  });
});
