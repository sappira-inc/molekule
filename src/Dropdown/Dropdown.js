import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { css } from 'styled-components';
import Popper from 'popper.js';
import Box from '../Box';
import Portal from '../Portal';
import { createComponent, themeGet } from '../utils';

const DropdownTrigger = createComponent({
  name: 'DropdownTrigger',
  style: css`
    display: inline-block;
  `,
});

const DropdownMenu = createComponent({
  name: 'DropdownMenu',
  style: ({ width = 150, theme, border, radius }) => css`
    z-index: 10;
    position: absolute;
    background: white;
    border-radius: ${radius || theme.radius}px;
    border: ${border ? '1px solid #e4edf5' : 'none'};
    box-shadow: 0 0 3px 0 rgba(178, 194, 212, 0.3);
    min-width: 90px;
    width: ${width}px;
  `,
});

export default class Dropdown extends React.Component {
  static propTypes = {
    trigger: PropTypes.element,
    render: PropTypes.func,
    autoclose: PropTypes.bool,
    placement: PropTypes.string,
    boundariesElement: PropTypes.string,
    on: PropTypes.string,
  };

  static defaultProps = {
    autoclose: true,
    placement: 'bottom-start',
    boundariesElement: 'window',
    on: 'click',
    border: true,
  };

  triggerRef = React.createRef();
  menuRef = React.createRef();

  state = {
    isOpen: false,
  };

  componentDidMount() {
    this.attachAutocloseListener();
    this.triggerRef.current.addEventListener(this.props.on, this.toggle);
  }

  componentWillUnmount() {
    if (this.positioner) {
      this.positioner.destroy();
    }
    this.detachAutocloseListener();
    this.triggerRef.current.removeEventListener(this.props.on, this.toggle);
  }

  componentDidUpdate() {
    if (this.positioner && this.positioner.update) {
      this.positioner.update();
    }
  }

  show = () => {
    const { offset = '0, 10', placement, boundariesElement } = this.props;

    this.setState(
      {
        isOpen: true,
      },
      () => {
        this.positioner = new Popper(this.triggerRef.current, this.menuRef.current, {
          placement,
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

  toggle = e => {
    if (e) e.stopPropagation();

    if (this.state.isOpen) {
      this.hide();
    } else {
      this.show();
    }
  };

  attachAutocloseListener() {
    if (!this.props.autoclose) {
      return;
    }
    document.addEventListener('click', this.autoclose);
  }

  detachAutocloseListener() {
    document.removeEventListener('click', this.autoclose);
  }

  autoclose = e => {
    if (this.state.isOpen && !this.menuRef.current.contains(e.target)) {
      this.hide();
    }
  };

  render() {
    const { width, trigger, render, children } = this.props;
    const { isOpen } = this.state;

    const renderFn = render || children;

    return (
      <Fragment>
        <DropdownTrigger ref={this.triggerRef} aria-haspopup="true" aria-expanded={isOpen}>
          {trigger}
        </DropdownTrigger>

        <Portal>
          {isOpen && (
            <DropdownMenu ref={this.menuRef} width={width}>
              {renderFn({
                close: this.toggle,
              })}
            </DropdownMenu>
          )}
        </Portal>
      </Fragment>
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
  attrs: {
    as: 'footer',
  },
  style: ({ theme }) => css`
    background: ${theme.colors.grayLightest};
    padding: 0.75rem 1rem;
    border-radius: 0 0 ${themeGet('radius')}px ${themeGet('radius')}px;
  `,
});
