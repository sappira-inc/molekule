import { css } from 'styled-components';
import { createComponent } from '../utils';

const Label = createComponent({
  name: 'Label',
  tag: 'label',
  style: ({ isFloatable, isFloating, isFocused, isDisabled, theme }) => css`
    display: block;
    transition: 250ms;
    font-weight: 500;
    margin: 0 0 4px 4px;
    font-size: 14px;

    ${isFloatable &&
      css`
        position: absolute;
        top: 6px;
        left: 8px;
        opacity: ${isFloating ? 1 : 0};
        margin: 0;
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
