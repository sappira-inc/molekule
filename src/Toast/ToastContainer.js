import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Transition, TransitionGroup } from 'react-transition-group';
import * as animations from 'react-animations';
import { css, keyframes } from 'styled-components';
import Portal from '../Portal';
import Flex from '../Flex';
import Box from '../Box';
import Icon from '../Icon';
import { emitter } from './toast';
import { createComponent, themeGet } from '../utils';
import { Types, Events, Positions, PositionConfigs } from './config';

const VariantToColorMap = {
  success: 'green',
  error: 'red',
  warn: 'orange',
  info: 'blue',
};

const getTransitionStyle = (state, position, duration) => {
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

const ToastPortal = createComponent({
  name: 'ToastPortal',
  style: ({ position }) => PositionConfigs[position].wrapperStyle,
});

const Toast = createComponent({
  name: 'Toast',
  style: ({ state, type, position, animationDuration, theme }) => css`
    padding: 0.75rem 1rem;
    min-width: 250px;
    max-width: 400px;
    cursor: pointer;
    color: white;
    font-weight: 600;
    border-radius: ${themeGet('radius')}px;
    box-shadow: ${themeGet('shadow')};
    background: ${theme.colors[VariantToColorMap[type]]};
    transition: 175ms;

    ${getTransitionStyle(state, position, animationDuration)};

    & + & {
      margin-top: 0.5rem;
    }

    &:hover {
      box-shadow: ${themeGet('shadowHover')};
    }
  `,
});

/**
Toast positions will default to `top-center`. To change the positioning, you can either pass the `position` prop to the `<ToastContainer />` to be used as the default. You can also pass the position to each individual toast you're rendering, which will override the default.rendering. */
export default class ToastContainer extends Component {
  counter = 0;
  state = {
    toasts: [],
  };

  static propTypes = {
    type: PropTypes.string,
    position: PropTypes.string,
    timeout: PropTypes.number,
    animationDuration: PropTypes.number,
    autoClose: PropTypes.bool,
    closeOnClick: PropTypes.bool,
    showClose: PropTypes.bool,
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
      state => ({
        ...state,
        toasts: [...state.toasts, toast],
      }),
      () => {
        if (toast.autoClose) {
          setTimeout(() => {
            this.remove(id);
          }, toast.timeout + toast.animationDuration);
        }
      }
    );
  };

  remove = id => {
    this.setState(state => ({
      toasts: state.toasts.filter(t => t.id !== id),
    }));
  };

  handleToastClick = toast => {
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
                .filter(t => t.position === p)
                .map(toast => (
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
