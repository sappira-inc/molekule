import React from 'react';
import { compose, space, color, typography } from 'styled-system';
import propTypes from '@styled-system/prop-types';
import { createComponent } from '../utils';

const StyledText = createComponent({
  name: 'Text',
  tag: 'span',
  style: compose(
    space,
    color,
    typography
  ),
});

const Text = React.forwardRef((props, ref) => <StyledText {...props} ref={ref} />);

Text.propTypes = {
  ...propTypes.typography,
  ...propTypes.color,
  ...propTypes.space,
};

export default Text;
