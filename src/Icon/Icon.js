import PropTypes from 'prop-types';
import { css } from 'styled-components';
import { createComponent } from '../utils';

const Icon = createComponent({
  name: 'Icon',
  tag: 'i',
  props: ({ name }) => ({
    className: Icon.getClassName(name),
  }),
  style: ({ theme, size, color, disabled }) => {
    const colorFromTheme = theme.colors[color];
    const resolvedColor = colorFromTheme || color;
    const resolvedSize = typeof size === 'string' ? theme.fontSizes[size] : size;

    return css`
      color: ${resolvedColor || 'inherit'};
      font-size: ${size ? `${resolvedSize}px` : 'inherit'};

      ${disabled &&
        css`
          pointer-events: none;
          opacity: 0.65;
        `};
    `;
  },
});

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.string,
  onClick: PropTypes.func,
};

Icon.iconPrefix = 'mdi';
Icon.getClassName = name => `${Icon.iconPrefix} ${Icon.iconPrefix}-${name}`;

export default Icon;
