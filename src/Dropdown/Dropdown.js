import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'styled-components';
import Popper from 'popper.js';
import Box from '../Box';
import Portal from '../Portal';
import { createComponent, themeGet } from '../utils';

const blurEvents = {
  click: 'blur',
  mouseenter: 'mouseleave',
};

const focusEvents = {
  click: 'focus',
  mouseenter: 'mouseenter',
};

const DropdownTrigger = createComponent({
  name: 'DropdownTrigger',
  style: css`
    display: inline-block;
  `,
});

const DropdownMenu = createComponent({
  name: 'DropdownMenu',
  style: ({ width, theme }) => css`
    z-index: 10;
    position: absolute;
    background: white;
    border-radius: ${theme.radius}px;
    border: 1px solid #e4edf5;
    box-shadow: 0 0 3px 0 rgba(178, 194, 212, 0.3);
    min-width: 150px;
    width: ${width}px;
  `,
});

export default class Dropdown extends React.Component {
  static propTypes = {
    trigger: PropTypes.element,
    render: PropTypes.func,
    autoclose: PropTypes.bool,
    placement: PropTypes.string,
    offset: PropTypes.string,
    boundariesElement: PropTypes.string,
    on: PropTypes.string,
    width: PropTypes.number,
  };

  static defaultProps = {
    autoclose: true,
    offset: '0, 10',
    placement: 'bottom-start',
    positionFixed: false,
    boundariesElement: 'window',
    on: 'click',
    width: 150,
  };

  triggerRef = React.createRef();
  menuRef = React.createRef();

  state = {
    isOpen: false,
  };

  componentWillUnmount() {
    if (this.positioner) {
      this.positioner.destroy();
    }
  }

  componentDidUpdate() {
    if (this.positioner && this.positioner.update) {
      this.positioner.update();
    }
  }

  show = () => {
    const { placement, positionFixed, boundariesElement, offset } = this.props;

    this.setState(
      {
        isOpen: true,
      },
      () => {
        this.positioner = new Popper(this.triggerRef.current, this.menuRef.current, {
          placement,
          positionFixed,
          modifiers: {
            offset: {
              offset,
            },
            flip: {
              behavior: ['left', 'bottom', 'top', 'right'],
            },
            preventOverflow: {
              boundariesElement,
            },
          },
        });
      }
    );
  };

  hide = () => {
    this.setState(
      {
        isOpen: false,
      },
      () => {
        this.positioner.destroy();
      }
    );
  };

  toggle = () => {
    if (this.state.isOpen) {
      this.hide();
    } else {
      this.show();
    }
  };

  autoclose = e => {
    if (this.state.isOpen && this.props.autoclose) {
      this.hide();
    }
  };
  
  handleToggle = e => {
    if (this.props.on === e.type) {
      e.stopPropagation();
      this.toggle();
    }
  }
 

  // We close the popover on the next tick by using setTimeout.
  // This is necessary because we need to first check if
  // another child of the element has received focus as
  // the blur event fires prior to the new focus event.
  handleBlur = e => {
    if (blurEvents[this.props.on] === e.type) {
      this.timer = setTimeout(this.autoclose, 175);
    }
  }
 
  // If a child receives focus, do not close the popover.
  handleFocus = e => { 
    if (focusEvents[this.props.on] === e.type){
      clearTimeout(this.timer);
    }
  }
 
  render() {
    const { width, trigger, render, children } = this.props;
    const { isOpen } = this.state;

    const renderFn = render || children;

    return (
      <div tabIndex={0} onBlur={this.handleBlur}>
        <DropdownTrigger onClick={this.handleToggle} onMouseEnter={this.handleToggle} onMouseLeave={this.handleBlur} ref={this.triggerRef} aria-haspopup="true" aria-expanded={isOpen}>
          {trigger}
        </DropdownTrigger>

        <Portal>
          {isOpen && (
            <DropdownMenu ref={this.menuRef} width={width} tabIndex={0} onFocus={this.handleFocus} onMouseEnter={this.handleFocus} onMouseLeave={this.handleBlur}>
              {renderFn({
                close: this.toggle,
              })}
            </DropdownMenu>
          )}
        </Portal>
      </div>
    );
  }
}

const DropdownHeader = createComponent({
  name: 'DropdownHeader',
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

Dropdown.Item = createComponent({
  name: 'DropdownItem',
  as: Box,
  style: ({ disabled, theme }) => css`
    display: flex;
    align-items: center;
    opacity: ${disabled ? 0.3 : 1};
    pointer-events: ${disabled ? 'none' : 'initial'};
    text-decoration: none;
    color: inherit;
    cursor: pointer;
    margin: 0 -1rem;
    padding: 0.25rem 1rem;
    transition: 125ms background;

    & + ${Dropdown.SectionTitle} {
      margin-top: 1rem;
    }

    &:hover {
      color: inherit;
      background: ${theme.colors.grayLightest};
    }
  `,
});

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
