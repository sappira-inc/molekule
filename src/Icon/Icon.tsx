import { css } from 'styled-components';
import { createComponent } from '../utils';

export interface IconProps {
  name: string;
  size?: number;
  color?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export const Icon = createComponent<IconProps, 'i'>({
  name: 'Icon',
  tag: 'i',
  props: ({ name }) => ({
    className: `mdi mdi-${name}`,
  }),
  style: ({ theme, size, color, disabled, onClick }) => {
    const colorFromTheme = color ? theme.colors[color] : '';
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
