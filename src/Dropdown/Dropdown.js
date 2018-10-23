import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { css } from 'styled-components';
import Popper from 'popper.js';
import Box from '../Box';
import Portal from '../Portal';
import { createComponent } from '../utils';

const DropdownTrigger = createComponent({
  name: 'DropdownTrigger',
  style: css`
    display: inline-block;
  `,
});

const DropdownMenu = createComponent({
  name: 'DropdownMenu',
  style: ({ width = 150, theme }) => css`
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
    boundariesElement: PropTypes.string,
    on: PropTypes.string,
  };

  static defaultProps = {
    autoclose: true,
    placement: 'bottom-start',
    boundariesElement: 'window',
    on: 'click',
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
    const { placement, boundariesElement } = this.props;

    this.setState(
      {
        isOpen: true,
      },
      () => {
        this.positioner = new Popper(this.triggerRef.current, this.menuRef.current, {
          placement,
          modifiers: {
            offset: {
              offset: '0, 10',
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
    e.stopPropagation();

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
    padding: 8px 12px;
    font-size: 1rem;
    border-bottom: 1px solid ${p => p.theme.colors.grayLight};
  `,
});

Dropdown.Header = ({ title, children }) => (
  <DropdownHeader>
    {title && <Dropdown.Title>{title}</Dropdown.Title>}
    {children}
  </DropdownHeader>
);

Dropdown.Title = createComponent({
  name: 'DropdownTitle',
  tag: 'span',
  style: css`
    display: block;
    font-weight: 500;
    font-size: 1rem;
    margin: 0;
  `,
});

Dropdown.Body = createComponent({
  name: 'DropdownBody',
  as: Box,
  style: css`
    padding: 12px;
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
    margin: 0 -12px;
    padding: 4px 12px;
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
    padding: 8px 12px;
    border-radius: 0 0 4px 4px;
    border-top: 1px solid ${theme.colors.grayLight};
  `,
});
