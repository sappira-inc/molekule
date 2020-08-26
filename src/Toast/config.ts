import { css } from 'styled-components';

export const Events = {
  ADD: 'add',
  REMOVE: 'remove',
};

export const Types = {
  SUCCESS: 'success',
  WARN: 'warn',
  INFO: 'info',
  ERROR: 'error',
};

export const Positions = {
  TOP_LEFT: 'top-left',
  TOP_CENTER: 'top-center',
  TOP_RIGHT: 'top-right',
  BOTTOM_LEFT: 'bottom-left',
  BOTTOM_CENTER: 'bottom-center',
  BOTTOM_RIGHT: 'bottom-right',
};

export const PositionConfigs = {
  [Positions.TOP_LEFT]: {
    animationIn: 'slideInLeft',
    animationOut: 'fadeOutUp',
    wrapperStyle: css`
      position: fixed;
      left: 1rem;
      top: 1rem;
    `,
  },
  [Positions.TOP_CENTER]: {
    animationIn: 'slideInDown',
    animationOut: 'fadeOutUp',
    wrapperStyle: css`
      position: fixed;
      left: 50%;
      transform: translateX(-50%);
      top: 1rem;
    `,
  },
  [Positions.TOP_RIGHT]: {
    animationIn: 'slideInRight',
    animationOut: 'fadeOutUp',
    wrapperStyle: css`
      position: fixed;
      right: 1rem;
      top: 1rem;
    `,
  },
  [Positions.BOTTOM_LEFT]: {
    animationIn: 'slideInLeft',
    animationOut: 'fadeOutDown',
    wrapperStyle: css`
      position: fixed;
      left: 1rem;
      bottom: 1rem;
    `,
  },
  [Positions.BOTTOM_CENTER]: {
    animationIn: 'slideInUp',
    animationOut: 'fadeOutDown',
    wrapperStyle: css`
      position: fixed;
      left: 50%;
      transform: translateX(-50%);
      border-bottom-color: 1rem;
    `,
  },
  [Positions.BOTTOM_RIGHT]: {
    animationIn: 'slideInLeft',
    animationOut: 'fadeOutDown',
    wrapperStyle: css`
      position: fixed;
      right: 1rem;
      bottom: 1rem;
    `,
  },
};
