import { css } from 'styled-components';
import { Box, BoxProps } from '../Box';
import { createComponent } from '../utils';

export interface FlexProps extends BoxProps {}

/** Quickly manage the layout, alignment, and sizing of grid columns, navigation, components, and more with a full suite of responsive flexbox utilities. For more complex implementations, custom CSS may be necessary.
 */
export const Flex = createComponent<FlexProps>({
  name: 'Flex',
  as: Box,
  style: () => css`
    display: flex;
  `,
});

Flex.displayName = 'Flex';
