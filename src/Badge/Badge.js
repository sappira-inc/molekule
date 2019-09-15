import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'styled-components';
import { space } from 'styled-system';
import propTypes from '@styled-system/prop-types';
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

const Badge = React.forwardRef((props, ref) => <StyledBadge {...props} ref={ref} />);

Badge.propTypes = {
  variant: PropTypes.string,
  size: PropTypes.string,
  ...propTypes.space,
};

Badge.defaultProps = {
  variant: 'info',
  size: 'md',
};

export default Badge;
