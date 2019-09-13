import { css } from 'styled-components';
import { themeGet, createComponent } from '../utils';

const Label = createComponent({
  name: 'Label',
  tag: 'label',
  style: ({ hasLeftIcon, isFloatable, isFloating, isFocused, isDisabled, theme }) => css`
    display: block;
    transition: 250ms;
    margin: 0 0 4px 4px;
    font-size: ${themeGet('typography.fontSize')}px;

    ${isFloatable &&
      css`
        position: absolute;
        left: ${hasLeftIcon ? 24 : 8}px;
        opacity: 0;
        margin: 0;
        font-size: 16px;
        line-height: 14px;
        top: 50%;
        transform: translateY(-50%);

        ${isFloating &&
          css`
            font-size: 12px;
            top: 6px;
            transform: none;
            opacity: 1;
          `}
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
