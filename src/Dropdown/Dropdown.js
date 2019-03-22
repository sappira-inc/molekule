import React, { useRef, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import FocusTrap from 'react-focus-lock';
import { Transition } from 'react-transition-group';
import { Manager, Reference, Popper } from 'react-popper';
import { css, keyframes } from 'styled-components';
import Box from '../Box';
import Portal from '../Portal';
import { useKeyPress } from '../hooks';
import { createComponent, themeGet, findNextFocusableElement, findPreviousFocusableElement } from '../utils';

const DropdownContext = React.createContext({});

export const PLACEMENT_TRANSITION_ORIGINS = {
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

const TriggerWrapper = createComponent({
  name: 'DropdownTrigger',
  style: css`
    align-self: flex-start;
    display: inline-block;
    outline: none;
  `,
});

export default function Dropdown({
  autoclose,
  placement,
  positionFixed,
  boundariesElement,
  offset,
  trigger,
  render,
  children,
  portalNode,
  styles = {},
  ...menuProps
}) {
  const popperRef = useRef();
  const menuRef = useRef();
  const [isOpen, setOpen] = useState(false);

  const open = () => setOpen(true);
  const close = () => setOpen(false);
  const toggle = () => (isOpen ? close() : open());

  const handleTrigger = e => {
    // Allow all clicks and, for non-button elements, Enter and Space to toggle Dropdown
    // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/button_role#Required_JavaScript_Features
    if (e.type === 'click' || (e.type === 'keypress' && (e.which === 13 || e.which === 32))) {
      e.stopPropagation();
      toggle();
    }
  };

  // Wait for next tick after open to prevent page jump when focusing
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        menuRef.current.focus();
      });
    }
  }, [isOpen]);

  useKeyPress('Escape', () => {
    if (isOpen) {
      close();
    }
  });

  useKeyPress(ARROW_KEYS, event => {
    if (isOpen && menuRef.current) {
      event.preventDefault();
      const focusArgs = [menuRef.current, document.activeElement];
      const nextFocusable =
        event.key === 'ArrowUp' ? findPreviousFocusableElement(...focusArgs) : findNextFocusableElement(...focusArgs);

      if (nextFocusable) {
        nextFocusable.focus();
      }
    }
  });

  const handleMenuBlur = () => {
    if (autoclose) {
      // Use timeout to delay examination of activeElement until after blur/focus
      // events have been processed.
      setTimeout(() => {
        const nextActiveElement = document.activeElement;
        if (menuRef.current && !menuRef.current.contains(nextActiveElement)) {
          close();
        }
      });
    }
  };

  const renderer = render || children;

  return (
    <DropdownContext.Provider value={{ close }}>
      <Manager>
        <Reference>
          {({ ref: triggerRef }) => (
            <TriggerWrapper style={styles.TriggerWrapper} ref={triggerRef} tabIndex={-1}>
              {React.cloneElement(trigger, {
                role: trigger.role || 'button',
                tabIndex: trigger.tabIndex || 0,
                'aria-haspopup': true,
                'aria-expanded': isOpen,
                onClick: handleTrigger,
                onKeyPress: handleTrigger,
                style: {
                  cursor: 'pointer',
                  ...(trigger.style || {}),
                },
              })}
            </TriggerWrapper>
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
                    <FocusTrap returnFocus autoFocus={false}>
                      <DropdownMenu
                        ref={menuInner => {
                          menuRef.current = menuInner;
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
                    </FocusTrap>
                  )}
                </Transition>
              )}
            </Popper>
          </Portal>
        )}
      </Manager>
    </DropdownContext.Provider>
  );
}

Dropdown.propTypes = {
  placement: PropTypes.oneOf(Object.keys(PLACEMENT_TRANSITION_ORIGINS)),
  trigger: PropTypes.element.isRequired,
  render: PropTypes.func,
  autoclose: PropTypes.bool,
  offset: PropTypes.string,
  boundariesElement: PropTypes.string,
  positionFixed: PropTypes.bool,
  width: PropTypes.number,
  zIndex: PropTypes.number,
  transitionDuration: PropTypes.number,
  transitionTimingFunction: PropTypes.string,
  portalNode: PropTypes.instanceOf(Element),
};

Dropdown.defaultProps = {
  placement: 'bottom-start',
  autoclose: true,
  offset: '0, 10',
  positionFixed: false,
  boundariesElement: 'viewport',
  width: 150,
  zIndex: 10,
  transitionDuration: 225,
  transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.17, 1.2)',
};

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

const DropdownMenu = createComponent({
  name: 'DropdownMenu',
  props: () => ({
    tabIndex: 0,
  }),
  style: ({ width, theme, placement, zIndex, transitionState, transitionDuration, transitionTimingFunction }) => css`
    z-index: ${zIndex};
    background: white;
    border-radius: ${theme.radius}px;
    border: 1px solid #e4edf5;
    outline: none;
    box-shadow: 0 0 3px 0 rgba(178, 194, 212, 0.3);
    width: ${width}px;
    opacity: 0.75;
    transform: scale(0.75);
    transform-origin: ${PLACEMENT_TRANSITION_ORIGINS[placement]};

    ${(transitionState === 'entering' || transitionState === 'entered') &&
      css`
        animation: ${scaleIn} ${transitionDuration}ms ${transitionTimingFunction} forwards;
      `}
  `,
});

const DropdownHeader = createComponent({
  name: 'DropdownHeader',
  tag: 'header',
  style: css`
    padding: 0.75rem 1rem 0;
  `,
});

const DropdownHeaderInner = createComponent({
  name: 'DropdownHeaderInner',
  style: css`
    padding: 0 0 0.25rem;
    border-bottom: 2px solid ${p => p.theme.colors.grayLight};
  `,
});

Dropdown.Title = createComponent({
  name: 'DropdownTitle',
  tag: 'span',
  style: css`
    display: block;
    font-weight: bold;
    font-size: 1rem;
    margin: 0;
  `,
});

Dropdown.Header = ({ title, children }) => (
  <DropdownHeader>
    <DropdownHeaderInner>
      {title && <Dropdown.Title>{title}</Dropdown.Title>}
      {children}
    </DropdownHeaderInner>
  </DropdownHeader>
);

Dropdown.Body = createComponent({
  name: 'DropdownBody',
  as: Box,
  style: css`
    padding: 1rem;
  `,
});

Dropdown.SectionTitle = createComponent({
  name: 'DropdownSectionTitle',
  tag: 'span',
  style: ({ theme }) => css`
    display: block;
    font-weight: 600;
    color: ${theme.colors.primary};
  `,
});

const StyledDropdownItem = createComponent({
  name: 'DropdownItem',
  props: ({ disabled }) => ({
    tabIndex: disabled ? -1 : 0,
    role: 'button',
  }),
  as: Box,
  style: ({ disabled, theme }) => css`
    display: block;
    width: calc(100% + 2rem);
    opacity: ${disabled ? 0.3 : 1};
    pointer-events: ${disabled ? 'none' : 'initial'};
    user-select: ${disabled ? 'none' : 'initial'};
    text-decoration: none;
    color: inherit;
    cursor: pointer;
    margin: 0 calc(-1rem);
    padding: 0.25rem 1rem;
    transition: 125ms background;
    outline: none;
    appearance: none;
    border: 0;
    font: inherit;
    text-align: left;

    & + ${Dropdown.SectionTitle} {
      margin-top: 1rem;
    }

    &:hover,
    &:focus {
      color: inherit;
      background: ${theme.colors.grayLightest};
    }
  `,
});

Dropdown.Item = function DropdownItem({ closeOnClick = true, onClick, ...props }) {
  const { close } = useContext(DropdownContext);
  const handleClick = () => {
    if (closeOnClick) {
      close();
    }
    if (typeof onClick === 'function') {
      onClick();
    }
  };
  return <StyledDropdownItem onClick={handleClick} {...props} />;
};

Dropdown.Footer = createComponent({
  name: 'DropdownFooter',
  as: Box,
  props: () => ({
    as: 'footer',
  }),
  style: ({ theme }) => css`
    background: ${theme.colors.grayLightest};
    padding: 0.75rem 1rem;
    border-radius: 0 0 ${themeGet('radius')}px ${themeGet('radius')}px;
  `,
});
