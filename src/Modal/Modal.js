import React from 'react';
import PropTypes from 'prop-types';
import { keyframes, css } from 'styled-components';
import * as animations from 'react-animations';
import { Transition } from 'react-transition-group';
import Portal from '../Portal';
import { createComponent, themeGet } from '../utils';

const getAnimation = name => keyframes`${animations[name]}`;

const Backdrop = createComponent({
  name: 'ModalBackdrop',
  style: ({ transitionState }) => css`
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    padding: 1rem;
    display: flex;
    align-items: center;
    position: fixed;
    overflow-y: auto;
    overflow-x: hidden;
    background: rgba(0, 0, 0, 0.2);
    justify-content: center;

    ${transitionState === 'exited' &&
      css`
        display: none;
      `}

    ${transitionState === 'entering' &&
      css`
        animation: 0.35s ${getAnimation('fadeIn')};
      `};

    ${transitionState === 'exiting' &&
      css`
        animation: 0.35s ${getAnimation('fadeOut')};
      `};
  `,
});

const ModalContent = createComponent({
  name: 'ModalContent',
  style: ({ minWidth, maxWidth, transitionState, animationIn, animationOut }) => css`
    position: relative;
    margin: auto;
    min-width: ${minWidth || 250}px;
    max-width: ${maxWidth || 768}px;
    background: #ffffff;
    background-clip: padding-box;
    box-shadow: 0 8px 30px rgba(0, 29, 54, 0.1);
    border-radius: ${themeGet('radius')}px;

    ${transitionState === 'entering'  &&
      css`
        animation: 0.75s ${getAnimation(animationIn)};
      `};

    ${transitionState === 'exiting' &&
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
    animationDuration: PropTypes.number,
    onClose: PropTypes.func,
  };

  static defaultProps = {
    open: false,
    closeOnBackdropClick: true,
    closeOnEscape: true,
    animationIn: 'zoomIn',
    animationOut: 'zoomOut',
    animationDuration: 175,
    onClose: () => {},
  };

  state = {
    open: this.props.open || false,
  };

  static getDerivedStateFromProps(props, state) {
    return props.open !== undefined && props.open !== state.open ? { open: props.open } : null;
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleEscapeKey);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEscapeKey);
  }

  close() {
    this.setState({ open: false }, () => {
      this.props.onClose();
    });
  }

  handleEscapeKey = event => {
    if (!this.state.open || !this.props.closeOnEscape) {
      return;
    }

    if (event.keyCode === 27) {
      this.close();
    }
  };

  handleBackdropClick = () => {
    if (!this.props.closeOnBackdropClick) {
      return;
    }

    this.close();
  };

  handleContentClick = event => {
    event.stopPropagation();
  };

  render() {
    const { children, title, animationDuration, ...props } = this.props;
    const { open } = this.state;

    return (
      <Portal>
        <Transition in={open} timeout={animationDuration}>
          {state => (
            <Backdrop transitionState={state} onClick={this.handleBackdropClick}>
              <ModalContent transitionState={state} onClick={this.handleContentClick} {...props}>
                {title && <Modal.Header title={title} />}
                {children}
              </ModalContent>
            </Backdrop>
          )}
        </Transition>
     </Portal>
    );
  }
}

const ModalHeader = createComponent({
  name: 'ModalHeader',
  style: css`
    font-size: 1.5rem;
    padding: 1rem 1.25rem 0;
    border-top-left-radius: ${themeGet('radius')}px;
    border-top-right-radius: ${themeGet('radius')}px;
  `,
});

const ModalHeaderInner = createComponent({
  name: 'ModalHeaderInner',
  style: ({ theme }) => css`
    border-bottom: 2px solid ${theme.colors.grayLight};
    padding-bottom: 0.25rem;
  `,
});

Modal.Header = ({ title, children }) => (
  <ModalHeader>
    <ModalHeaderInner>
      {title && <Modal.Title>{title}</Modal.Title>}
      {children}
    </ModalHeaderInner>
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
    padding: 1.25rem;
  `,
});

Modal.Footer = createComponent({
  name: 'ModalFooter',
  style: ({ theme }) => css`
    padding: 1rem 1.25rem;
    background: ${theme.colors.grayLightest};
    border-bottom-left-radius: ${themeGet('radius')}px;
    border-bottom-right-radius: ${themeGet('radius')}px;
  `,
});

export default Modal;
