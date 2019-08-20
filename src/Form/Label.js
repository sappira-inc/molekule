import { css } from 'styled-components';
import { createComponent } from '../utils';

const Label = createComponent({
  name: 'Label',
  tag: 'label',
  style: ({ isFloatable, isFloating, isFocused, isDisabled, size, theme }) => css`
    display: block;
    transition: 250ms;
    font-weight: 500;
    margin: 0 0 4px 4px;
    font-size: ${theme.fontSizes[size]}px;

    ${isFloatable &&
      css`
        position: absolute;
        top: 6px;
        left: 8px;
        opacity: ${isFloating ? 1 : 0};
        margin: 0;
        font-size: calc(${theme.fontSizes[size]}px * 0.8);
        line-height: calc(${theme.fontSizes[size]}px * 1.2);
      `};

    ${isFocused &&
      css`
        color: ${theme.colors.primary};
      `}

    ${isDisabled &&
      css`
        color: ${theme.colors.grey};
      `}
  `,
});

export default Label;
