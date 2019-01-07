import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'styled-components';
import { space } from 'styled-system';
import { getComponentVariant, createComponent } from '../utils';

const StyledBadge = createComponent({
  name: 'Badge',
  tag: 'span',
  style: ({ variant, theme, size }) => {
    const { backgroundColor, fontColor } = getComponentVariant(theme, 'Badge', variant);
    const fontSize = theme.fontSizes[size];

    return css`
      padding: ${fontSize / 3}px ${fontSize / 1.5}px;
      font-size: ${theme.fontSizes[size]}px;
      font-family: ${theme.typography.fontFamily || 'inherit'};
      font-weight: bold;
      border-radius: ${fontSize}px;
      background: ${backgroundColor};
      color: ${fontColor};
      ${space};
    `;
  },
});

const Badge = props => <StyledBadge {...props} />;

Badge.propTypes = {
  variant: PropTypes.string,
  size: PropTypes.string,
};

Badge.defaultProps = {
  variant: 'info',
  size: 'md',
};

export default Badge;
