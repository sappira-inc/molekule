import PropTypes from 'prop-types';
import { css } from 'styled-components';
import { createComponent } from '../utils';

export interface IconProps {
  name: string;
  size?: number;
  color?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const Icon = createComponent<IconProps, 'i'>({
  name: 'Icon',
  tag: 'i',
  props: ({ name }) => ({
    className: `mdi mdi-${name}`,
  }),
  style: ({ theme, size, color, disabled, onClick }: any) => {
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

export default Icon;
