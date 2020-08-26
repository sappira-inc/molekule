import { css } from 'styled-components';
import { themeGet, createComponent } from '../utils';

interface LabelProps {
  htmlFor?: any;
  styles?: any;
  multiline?: boolean;
  isFloatable?: boolean;
  isFloating?: boolean;
  isFocused?: boolean;
  isDisabled?: boolean;
  error?: any;
  size?: any;
}

const Label = createComponent<LabelProps, 'label'>({
  name: 'Label',
  tag: 'label',
  style: ({ isFloatable, isFloating, isFocused, isDisabled, multiline, theme }) => {
    const isLabelFloating = isFloating || (multiline && isFloatable);

    return css`
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
          font-size: ${isLabelFloating ? 12 : 16}px;
          font-weight: 500;
          top: ${isLabelFloating ? '6px' : '50%'};
          transform: ${isLabelFloating ? 'none' : 'translateY(-50%)'};
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
    `;
  },
});

export default Label;
