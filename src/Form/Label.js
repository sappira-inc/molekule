import { css } from 'styled-components';
import { themeGet, createComponent } from '../utils';

const Label = createComponent({
  name: 'Label',
  tag: 'label',
  style: ({ isFloatable, isFloating, isFocused, isDisabled, theme }) => css`
    display: block;
    transition: 250ms;
    margin: 0 0 4px 4px;
    font-size: ${themeGet('typography.fontSize')}px;

    ${isFloatable &&
      css`
        position: absolute;
        top: 6px;
        left: 8px;
        opacity: ${isFloating ? 1 : 0};
        margin: 0;
        font-size: 12px;
        line-height: 14px;
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
