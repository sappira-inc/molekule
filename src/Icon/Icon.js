import React from 'react';
import Proptypes from 'prop-types';
import { css } from 'styled-components';
import { createComponent } from '../utils';

const StyledIcon = createComponent({
  name: 'Icon',
  tag: 'i',
  style: ({ theme, size, color, disabled }) => {
    const colorFromTheme = theme.colors[color];
    const resolvedColor = colorFromTheme || color;

    return css`
      color: ${resolvedColor || 'inherit'};
      font-size: ${`${size}px` || 'inherit'};

      ${disabled &&
        css`
          pointer-events: none;
          opacity: 0.65;
        `};
    `;
  },
});

class Icon extends React.Component {
  static iconPrefix = 'mdi';
  static getIconClassName(name) {
    return `${this.iconPrefix} ${this.iconPrefix}-${name}`;
  }

  render() {
    const { name, className = '', ...props } = this.props;

    return <StyledIcon {...props} className={`${this.constructor.getIconClassName(name)} ${className}`} />;
  }
}

Icon.propTypes = {
  name: Proptypes.string.isRequired,
  size: Proptypes.number,
  color: Proptypes.string,
};

export default Icon;
