import React from 'react';
import PropTypes from 'prop-types';
import styled, { css, keyframes } from 'styled-components';
import { space } from 'styled-system';
import { getComponentVariant, createComponent } from '../utils';
import Flex from '../Flex';
import Icon from '../Icon';

const spinKeyframes = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
}`;

const loadingCss = ({ height, borderColor, fontColor }) => css`
  color: transparent !important;
  pointer-events: none;
  position: relative;
  text-index: -9999px;
  opacity: 0.75;

  &::after {
    display: block;
    content: '';
    border-color: ${borderColor || fontColor};
    animation: ${spinKeyframes} 820ms infinite linear;
    border-width: 2px;
    border-style: solid;
    border-radius: 100%;
    border-right-color: transparent;
    border-top-color: transparent;
    left: 50%;
    margin-left: -${height * 0.25}px;
    margin-top: -${height * 0.25}px;
    position: absolute;
    top: 48%;
    height: ${height * 0.5}px;
    width: ${height * 0.5}px;
  }
`;

const StyledButton = createComponent({
  name: 'Button',
  tag: 'button',
  style: ({
    variant,
    size,
    theme,
    block = false,
    disabled = false,
    loading = false,
    text = false,
    height = theme.heights[size],
    fontSize = theme.fontSizes[size],
    borderRadius = theme.radius || 2,
  }) => {
    const { textColor, borderColor, backgroundColor, fontColor, hover, active, disabled: disabledState } = getComponentVariant(theme, 'Button', variant);

    return css`
      font-family: inherit;
      display: inline-block;
      text-align: center;
      cursor: pointer;
      text-transform: capitalize;
      font-weight: bold;
      text-decoration: none;
      appearance: none;
      border-radius: ${borderRadius}px;
      pointer-events: ${disabled ? 'none' : 'auto'};
      color: ${fontColor};
      height: ${height}px;
      padding: 0 ${height * 0.5}px;
      font-size: ${fontSize}px;
      width: ${block ? '100%' : 'auto'};
      background: ${backgroundColor};
      border-color: ${borderColor || backgroundColor};
      border-style: solid;
      border-width: 1px;
      transition: 175ms;
      white-space: nowrap;
      outline: none;
      user-select: none;

      ${loading && loadingCss({ height, fontColor, backgroundColor, borderColor })};

      &:hover {
        background-color: ${backgroundColor};
        border-color: ${borderColor || backgroundColor};
        color: ${fontColor};

        ${hover &&
          css`
            background-color: ${hover.backgroundColor || backgroundColor};
            border-color: ${hover.borderColor || hover.backgroundColor || backgroundColor};
            color: ${hover.fontColor || fontColor};
          `}
      }

      &:active {
        background: ${backgroundColor};
        border-color: ${borderColor || backgroundColor};
        color: ${fontColor};

        ${active &&
          css`
            background-color: ${active.backgroundColor || backgroundColor};
            border-color: ${active.borderColor || active.backgroundColor || backgroundColor};
            color: ${active.fontColor || fontColor};
          `}
      }

      &[disabled] {
        pointer-events: none;
        background: ${backgroundColor};
        border-color: ${borderColor || backgroundColor};
        color: ${fontColor};

        ${disabledState &&
          css`
            background-color: ${disabledState.backgroundColor || backgroundColor};
            border-color: ${disabledState.borderColor || disabledState.backgroundColor || backgroundColor};
            color: ${disabledState.fontColor || fontColor};
          `}
      }

      ${text &&
        css`
          background-color: transparent !important;
          border-color: transparent !important;
          color: ${textColor || backgroundColor} !important;
        `}

      ${space};
    `;
  },
});

const ButtonIcon = styled(Icon)`
  ${p => css`
    margin-right: ${p.hasText ? '6px' : 0};
    margin-top: 2px;
    font-size: ${p.theme.buttonIconSizes[p.sizing]};
  `}
`;

const Button = React.forwardRef((props, ref) => (
  <StyledButton {...props} ref={ref}>
    {props.icon ? (
      <Flex alignItems="center">
        <ButtonIcon name={props.icon} sizing={props.size} hasText={!!props.children} />
        {props.children}
      </Flex>
    ) : (
        props.children
      )}
  </StyledButton>
));

Button.propTypes = {
  variant: PropTypes.string,
  size: PropTypes.string,
  outline: PropTypes.bool,
  block: PropTypes.bool,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  transparent: PropTypes.bool,
  icon: PropTypes.string,
};

Button.defaultProps = {
  variant: 'primary',
  size: 'md',
  outline: false,
  block: false,
  disabled: false,
  loading: false,
  transparent: false,
  icon: '',
};

const verticalCss = ({ sizes, vertical, borderRadius }) => {
  const maybeNumber = parseInt(vertical, 10);
  const fallback = sizes[vertical] || sizes.sm;
  const breakpoint = Number.isInteger(maybeNumber) ? `${maybeNumber}px` : `${fallback}px`;

  return css`
    @media (max-width: ${breakpoint}) {
      flex-direction: column;

      &&& {
        & > button {
          border-radius: ${borderRadius}px;
        }
      }

      & > *:not(:first-child) {
        margin: 1rem 0 0;
      }
    }
  `;
};

Button.Group = createComponent({
  name: 'ButtonGroup',
  as: Flex,
  style: ({
    vertical = false,
    theme: {
      radius,
      grid: { sizes },
    },
    borderRadius = radius || 2,
  }) => css`
    & > button {
      padding-left: 20px;
      padding-right: 20px;
    }
    & > button:first-child {
      border-radius: ${borderRadius}px 0 0 ${borderRadius}px;
    }
    & > button:last-child {
      border-radius: 0 ${borderRadius}px ${borderRadius}px 0;
    }

    & > :not(:first-child):not(:last-child) {
      border-radius: 0;
    }

    ${vertical && verticalCss({ sizes, vertical, borderRadius })};
  `,
});

export default Button;
