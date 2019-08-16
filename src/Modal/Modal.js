import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { keyframes, css } from 'styled-components';
import * as animations from 'react-animations';
import { Transition } from 'react-transition-group';
import FocusLock from 'react-focus-lock';
import Portal from '../Portal';
import Flex from '../Flex';
import Box from '../Box';
import Icon from '../Icon';
import { useKeyPress } from '../hooks';
import { createComponent, themeGet } from '../utils';

const ModalContext = createContext({});

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
    background: rgba(0, 0, 0, 0.4);
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
    min-width: ${minWidth}px;
    max-width: ${maxWidth}px;
    background: #ffffff;
    background-clip: padding-box;
    box-shadow: 0 8px 30px rgba(0, 29, 54, 0.1);
    border-radius: ${themeGet('radius')}px;
    padding: 16px;
    font-size: 14px;

    ${transitionState === 'entering' &&
      css`
        animation: 0.75s ${getAnimation(animationIn)};
      `};

    ${transitionState === 'exiting' &&
      css`
        animation: 0.75s ${getAnimation(animationOut)};
      `};
  `,
});

function Modal({ children, title, animationDuration, showClose, onClose, open, ...props }) {
  const [isOpen, setOpen] = useState(open);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  const handleContentClick = event => event.stopPropagation();

  const handleBackdropClick = () => {
    if (!props.closeOnBackdropClick) return;

    handleClose();
  };

  useKeyPress('Escape', () => {
    if (!isOpen || !props.closeOnEscape) return;
    handleClose();
  });

  useEffect(() => {
    if (open !== isOpen) {
      setOpen(open);
    }
  }, [open]);

  return (
    <ModalContext.Provider value={{ handleClose }}>
      <Portal>
        <Transition in={isOpen} timeout={animationDuration}>
          {state => (
            <Backdrop transitionState={state} onClick={handleBackdropClick}>
              <FocusLock lockProps={{ style: { maxHeight: '100%' } }} disabled={!isOpen}>
                <ModalContent transitionState={state} onClick={handleContentClick} {...props}>
                  {title && <Modal.Header title={title} showClose={showClose} />}
                  {children}
                </ModalContent>
              </FocusLock>
            </Backdrop>
          )}
        </Transition>
      </Portal>
    </ModalContext.Provider>
  );
}

Modal.propTypes = {
  open: PropTypes.bool,
  showClose: PropTypes.bool,
  closeOnBackdropClick: PropTypes.bool,
  closeOnEscape: PropTypes.bool,
  minWidth: PropTypes.number,
  maxWidth: PropTypes.number,
  animationIn: PropTypes.string,
  animationOut: PropTypes.string,
  animationDuration: PropTypes.number,
  onClose: PropTypes.func,
};

Modal.defaultProps = {
  open: false,
  showClose: true,
  closeOnBackdropClick: true,
  closeOnEscape: true,
  minWidth: 350,
  maxWidth: 350,
  animationIn: 'zoomIn',
  animationOut: 'zoomOut',
  animationDuration: 175,
  onClose: () => {},
};

Modal.Title = createComponent({
  name: 'ModalTitle',
  tag: 'h2',
  style: css`
    font-size: 16px;
    font-weight: 700;
    margin: 0;
  `,
});

const ModalHeader = createComponent({
  name: 'ModalHeader',
  style: css`
    font-size: 16px;
    font-weight: 700;
    padding-bottom: 16px;
    border-top-left-radius: ${themeGet('radius')}px;
    border-top-right-radius: ${themeGet('radius')}px;
  `,
});

const ModalHeaderInner = createComponent({
  name: 'ModalHeaderInner',
  style: ({ theme }) => css`
    border-bottom: 2px solid ${theme.colors.grayLight};
    padding-bottom: 8px;
  `,
});

Modal.Header = ({ title, children, showClose = true }) => {
  const { handleClose } = useContext(ModalContext);

  return (
    <ModalHeader>
      <ModalHeaderInner>
        <Flex alignItems="center">
          {title && <Modal.Title>{title}</Modal.Title>}
          {children}

          {showClose && (
            <Box ml="auto">
              <Icon name="close" color="grayMid" style={{ cursor: 'pointer' }} size={16} onClick={handleClose} />
            </Box>
          )}
        </Flex>
      </ModalHeaderInner>
    </ModalHeader>
  );
};

Modal.Body = createComponent({
  name: 'ModalBody',
  style: css`
    padding-bottom: 24px;
  `,
});

Modal.Footer = createComponent({
  name: 'ModalFooter',
  style: css`
    border-bottom-left-radius: ${themeGet('radius')}px;
    border-bottom-right-radius: ${themeGet('radius')}px;
  `,
});

export default Modal;
