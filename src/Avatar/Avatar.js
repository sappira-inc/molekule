import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'styled-components';
import Box from '../Box';
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

const AvatarContainer = createComponent({
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

const Avatar = ({ name = '', src, backgroundColor, ...props }) => (
  <AvatarContainer
    {...props}
    src={src}
    backgroundColor={backgroundColor || defaultColors[name.length % defaultColors.length]}
    aria-label={name}>
    {src ? null : getInitials(name)}
  </AvatarContainer>
);

Avatar.propTypes = {
  /**
   * We'll take the first letter of the first two words to create the initials
   */
  name: PropTypes.string.isRequired,

  /**
   * The size of the Avatar
   */
  size: PropTypes.number,

  /**
   * Border radius of the Avatar
   */
  borderRadius: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * Colors of the initials
   */
  color: PropTypes.string,

  /**
   * Background color when initials are used
   */
  backgroundColor: PropTypes.string,
};

Avatar.defaultProps = {
  size: 25,
  borderRadius: '100%',
  color: 'white',
};

export default Avatar;
