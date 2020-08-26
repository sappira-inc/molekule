import React, { FC } from 'react';
import { css } from 'styled-components';
import Flex, { FlexProps } from '../Flex';
import { createComponent } from '../utils';

const getMargin = (p: any) => {
  if (p.collapse) return 0;
  return typeof p.gutter === 'number' ? p.gutter / 2 : p.theme.gridGutter / 2;
};

export interface RowProps extends FlexProps {
  vertical?: boolean;
  gutter?: number;
  reverse?: boolean;
  collapse?: boolean;
}

const StyledRow = createComponent<RowProps>({
  name: 'Row',
  as: Flex,
  style: ({ vertical, reverse }) => {
    const direction = vertical ? 'column' : 'row';

    return css`
      flex: 0 1 auto;
      flex-direction: ${reverse ? `${direction}-reverse` : direction};
      flex-wrap: wrap;
      margin-right: -${getMargin}px;
      margin-left: -${getMargin}px;
    `;
  },
});

/**
Rows are usually found within a container to wrap columns.
 */

export const Row: FC<RowProps> = ({ children, gutter, reverse, collapse, vertical, ...props }) => (
  <StyledRow {...props} gutter={gutter} reverse={reverse} collapse={collapse} vertical={vertical}>
    {React.Children.map(children, child => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, { gutter, collapse, vertical } as any);
      }
      return child;
    })}
  </StyledRow>
);

Row.displayName = 'Row';
