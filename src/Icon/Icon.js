import React from 'react';
import Proptypes from 'prop-types';
import { css } from 'styled-components';
import { createComponent } from '../utils';

const Icon = createComponent({
  name: 'Icon',
  tag: 'i',
  style: ({ theme, size, color, disabled }) => {
    const colorFromTheme = theme.colors[color];
    const resolvedColor = colorFromTheme || color;

    return css`
      color: ${resolvedColor || 'inherit'};
      font-size: ${size ? `${size}px` : 'inherit'};

      ${disabled &&
        css`
          pointer-events: none;
          opacity: 0.65;
        `};
    `;
  },
});

Icon.propTypes = {
  name: Proptypes.string.isRequired,
  size: Proptypes.number,
  color: Proptypes.string,
};

Icon.iconPrefix = 'mdi';
Icon.getIconClassName = name => `${Icon.iconPrefix} ${Icon.iconPrefix}-${name}`;

export default React.forwardRef(({ name, className, ...props }, ref) => (
  <Icon {...props} ref={ref} className={`${Icon.getIconClassName(name)} ${className || ''}`} />
));
