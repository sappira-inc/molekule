import React from 'react';
import { css } from 'styled-components';
import Box, { BoxProps } from '../Box';
import { createComponent } from '../utils';

// from https://flatuicolors.com/
const defaultColors = [
  '#2ecc71', // emerald
  '#3498db', // peter river
  '#8e44ad', // wisteria
  '#e67e22', // carrot
  '#e74c3c', // alizarin
  '#1abc9c', // turquoise
  '#2c3e50', // midnight blue
];

const getInitials = (name = '') =>
  name
    .split(' ')
    .slice(0, 2)
    .map(w => w[0])
    .join('');

export interface AvatarProps {
  /**
   * We'll take the first letter of the first two words to create the initials
   */
  name?: string;

  /**
   * The size of the Avatar
   */
  size?: number;

  /**
   * The image source of the Avatar
   */
  src?: string;

  /**
   * Border radius of the Avatar
   */
  borderRadius?: string | number;

  /**
   * Colors of the initials
   */
  color?: string;

  /**
   * Background color when initials are used
   */
  backgroundColor?: string;
}

const AvatarContainer = createComponent<AvatarProps & BoxProps>({
  name: 'Avatar',
  as: Box,
  style: ({ size, borderRadius, color, backgroundColor, src, theme }) => css`
    height: ${size}px;
    width: ${size}px;
    border-radius: ${borderRadius};
    background: ${theme.colors[backgroundColor] || backgroundColor};
    color: ${color};
    text-align: center;
    line-height: ${size}px;
    font-size: ${size * 0.5}px;

    ${src && {
      backgroundImage: `url(${src})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    }};
  `,
});

const Avatar: React.FC<AvatarProps & BoxProps> = ({
  name = '',
  src,
  backgroundColor,
  size = 25,
  borderRadius = '100%',
  color = 'white',
  ...props
}) => (
  <AvatarContainer
    size={size}
    borderRadius={borderRadius}
    color={color}
    src={src}
    backgroundColor={backgroundColor || defaultColors[name.length % defaultColors.length]}
    aria-label={name}
    {...props}>
    {src ? null : getInitials(name)}
  </AvatarContainer>
);

export default Avatar;
