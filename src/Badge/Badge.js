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
    const sizeStyles = getComponentSize(theme, 'Badge', size);

    return css`
      font-family: inherit;
      font-weight: bold;

      ${variantStyles};
      ${sizeStyles};
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
