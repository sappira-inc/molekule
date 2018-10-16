import React from 'react';
import PropTypes from 'prop-types';
import { keyframes, css } from 'styled-components';
import { fadeIn, fadeOut, fadeInUp, fadeOutUp } from 'react-animations';
import { createComponent } from '../utils';

const fadeInAnimation = keyframes`${fadeIn}`;
const fadeOutAnimation = keyframes`${fadeOut}`;
const fadeInUpAnimation = keyframes`${fadeInUp}`;
const fadeOutUpAnimation = keyframes`${fadeOutUp}`;

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
        animation: 0.35s ${fadeInAnimation};
      `};

    ${closing &&
      css`
        animation: 0.35s ${fadeOutAnimation};
      `};
  `,
});

const ModalContent = createComponent({
  name: 'ModalContent',
  style: ({ minWidth, maxWidth, opening, closing }) => css`
    position: relative;
    margin: auto;
    min-width: ${minWidth || 250}px;
    max-width: ${maxWidth || 768}px;
    background: #ffffff;
    background-clip: padding-box;
    box-shadow: 0 8px 30px rgba(0, 29, 54, 0.1);
    border-radius: 2px;
    ${opening && `animation: 0.75s ${fadeInUpAnimation};`};
    ${closing && `animation: 0.75s ${fadeOutUpAnimation};`};
  `,
});

class Modal extends React.Component {
  static propTypes = {
    open: PropTypes.bool,
    closeOnBackdropClick: PropTypes.bool,
    closeOnEscape: PropTypes.bool,
    onClose: PropTypes.func,
  };

  static defaultProps = {
    open: false,
    closeOnBackdropClick: true,
    closeOnEscape: true,
    onClose: () => {},
  };

  constructor(props) {
    super(props);

    this.state = {
      open: props.open || false,
      opening: false,
      closing: false,
    };
  }

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
    const { children, minWidth, maxWidth } = this.props;

    return (
      <Backdrop opening={opening} closing={closing} onClick={this.handleBackdropClick}>
        <ModalContent
          opening={opening}
          closing={closing}
          onClick={this.handleContentClick}
          minWidth={minWidth}
          maxWidth={maxWidth}>
          {children}
        </ModalContent>
      </Backdrop>
    );
  }
}

Modal.Title = createComponent({
  name: 'ModalTitle',
  tag: 'h2',
  style: css`
    font-size: 20px;
    font-weight: 600;
    padding: 0 24px;
    margin: 24px 0 0;
  `,
});

Modal.Body = createComponent({
  name: 'ModalBody',
  style: css`
    padding: 24px;
  `,
});

Modal.Footer = createComponent({
  name: 'ModalFooter',
  style: css`
    padding: 0 24px 24px;
  `,
});

export default Modal;
