import React, { Component } from 'react';
import { Transition, TransitionGroup } from 'react-transition-group';
import * as animations from 'react-animations';
import { css, keyframes } from 'styled-components';
import Portal from '../Portal';
import { Flex } from '../Flex';
import { Box } from '../Box';
import { Icon } from '../Icon';
import { emitter } from './toast';
import { createComponent } from '../utils';
import { Types, Events, Positions, PositionConfigs } from './config';

const VariantToColorMap = {
  success: 'green',
  error: 'red',
  warn: 'orange',
  info: 'blue',
};

const getTransitionStyle = (state: any, position: any, duration: any) => {
  const { animationIn, animationOut } = PositionConfigs[position];

  switch (state) {
    case 'entering':
      return css`
        animation: ${duration}ms ${keyframes`${animations[animationIn]}`};
      `;

    case 'exiting':
      return css`
        animation: ${duration}ms ${keyframes`${animations[animationOut]}`};
      `;

    default:
      return css``;
  }
};

const ToastPortal = createComponent<any>({
  name: 'ToastPortal',
  style: ({ position }) => PositionConfigs[position].wrapperStyle,
});

const Toast = createComponent<any>({
  name: 'Toast',
  style: ({ state, type, position, animationDuration, theme }) => css`
    padding: 0.75rem 1rem;
    min-width: 250px;
    max-width: 400px;
    cursor: pointer;
    color: white;
    font-weight: 600;
    border-radius: ${theme.radius}px;
    box-shadow: ${theme.shadow.soft};
    background: ${theme.colors[VariantToColorMap[type]]};
    transition: 175ms;
    z-index: 5000;

    ${getTransitionStyle(state, position, animationDuration)};

    & + & {
      margin-top: 0.5rem;
    }

    &:hover {
      box-shadow: ${theme.shadow.hard};
    }
  `,
});

interface ToastContainerProps {
  type?: string;
  position?: string;
  timeout?: number;
  animationDuration?: number;
  autoClose?: boolean;
  closeOnClick?: boolean;
  showClose?: boolean;
}

/**
Toast positions will default to `top-center`. To change the positioning, you can pass the `position` prop to the `<ToastContainer />` to be used as the default. You can also pass the position to each individual toast you're rendering, which will override the default.rendering. */
export default class ToastContainer extends Component<ToastContainerProps, any> {
  counter = 0;

  state = {
    toasts: [],
  };

  static defaultProps = {
    type: Types.INFO,
    position: Positions.TOP_CENTER,
    timeout: 5000,
    animationDuration: 250,
    autoClose: true,
    closeOnClick: true,
    showClose: true,
  };

  componentDidMount() {
    emitter.on(Events.ADD, this.add);
  }

  componentWillUnmount() {
    emitter.off(Events.ADD, this.add);
  }

  add = (options = {}) => {
    const id = ++this.counter; // eslint-disable-line

    const toast = {
      ...this.props,
      ...options,
      id,
    };

    this.setState(
      (state: any) => ({
        ...state,
        toasts: [...state.toasts, toast],
      }),
      () => {
        if (toast.autoClose) {
          setTimeout(() => {
            this.remove(id);
          }, (toast.timeout || 0) + (toast.animationDuration || 0));
        }
      }
    );
  };

  remove = (id: any) => {
    this.setState((state: any) => ({
      toasts: state.toasts.filter((t: any) => t.id !== id),
    }));
  };

  handleToastClick = (toast: any) => {
    if (toast.closeOnClick) {
      this.remove(toast.id);
    }
  };

  render() {
    const { toasts } = this.state;

    return Object.keys(Positions).map(key => {
      const p = Positions[key];
      return (
        <Portal key={p}>
          <ToastPortal position={p}>
            <TransitionGroup>
              {toasts
                .filter((t: any) => t.position === p)
                .map((toast: any) => (
                  <Transition key={toast.id} timeout={toast.animationDuration} appear unmountOnExit>
                    {state => (
                      <Toast {...toast} state={state} onClick={() => this.handleToastClick(toast)}>
                        <Flex alignItems="flex-start">
                          <Box flex={1}>{toast.message}</Box>
                          {toast.showClose && <Icon name="close" onClick={() => this.remove(toast.id)} />}
                        </Flex>
                      </Toast>
                    )}
                  </Transition>
                ))}
            </TransitionGroup>
          </ToastPortal>
        </Portal>
      );
    });
  }
}
