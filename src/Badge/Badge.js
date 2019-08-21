import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'styled-components';
import { space } from 'styled-system';
import { getComponentVariant, createComponent, getComponentSize } from '../utils';

const StyledBadge = createComponent({
  name: 'Badge',
  tag: 'span',
  style: ({ variant, theme, size }) => {
    const variantStyles = getComponentVariant(theme, 'Badge', variant);
    const { fontSize, paddingVertical, paddingHorizontal } = getComponentSize(theme, 'Badge', size);

    return css`
      padding: ${paddingVertical}px ${paddingHorizontal}px;
      font-size: ${fontSize}px;
      font-family: inherit;
      font-weight: bold;
      border-radius: ${fontSize}px;

      ${variantStyles}
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
