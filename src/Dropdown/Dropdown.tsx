import React, { useRef, useState, useEffect, useContext } from 'react';
import { FocusOn } from 'react-focus-on';
import { Transition } from 'react-transition-group';
import { TransitionStatus } from 'react-transition-group/Transition';
import { Manager, Reference, Popper } from 'react-popper';
import { css, keyframes } from 'styled-components';
import { Box } from '../Box';
import Portal from '../Portal';
import { Icon } from '../Icon';
import { useKeyPress } from '../hooks';
import { createComponent, findNextFocusableElement, findPreviousFocusableElement } from '../utils';

const DropdownContext = React.createContext({});

export type Placement =
  | 'top-start'
  | 'top'
  | 'top-end'
  | 'right'
  | 'right-start'
  | 'right-end'
  | 'bottom-start'
  | 'bottom'
  | 'bottom-end'
  | 'left-start'
  | 'left'
  | 'left-end';

export const PLACEMENT_TRANSITION_ORIGINS: Record<Placement, string> = {
  'top-start': '0 100%',
  top: '50% 100%',
  'top-end': '100% 100%',
  'right-start': '0 0',
  right: '0 50%',
  'right-end': '0 100%',
  'bottom-start': '0 0',
  bottom: '50% 0',
  'bottom-end': '100% 0',
  'left-start': '100% 0',
  left: '100% 50%',
  'left-end': '100% 100%',
};

const ARROW_KEYS = ['ArrowUp', 'ArrowDown'];

const Trigger = createComponent({
  name: 'DropdownTrigger',
  style: css`
    align-self: flex-start;
    display: inline-block;
    outline: none;
  `,
});

export interface DropdownProps {
  placement?: Placement;
  trigger: any;
  render?: (p?: any) => React.ReactNode;
  autoclose?: boolean;
  offset?: string;
  boundariesElement?: Element | 'viewport' | 'scrollParent' | 'window';
  positionFixed?: boolean;
  width?: number | string;
  zIndex?: number;
  transitionDuration?: number;
  transitionTimingFunction?: string;
  portalNode?: any;
  styles?: any;
}

export interface DropdownStaticMembers {
  Divider: any;
  Title: any;
  Item: any;
}

/** Easily display contextual overlays using custom trigger elements. Dropdowns positioning system uses [Popper.js](https://github.com/FezVrasta/popper.js). Refer to their documentation for placement and option overrides. */
const Dropdown: React.FC<DropdownProps> & DropdownStaticMembers = ({
  autoclose = true,
  placement = 'bottom-start',
  positionFixed = false,
  boundariesElement = 'viewport',
  offset = '0, 10',
  portalNode,
  styles = {},
  trigger,
  render,
  children,
  ...menuProps
}) => {
  const popperRef = useRef<any>();
  const menuRef = useRef<any>();
  const triggerRef = useRef<any>();

  const [isOpen, setOpen] = useState(false);

  const open = () => setOpen(true);
  const close = () => setOpen(false);
  const toggle = () => (isOpen ? close() : open());

  const handleTrigger = (e: any) => {
    // Allow all clicks and, for non-button elements, Enter and Space to toggle Dropdown
    // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/button_role#Required_JavaScript_Features
    if (e.type === 'click' || (e.type === 'keypress' && (e.which === 13 || e.which === 32))) {
      e.preventDefault();
      e.stopPropagation();
      toggle();
    }
  };

  // Wait for next tick after open to prevent page jump when focusing
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        if (menuRef?.current) menuRef.current.focus();
      });
    }
  }, [isOpen]);

  useKeyPress('Escape', () => {
    if (isOpen) {
      if (triggerRef?.current) triggerRef.current.focus();
      close();
    }
  });

  useKeyPress(ARROW_KEYS, (event: any) => {
    if (isOpen && menuRef.current) {
      event.preventDefault();
      const focusArgs = [menuRef.current, document.activeElement];
      const nextFocusable: any =
        // @ts-ignore
        event.key === 'ArrowUp' ? findPreviousFocusableElement(...focusArgs) : findNextFocusableElement(...focusArgs);

      if (nextFocusable) {
        nextFocusable.focus();
      }
    }
  });

  const handleMenuBlur = (e: any) => {
    if (autoclose && menuRef.current && !menuRef.current.contains(e.relatedTarget)) {
      close();
    }
  };

  const renderer = render || children;

  return (
    <DropdownContext.Provider value={{ close }}>
      <Manager>
        <Reference>
          {({ ref: passedTriggerRef }) => (
            <Trigger style={styles.Trigger} ref={passedTriggerRef} tabIndex={-1}>
              {React.cloneElement(trigger, {
                role: trigger.role || 'button',
                tabIndex: trigger.tabIndex || 0,
                'aria-haspopup': true,
                'aria-expanded': isOpen,
                onClick: handleTrigger,
                onKeyPress: handleTrigger,
                ref: triggerRef,
                style: {
                  cursor: 'pointer',
                  ...(trigger.style || {}),
                },
              })}
            </Trigger>
          )}
        </Reference>

        {isOpen && (
          <Portal node={portalNode}>
            <Popper
              innerRef={popperRef}
              placement={placement}
              positionFixed={positionFixed}
              modifiers={{
                offset: {
                  offset,
                },
                flip: {
                  enabled: false,
                },
                preventOverflow: {
                  boundariesElement,
                  padding: 12,
                },
                // Prevents wacky jumps in Transition component
                computeStyle: { gpuAcceleration: false },
              }}>
              {({ ref, style }) => (
                <Transition in={isOpen} timeout={0} appear>
                  {state => (
                    <FocusOn enabled={isOpen} autoFocus={false}>
                      <DropdownMenu
                        ref={menuInner => {
                          menuRef.current = menuInner;
                          // @ts-ignore
                          ref(menuInner);
                        }}
                        style={style}
                        placement={placement}
                        transitionState={state}
                        onBlur={handleMenuBlur}
                        data-testid="dropdown-menu"
                        {...menuProps}>
                        {typeof renderer === 'function'
                          ? renderer({
                              close,
                            })
                          : renderer}
                      </DropdownMenu>
                    </FocusOn>
                  )}
                </Transition>
              )}
            </Popper>
          </Portal>
        )}
      </Manager>
    </DropdownContext.Provider>
  );
};

export default Dropdown;

const scaleIn = keyframes`
  from {
    opacity: 0.75;
    transform: scale(0.75);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

interface DropdownMenuProps {
  width: number | string;
  placement: Placement;
  zIndex: number;
  transitionState: TransitionStatus;
  transitionDuration: number;
  transitionTimingFunction: string;
}

const DropdownMenu = createComponent<Partial<DropdownMenuProps>>({
  name: 'DropdownMenu',
  props: () => ({
    tabIndex: 0,
  }),
  style: ({ width, theme, placement, zIndex, transitionState, transitionDuration, transitionTimingFunction }) => css`
    z-index: ${zIndex};
    background: white;
    border-radius: ${theme.radius}px;
    border: 1px solid ${theme.colors.greyLighter};
    outline: none;
    box-shadow: ${theme.shadow.soft};
    width: ${typeof width === 'string' ? width : `${width}px`};
    opacity: 0.75;
    transform: scale(0.75);
    transform-origin: ${placement ? PLACEMENT_TRANSITION_ORIGINS[placement] : 'top'};
    padding: 8px;

    ${(transitionState === 'entering' || transitionState === 'entered') &&
      css`
        animation: ${scaleIn} ${transitionDuration}ms ${transitionTimingFunction} forwards;
      `}
  `,
});

Dropdown.Divider = createComponent({
  name: 'DropdownDivider',
  tag: 'hr',
  style: ({ theme }) => css`
    background: ${theme.colors.greyLight};
    height: 1px;
    border: 0;
    margin-left: -8px;
    margin-right: -8px;
  `,
});

Dropdown.Title = createComponent({
  name: 'DropdownTitle',
  tag: 'span',
  style: ({ theme }) => css`
    display: block;
    font-weight: 700;
    color: ${theme.colors.greyDark};
  `,
});

interface StyledDropdownItemProps {
  disabled: boolean;
  color: string;
  icon: any;
  iconProps: any;
  selected: boolean;
}

const StyledDropdownItem = createComponent<Partial<StyledDropdownItemProps>>({
  name: 'DropdownItem',
  props: ({ disabled }) => ({
    tabIndex: disabled ? -1 : 0,
    role: 'button',
  }),
  as: Box,
  style: ({ disabled, theme, color, icon, iconProps, selected }) => css`
    display: block;
    flex: 1;
    opacity: ${disabled ? 0.3 : 1};
    pointer-events: ${disabled ? 'none' : 'initial'};
    user-select: ${disabled ? 'none' : 'initial'};
    text-decoration: none;
    color: ${color || theme.colors.greyDarkest};
    cursor: pointer;
    margin: 0;
    padding: 8px;
    transition: 125ms background;
    outline: none;
    appearance: none;
    border: 0;
    border-radius: ${theme.radius}px;
    font: inherit;
    font-size: 14px;
    font-weight: 500;
    text-align: left;
    position: relative;

    &:hover,
    &:focus {
      color: ${color || theme.colors.greyDarkest};
      background: ${theme.colors.greyLightest};
    }

    ${icon &&
      css`
        padding-left: ${(iconProps.size || 16) + 16}px;
      `}

    ${selected &&
      css`
        color: ${theme.colors.primary};

        &:hover,
        &:active,
        &:focus {
          color: ${theme.colors.primary};
        }
      `}
  `,
});

const StyledIcon = createComponent({
  name: 'DropdownIcon',
  as: Icon,
  style: css`
    position: absolute;
    left: 8px;
  `,
});

interface DropdownItemProps {
  closeOnClick?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
  icon?: any;
  iconProps?: any;
}

const DropdownItem: React.FC<DropdownItemProps> = ({
  closeOnClick = true,
  onClick,
  children,
  icon,
  iconProps = {},
  ...props
}) => {
  // @ts-ignore
  const { close } = useContext(DropdownContext);
  const handleClick = () => {
    if (closeOnClick) {
      close();
    }
    if (typeof onClick === 'function') {
      onClick();
    }
  };
  return (
    <StyledDropdownItem onClick={handleClick} icon={icon} iconProps={iconProps} {...props}>
      {icon && <StyledIcon name={icon} {...iconProps} />}
      {children}
    </StyledDropdownItem>
  );
};

Dropdown.Item = DropdownItem;

Dropdown.defaultProps = {
  placement: 'bottom-start',
  autoclose: true,
  offset: '0, 10',
  positionFixed: false,
  boundariesElement: 'viewport',
  width: 'auto',
  zIndex: 10,
  transitionDuration: 225,
  transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.17, 1.2)',
};
