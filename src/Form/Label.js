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
        line-height: 14px;
        left: 9px;
        font-size: ${isFloating ? 12 : 16}px;
        font-weight: 500;
        top: ${isFloating ? '6px' : '50%'};
        transform: ${isFloating ? 'none' : 'translateY(-50%)'};
        color: ${theme.colors.greyDarker};
        user-select: none;
        z-index: ${isFloating ? '1' : 'auto'};

        &:hover {
          cursor: text;
        }
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
