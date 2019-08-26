import React from 'react';
import { css } from 'styled-components';
import { flexWrap, flexDirection, alignSelf, alignItems, justifyContent } from 'styled-system';
import Box from '../Box';
import { createComponent } from '../utils';

const BaseFlex = createComponent({
  name: 'Flex',
  as: Box,
  style: () => css`
    display: flex;

    ${flexWrap};
    ${flexDirection};
    ${alignItems};
    ${alignSelf};
    ${justifyContent};
  `,
});

/** Quickly manage the layout, alignment, and sizing of grid columns, navigation, components, and more with a full suite of responsive flexbox utilities. For more complex implementations, custom CSS may be necessary.
 */
const Flex = props => <BaseFlex {...props} />;

Flex.displayName = 'Flex';

Flex.propTypes = {
  ...flexWrap.propTypes,
  ...flexDirection.propTypes,
  ...alignItems.propTypes,
  ...alignSelf.propTypes,
  ...justifyContent.propTypes,
};

export default Flex;
