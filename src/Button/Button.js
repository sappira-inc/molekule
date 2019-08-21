import React from 'react';
import PropTypes from 'prop-types';
import { css, keyframes } from 'styled-components';
import { space } from 'styled-system';
import { getComponentVariant, getComponentSize, createComponent } from '../utils';
import Flex from '../Flex';
import Icon from '../Icon';

const spinKeyframes = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
}`;

const loadingCss = (height, color) => css`
  color: transparent !important;
  pointer-events: none;
  position: relative;
  text-index: -9999px;
  opacity: 0.75;

  &::after {
    display: block;
    content: '';
    animation: ${spinKeyframes} 820ms infinite linear;
    border-radius: 100%;
    border: 2px solid ${color};
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
  style: ({ hasText, leftIcon, rightIcon, variant, size, theme, block, disabled, loading, borderRadius }) => {
    const variantStyles = getComponentVariant(theme, 'Button', variant);
    const sizeStyles = getComponentSize(theme, 'Button', size);

    return css`
      display: inline-block;
      cursor: pointer;
      text-transform: capitalize;
      text-align: center;
      text-decoration: none;
      font-family: inherit;
      font-weight: bold;
      appearance: none;
      border-radius: ${borderRadius || theme.radius}px;
      pointer-events: ${disabled ? 'none' : 'auto'};
      width: ${block ? '100%' : 'auto'};
      border: 1px solid transparent;
      transition: 175ms;
      white-space: nowrap;
      user-select: none;

      ${leftIcon &&
        hasText &&
        css`
          i {
            padding-right: 4px;
          }
        `}

      ${rightIcon &&
        hasText &&
        css`
          i {
            padding-left: 4px;
          }
        `}

      &[disabled] {
        pointer-events: none;
        opacity: 0.75;
      }

      ${loading && loadingCss(sizeStyles.height, variantStyles.color)};
      ${variantStyles}
      ${sizeStyles};
      ${space};
    `;
  },
});

const renderIcon = (icon, props) => <Icon name={icon} {...props} />;

const Button = React.forwardRef(({ children, leftIcon, leftIconProps, rightIcon, rightIconProps, ...rest }, ref) => (
  <StyledButton ref={ref} hasText={!!children} leftIcon={leftIcon} rightIcon={rightIcon} {...rest}>
    <Flex alignItems="center">
      {leftIcon && renderIcon(leftIcon, leftIconProps)}
      {children}
      {rightIcon && renderIcon(rightIcon, rightIconProps)}
    </Flex>
  </StyledButton>
));

Button.propTypes = {
  variant: PropTypes.string,
  size: PropTypes.string,
  outline: PropTypes.bool,
  block: PropTypes.bool,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  leftIcon: PropTypes.string,
  leftIconProps: PropTypes.shape(),
  rightIcon: PropTypes.string,
  rightIconProps: PropTypes.shape(),
};

Button.defaultProps = {
  variant: 'primary',
  size: 'md',
  outline: false,
  block: false,
  disabled: false,
  loading: false,
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
          margin-right: 0;
        }
      }

      & > button:not(:first-child) {
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
    connected = false,
  }) => css`
    & > button:not(:first-child) {
      margin-left: 1rem;
    }

    ${connected &&
      css`
        & > button:not(:first-child) {
          margin-left: 0;
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
      `}

    ${vertical && verticalCss({ sizes, vertical, borderRadius })};
  `,
});

export default Button;
