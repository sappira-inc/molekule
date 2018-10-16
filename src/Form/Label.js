import { css } from 'styled-components';
import { createComponent } from '../utils';

const Label = createComponent({
  name: 'Label',
  tag: 'label',
  style: ({ isFloatable, isFloating, size, theme }) => css`
    display: block;
    transition: 250ms;
    font-weight: 500;
    margin: 0 0 4px 4px;
    z-index: 10;
    font-size: ${p => p.theme.fontSizes[p.size]}px;

    ${isFloatable &&
      css`
        position: absolute;
        top: 2px;
        left: 8px;
        opacity: ${isFloating ? 1 : 0};
        margin: 0;
        font-size: ${theme.fontSizes[size] * 0.8}px;
      `};
  `,
});

export default Label;
