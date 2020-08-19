import { css } from 'styled-components';
import { createComponent } from '../utils';

const bubbleSize = 22;

export interface OrderedListProps {}

export const OrderedList = createComponent<OrderedListProps, 'ol'>({
  name: 'OrderedList',
  tag: 'ol',
  style: ({ theme }) => css`
    counter-reset: my-counter;
    list-style: none;
    padding: 2px; /* Provide space for bubble */
    padding-left: ${bubbleSize + theme.space[2]}px;

    > li {
      counter-increment: my-counter;
      position: relative;
      margin-top: 18px;

      &:first-of-type {
        margin-top: 0;
      }

      &::before {
        content: counter(my-counter);
        font-family: ${theme.typography.headerFontFamily || 'inherit'};
        position: absolute;
        left: ${bubbleSize * -1 - theme.space[2]}px;
        line-height: ${bubbleSize}px;
        width: ${bubbleSize}px;
        height: ${bubbleSize}px;
        top: -2px;
        border-radius: 50%;
        text-align: center;
        border: 1px solid ${theme.colors.grey};
      }
    }
  `,
});
