import React, { ForwardRefExoticComponent, PropsWithChildren, RefAttributes } from 'react';
import { css } from 'styled-components';
import Box, { BoxProps } from '../Box';
import { createComponent } from '../utils';

export interface FlexProps extends BoxProps {}

const StyledFlex = createComponent<FlexProps>({
  name: 'Flex',
  as: Box,
  style: () => css`
    display: flex;
  `,
});

/** Quickly manage the layout, alignment, and sizing of grid columns, navigation, components, and more with a full suite of responsive flexbox utilities. For more complex implementations, custom CSS may be necessary.
 */
const Flex = React.forwardRef<HTMLDivElement, any>((props, ref) => (
  <StyledFlex {...props} ref={ref} />
)) as ForwardRefExoticComponent<PropsWithChildren<FlexProps> & RefAttributes<HTMLDivElement>>;

Flex.displayName = 'Flex';

export default Flex;
