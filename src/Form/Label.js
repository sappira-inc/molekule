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
        margin: 0;
        font-size: 16px;
        line-height: 14px;
        left: 9px;
        top: 50%;
        transform: translateY(-50%);
        user-select: none;

        &:hover {
          cursor: text;
        }

        ${isFloating &&
          css`
            font-size: 12px;
            top: 6px;
            transform: none;
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
