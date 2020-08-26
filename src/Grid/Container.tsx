import React, { FC } from 'react';
import { css } from 'styled-components';
import { Box, BoxProps } from '../Box';
import { createComponent } from '../utils';

const getPadding = (p: any) => (typeof p.gutter === 'number' ? p.gutter : p.theme.gridGutter);

export interface ContainerProps extends BoxProps {
  maxWidth?: number;
  gutter?: number;
  fluid?: boolean;
}

const StyledContainer = createComponent<ContainerProps>({
  name: 'Container',
  as: Box,
  style: ({ maxWidth, fluid, theme }) => css`
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    max-width: ${fluid ? '100%' : `${maxWidth || theme.gridWidth}px`};
    padding-left: ${getPadding}px;
    padding-right: ${getPadding}px;
  `,
});

StyledContainer.displayName = 'Container';

export const Container: FC<ContainerProps> = ({ gutter, children, ...rest }) => (
  <StyledContainer gutter={gutter} {...rest}>
    {React.Children.map(children, child => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, { gutter } as any);
      }
      return child;
    })}
  </StyledContainer>
);
