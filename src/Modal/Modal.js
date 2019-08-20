import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { keyframes, css } from 'styled-components';
import * as animations from 'react-animations';
import { Transition } from 'react-transition-group';
import { FocusOn } from 'react-focus-on';
import Portal from '../Portal';
import Flex from '../Flex';
import Box from '../Box';
import Icon from '../Icon';
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
  const modal = useRef();

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

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
            <Backdrop transitionState={state}>
              <FocusOn
                onClickOutside={handleClose}
                onEscapeKey={handleClose}
                lockProps={{ style: { maxHeight: '100%' } }}
                enabled={isOpen}
                shards={[modal]}>
                <ModalContent transitionState={state} ref={modal} {...props}>
                  {title && <Modal.Header title={title} showClose={showClose} />}
                  {children}
                </ModalContent>
              </FocusOn>
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
    margin: 0;
  `,
});

const ModalHeader = createComponent({
  name: 'ModalHeader',
  style: css`
    padding: 1rem 1.25rem 0;
    border-top-left-radius: ${themeGet('radius')}px;
    border-top-right-radius: ${themeGet('radius')}px;
  `,
});

const ModalHeaderInner = createComponent({
  name: 'ModalHeaderInner',
  style: ({ theme }) => css`
    border-bottom: 2px solid ${theme.colors.greyLight};
    padding-bottom: 0.25rem;
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
              <Icon name="close" color="greyDark" style={{ cursor: 'pointer' }} size={16} onClick={handleClose} />
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
    padding: 1.25rem;
  `,
});

Modal.Footer = createComponent({
  name: 'ModalFooter',
  style: ({ theme }) => css`
    padding: 1rem 1.25rem;
    background: ${theme.colors.greyLightest};
    border-bottom-left-radius: ${themeGet('radius')}px;
    border-bottom-right-radius: ${themeGet('radius')}px;
  `,
});

export default Modal;
