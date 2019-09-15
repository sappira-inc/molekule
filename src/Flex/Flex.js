import React from 'react';
import { css } from 'styled-components';
import Box from '../Box';
import { createComponent } from '../utils';

const StyledFlex = createComponent({
  name: 'Flex',
  as: Box,
  style: () => css`
    display: flex;
  `,
});

/** Quickly manage the layout, alignment, and sizing of grid columns, navigation, components, and more with a full suite of responsive flexbox utilities. For more complex implementations, custom CSS may be necessary.
 */
const Flex = React.forwardRef((props, ref) => <StyledFlex {...props} ref={ref} />);

Flex.displayName = 'Flex';

Flex.propTypes = {
  ...Box.propTypes,
};

export default Flex;
