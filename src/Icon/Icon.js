import PropTypes from 'prop-types';
import { css } from 'styled-components';
import { createComponent } from '../utils';

const Icon = createComponent({
  name: 'Icon',
  tag: 'i',
  props: ({ name }) => ({
    className: Icon.getClassName(name),
  }),
  style: ({ theme, size, color, disabled, onClick }) => {
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

      ${onClick &&
        css`
          cursor: pointer;
        `}
    `;
  },
});

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
  onClick: PropTypes.func,
};

Icon.iconPrefix = 'mdi';
Icon.getClassName = name => `${Icon.iconPrefix} ${Icon.iconPrefix}-${name}`;

export default Icon;
