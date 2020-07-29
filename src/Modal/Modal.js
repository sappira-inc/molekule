import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { keyframes, css } from 'styled-components';
import * as animations from 'react-animations';
import { Transition } from 'react-transition-group';
import { FocusOn } from 'react-focus-on';
import Portal from '../Portal';
import Flex from '../Flex';
import Icon from '../Icon';
import Button from '../Button';
import { createComponent, themeGet } from '../utils';

const ModalContext = createContext({});

const getAnimation = name => keyframes`${animations[name]}`;

const ModalContainer = createComponent({
  name: 'ModalContainer',
  style: css`
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    padding: 1rem;
    display: flex;
    position: fixed;
    align-items: center;
    overflow-y: auto;
    overflow-x: hidden;
    justify-content: center;
  `,
});
const Backdrop = createComponent({
  name: 'ModalBackdrop',
  style: ({ transitionState }) => css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
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
  style: ({ minWidth, maxWidth, transitionState, animationIn, animationOut, theme }) => css`
    position: relative;
    margin: auto;
    min-width: ${minWidth}px;
    max-width: ${maxWidth}px;
    background: #ffffff;
    background-clip: padding-box;
    box-shadow: ${theme.shadow.hard};
    border-radius: ${themeGet('radius')}px;
    max-height: 90vh;

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

/** Modals are a great way to add dialogs to your site for lightboxes, user notifications, or completely custom content. */
export function Modal({ children, title, animationDuration, showClose, onClose, open, ...props }) {
  const [isOpen, setOpen] = useState(open);
  const modalRef = React.useRef(null);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  const handleContentClick = event => event.stopPropagation();

  const handleBackdropClick = () => {
    if (!props.closeOnBackdropClick) return;

    handleClose();
  };

  const scrollToTop = () => {
    if (modalRef.current && modalRef.current.scroll) {
      modalRef.current.scroll(0, 0);
    }
  };

  useEffect(() => {
    if (open !== isOpen) {
      setOpen(open);
    }
  }, [open]);

  return (
    <ModalContext.Provider value={{ handleClose }}>
      <Portal>
        <Transition in={isOpen} timeout={animationDuration} onEntering={scrollToTop} mountOnEnter unmountOnExit appear>
          {state => (
            <FocusOn onEscapeKey={handleClose} enabled={isOpen}>
              <ModalContainer ref={modalRef}>
                <Backdrop transitionState={state} onClick={handleBackdropClick} />
                <ModalContent transitionState={state} onClick={handleContentClick} aria-modal="true" {...props}>
                  {title && <Modal.Header title={title} showClose={showClose} />}
                  {children}
                </ModalContent>
              </ModalContainer>
            </FocusOn>
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
    margin: 0;
    outline: none;
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
    border-bottom: 1px solid ${theme.colors.grey};
  `,
});

Modal.Header = ({ title, children, showClose = true }) => {
  const { handleClose } = useContext(ModalContext);

  const handleKeyDown = ({ keyCode }) => {
    if (keyCode === 13) {
      handleClose();
    }
  };

  return (
    <ModalHeader>
      <ModalHeaderInner>
        <Flex alignItems="center">
          {title && <Modal.Title role="heading">{title}</Modal.Title>}
          {children}

          {showClose && (
            <Icon
              style={{ marginLeft: 'auto', marginRight: -6, outline: 'none' }}
              onClick={handleClose}
              onKeyDown={handleKeyDown}
              aria-label="Close Modal"
              role="button"
              tabIndex="-1"
              name="close"
              color="greyDarkest"
              size={24}
            />
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
    max-height: calc(90vh - 105px);
    overflow-y: auto;
  `,
});

Modal.Footer = createComponent({
  name: 'ModalFooter',
  style: css`
    padding: 0 1.25rem 1rem;
    border-bottom-left-radius: ${themeGet('radius')}px;
    border-bottom-right-radius: ${themeGet('radius')}px;
  `,
});

export default Modal;
