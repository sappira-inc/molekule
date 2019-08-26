import React from 'react';
import { renderWithTheme, fireEvent, wait } from '../../test/utils';
import Dropdown from './Dropdown';

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

  const renderDropdown = (props = {}) => {
    const wrapper = document.createElement('div');
    wrapper.setAttribute('tabindex', 1);
    const utils = renderWithTheme(
      <Dropdown {...props} portalNode={wrapper} trigger={<div>Trigger</div>}>
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

  const assertDropdownOpen = (utils = renderUtils) =>
    wait(() => {
      expect(utils.queryByText('Header')).toBeInTheDocument();
    });

  const assertDropdownClosed = (utils = renderUtils) =>
    wait(() => {
      expect(utils.queryByText('Header')).not.toBeInTheDocument();
    });

  const openDropdown = async (utils = renderUtils) => {
    const trigger = utils.getByText('Trigger');
    fireEvent.click(trigger, { stopPropagation: () => null });
    return assertDropdownOpen(utils);
  };

  beforeEach(() => {
    renderUtils = renderDropdown();
  });

  test('only renders trigger on mount', () => {
    expect(renderUtils.asFragment()).toMatchSnapshot();
  });

  // TODO: add cases for space and enter keypress events
  test('opens menu with focus when trigger is clicked', async () => {
    await openDropdown();
    expect(renderUtils.asFragment()).toMatchSnapshot();
    expect(renderUtils.getByTestId('dropdown-menu') === document.activeElement).toBeTruthy();
  });

  test('closes when escape is pressed', async () => {
    await openDropdown();
    fireEvent.keyDown(document.body, { key: 'Escape' });
    await assertDropdownClosed();
  });

  test('closes when menu loses focus', async () => {
    await openDropdown();

    // Some issues with fireEvent.focus: https://github.com/kentcdodds/react-testing-library/issues/276#issuecomment-473392827
    renderUtils.wrapper.focus();

    await assertDropdownClosed();
  });

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

  describe('prop: width', () => {
    test('wdith defaults to auto', async () => {
      const utils = renderDropdown();
      await openDropdown(utils);
      expect(utils.getByTestId('dropdown-menu')).toHaveStyleRule('width', 'auto');
    });

    test('supports string widths', async () => {
      const utils = renderDropdown({ width: '2rem' });
      await openDropdown(utils);
      expect(utils.getByTestId('dropdown-menu')).toHaveStyleRule('width', '2rem');
    });

    test('supports number widths', async () => {
      const utils = renderDropdown({ width: 200 });
      await openDropdown(utils);
      expect(utils.getByTestId('dropdown-menu')).toHaveStyleRule('width', '200px');
    });
  });
});
