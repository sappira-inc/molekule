import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Portal } from 'react-portal';
import Popper from 'popper.js';
import Box from '../Box';

const DropdownTrigger = styled.div`
  display: inline-block;
`;

const DropdownMenu = styled.div`
  z-index: 10;
  position: absolute;
  background: white;
  border-radius: 4px;
  border: 1px solid #e4edf5;
  box-shadow: 0 0 3px 0 rgba(178, 194, 212, 0.3);
  min-width: 150px;
  width: ${p => `${p.width || 150}px`};
`;

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
        <DropdownTrigger innerRef={this.triggerRef} aria-haspopup="true" aria-expanded={isOpen}>
          {trigger}
        </DropdownTrigger>

        <Portal>
          {isOpen && (
            <DropdownMenu innerRef={this.menuRef} width={width}>
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

Dropdown.Header = styled.div`
  padding: 8px 12px;
  font-size: 1rem;
  border-bottom: 1px solid ${p => p.theme.colors.grayLight};
`;

Dropdown.Body = styled(Box)`
  padding: 12px;
`;

Dropdown.Title = styled.h3`
  display: block;
  font-weight: 600;
  font-size: 14px;
  color: ${p => p.theme.colors.primary};
  margin: 0 0 4px;
`;

Dropdown.Item = styled.div`
  opacity: ${p => (p.disabled ? 0.5 : 1)};
  pointer-events: ${p => (p.disabled ? 'none' : 'initial')};
  text-decoration: none;
  color: inherit;
  display: flex;
  align-items: center;
  margin-left: -12px;
  margin-right: -12px;
  padding: 4px 12px;
  font-size: 14px;
  cursor: pointer;

  & + ${Dropdown.Title} {
    margin-top: 12px;
  }

  &:hover {
    color: inherit;
  }
`;

Dropdown.Footer = styled.footer`
  background: {p => p.theme.colors.grayLightest};
  padding: 12px;
  border-radius: 0 0 4px 4px;
  border-top: 1px solid ${p => p.theme.colors.grayLight};
  font-size: 14px;
`;
