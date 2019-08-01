import { css } from 'styled-components';
import { createComponent, getOneSizeSmaller } from '../utils';

const Label = createComponent({
  name: 'Label',
  tag: 'label',
  style: ({ isFloatable, isFloating, size, theme }) => css`
    display: block;
    transition: 250ms;
    font-weight: 500;
    margin: 0 0 4px 4px;
    font-size: ${theme.fontSizes[size]}px;

    ${isFloatable &&
      css`
        position: absolute;
        top: 2px;
        left: 8px;
        opacity: ${isFloating ? 1 : 0};
        margin: 0;
        font-size: ${getOneSizeSmaller(theme.fontSizes, size)}px;
      `};
  `,
});

export default Label;
