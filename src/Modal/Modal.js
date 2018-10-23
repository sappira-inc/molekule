import React from 'react';
import PropTypes from 'prop-types';
import { keyframes, css } from 'styled-components';
import * as animations from 'react-animations';
import { Portal } from '../Portal';
import { createComponent } from '../utils';

const getAnimation = name => keyframes`${animations[name]}`;

const Backdrop = createComponent({
  name: 'ModalBackdrop',
  style: ({ opening, closing }) => css`
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    padding: 12px;
    display: flex;
    align-items: center;
    position: fixed;
    overflow-y: auto;
    overflow-x: hidden;
    background: rgba(0, 0, 0, 0.2);
    justify-content: center;

    ${opening &&
      css`
        animation: 0.35s ${getAnimation('fadeIn')};
      `};

    ${closing &&
      css`
        animation: 0.35s ${getAnimation('fadeOut')};
      `};
  `,
});

const ModalContent = createComponent({
  name: 'ModalContent',
  style: ({ minWidth, maxWidth, opening, closing, animationIn, animationOut }) => css`
    position: relative;
    margin: auto;
    min-width: ${minWidth || 250}px;
    max-width: ${maxWidth || 768}px;
    background: #ffffff;
    background-clip: padding-box;
    box-shadow: 0 8px 30px rgba(0, 29, 54, 0.1);
    border-radius: 4px;
    overflow: hidden;

    ${opening &&
      css`
        animation: 0.75s ${getAnimation(animationIn)};
      `};

    ${closing &&
      css`
        animation: 0.75s ${getAnimation(animationOut)};
      `};
  `,
});

class Modal extends React.Component {
  static propTypes = {
    open: PropTypes.bool,
    closeOnBackdropClick: PropTypes.bool,
    closeOnEscape: PropTypes.bool,
    minWidth: PropTypes.number,
    maxWidth: PropTypes.number,
    animationIn: PropTypes.string,
    animationOut: PropTypes.string,
    onClose: PropTypes.func,
  };

  static defaultProps = {
    open: false,
    closeOnBackdropClick: true,
    closeOnEscape: true,
    animationIn: 'zoomIn',
    animationOut: 'zoomOut',
    onClose: () => {},
  };

  state = {
    open: this.props.open || false,
    opening: false,
    closing: false,
  };

  componentDidUpdate(oldProps) {
    if (!oldProps.open && this.props.open) {
      this.open();
    } else if (oldProps.open && !this.props.open) {
      this.close();
    }
  }

  get isOpen() {
    return !this.closed;
  }

  get isClosed() {
    const { open, opening, closing } = this.state;
    return !open && !opening && !closing;
  }

  get isControlled() {
    return 'open' in this.props;
  }

  open() {
    this.setState(
      {
        opening: true,
      },
      () => {
        setTimeout(() => {
          document.addEventListener('keydown', this.handleEscapeKey);

          this.setState({
            open: true,
            opening: false,
          });
        }, 250);
      }
    );
  }

  close() {
    this.setState(
      {
        closing: true,
      },
      () => {
        setTimeout(() => {
          document.removeEventListener('keydown', this.handleEscapeKey);

          this.setState({
            open: false,
            closing: false,
          });
        }, 250);
      }
    );
  }

  closeInternal() {
    if (this.isControlled) {
      this.props.onClose();
    } else {
      this.close();
    }
  }

  handleEscapeKey = event => {
    if (!this.props.closeOnEscape) {
      return;
    }

    if (event.keyCode === 27) {
      this.closeInternal();
    }
  };

  handleBackdropClick = () => {
    if (!this.props.closeOnBackdropClick) {
      return;
    }

    this.closeInternal();
  };

  handleContentClick = event => {
    event.stopPropagation();
  };

  render() {
    if (this.isClosed) {
      return null;
    }

    const { opening, closing } = this.state;
    const { children, title, ...props } = this.props;

    return (
      <Portal>
        <Backdrop opening={opening} closing={closing} onClick={this.handleBackdropClick}>
          <ModalContent opening={opening} closing={closing} onClick={this.handleContentClick} {...props}>
            {title && <Modal.Header title={title} />}
            {children}
          </ModalContent>
        </Backdrop>
      </Portal>
    );
  }
}

const ModalHeader = createComponent({
  name: 'ModalHeader',
  style: ({ theme }) => css`
    font-size: 1.5rem;
    border-bottom: 1px solid ${theme.colors.grayLight}
    padding: 12px 16px;
  `,
});

Modal.Header = ({ title, children }) => (
  <ModalHeader>
    {title && <Modal.Title>{title}</Modal.Title>}
    {children}
  </ModalHeader>
);

Modal.Title = createComponent({
  name: 'ModalTitle',
  tag: 'h2',
  style: css`
    font-size: 1.25rem;
    margin: 0;
  `,
});

Modal.Body = createComponent({
  name: 'ModalBody',
  style: css`
    padding: 16px;
  `,
});

Modal.Footer = createComponent({
  name: 'ModalFooter',
  style: ({ theme }) => css`
    padding: 12px 16px;
    background: ${theme.colors.grayLightest};
    border-top: 1px solid ${theme.colors.grayLight};
  `,
});

export default Modal;
