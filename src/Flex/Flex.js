import { css } from 'styled-components';
import { flexWrap, flexDirection, alignSelf, alignItems, justifyContent } from 'styled-system';
import Box from '../Box';
import { createComponent } from '../utils';

const Flex = createComponent({
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

Flex.displayName = 'Flex';

Flex.propTypes = {
  ...flexWrap.propTypes,
  ...flexDirection.propTypes,
  ...alignItems.propTypes,
  ...alignSelf.propTypes,
  ...justifyContent.propTypes,
};

export default Flex;
