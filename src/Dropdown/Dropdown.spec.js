import '@babel/polyfill';
import React from 'react';
import 'jest-dom/extend-expect';
import { renderWithTheme, fireEvent, wait, act, cleanup, waitForDomChange } from '../../test/utils';
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

  const openDropdown = async () => {
    const trigger = renderUtils.getByText('Trigger');
    act(() => {
      fireEvent.click(trigger, { stopPropagation: () => null });
    });
    return assertDropdownOpen();
  };

  beforeEach(() => {
    cleanup();
    renderUtils = renderDropdown();
  });

  test('only renders trigger on mount', () => {
    expect(renderUtils.asFragment()).toMatchSnapshot();
  });

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
    // Swallowing an annoying warning with act that's okay to ignore: https://github.com/facebook/react/issues/14769
    const ogError = console.error;
    console.error = _ => _;

    await openDropdown();

    // Some issues with fireEvent.focus: https://github.com/kentcdodds/react-testing-library/issues/276#issuecomment-473392827
    renderUtils.wrapper.focus();
    renderUtils.getByTestId('dropdown-menu').blur();

    await waitForDomChange();
    await assertDropdownClosed();

    console.error = ogError;
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
});
