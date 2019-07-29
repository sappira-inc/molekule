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

const loadingCss = ({ height, fontColor, outline, backgroundColor }) => css`
  color: transparent !important;
  pointer-events: none;
  position: relative;
  text-index: -9999px;
  opacity: 0.75;

  &::after {
    display: block;
    content: '';
    border-color: ${outline ? backgroundColor : fontColor};
    animation: ${spinKeyframes} 820ms infinite linear;
    border-width: ${height * 0.05}px;
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
    outline = false,
    block = false,
    disabled = false,
    loading = false,
    transparent = false,
    height = theme.heights[size],
    fontSize = theme.fontSizes[size],
    borderRadius = theme.radius || 2,
  }) => {
    const { backgroundColor, fontColor } = getComponentVariant(theme, 'Button', variant);

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
      color: ${outline ? backgroundColor : fontColor};
      height: ${height}px;
      padding: 0 ${height * 0.5}px;
      font-size: ${fontSize}px;
      width: ${block ? '100%' : 'auto'};
      background: ${outline || transparent ? 'transparent' : backgroundColor};
      border-color: ${transparent ? 'none' : backgroundColor};
      border: ${transparent ? 'none' : '1px solid'};
      transition: 175ms;

      ${loading && loadingCss({ height, fontColor, outline, backgroundColor })};

      &:hover {
        background: ${outline ? 'transparent !important' : theme.colors.primaryLight};
        border-color: ${theme.colors.primaryLight};
      }

      &:active {
        background: ${outline ? 'transparent !important' : theme.colors.primaryDark};
        border-color: ${theme.colors.primaryDark};
      }

      &[disabled] {
        background: ${theme.colors.primaryLightest};
        border-color: ${theme.colors.primaryLightest};
      }

      ${space};
    `;
  },
});

const ButtonIcon = styled(Icon)`
  font-size: ${p => p.theme.heights[p.sizing] * 0.54}px;
  margin-right: 6px;
  margin-top: 2px;
`;

const Button = React.forwardRef((props, ref) => (
  <StyledButton {...props} ref={ref}>
    {props.icon ?
      <Flex alignItems="center">
        <ButtonIcon name={props.icon} sizing={props.size} />
        {props.children}
      </Flex>
      :
      props.children
    }
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

const verticalCss = ({ sizes, vertical }) => {
  const maybeNumber = parseInt(vertical, 10);
  const fallback = sizes[vertical] || sizes.sm;
  const breakpoint = Number.isInteger(maybeNumber) ? `${maybeNumber}px` : `${fallback}px`;

  return css`
    @media (max-width: ${breakpoint}) {
      flex-direction: column;

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
      grid: { sizes },
    },
  }) => css`
    & > *:not(:first-child) {
      margin-left: 1rem;
    }

    ${vertical && verticalCss({ sizes, vertical })};
  `,
});

export default Button;
