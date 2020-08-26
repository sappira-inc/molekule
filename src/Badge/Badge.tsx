import React from 'react';
import { css } from 'styled-components';
import { space, SpaceProps } from 'styled-system';
import { getComponentVariant, createComponent, getComponentSize } from '../utils';

export interface BadgeProps extends SpaceProps {
  variant?: string;
  size?: string;
  children?: React.ReactNode;
}

export const Badge = createComponent<BadgeProps, 'span'>({
  name: 'Badge',
  tag: 'span',
  style: ({ variant, theme, size }) => {
    const variantStyles = getComponentVariant(theme, 'Badge', variant);
    const sizeStyles = getComponentSize(theme, 'Badge', size);

    return css`
      font-family: inherit;
      font-weight: bold;

      ${variantStyles}
      ${sizeStyles}
      ${space}
    `;
  },
});
