import React from 'react';
import { compose, space, color, typography, SpaceProps, ColorProps, TypographyProps } from 'styled-system';
import { createComponent } from '../utils';

export interface TextProps extends SpaceProps, ColorProps, TypographyProps {
  as?: any;
}

const StyledText = createComponent<TextProps, 'span'>({
  name: 'Text',
  tag: 'span',
  style: compose(space, color, typography),
});

const Text = React.forwardRef<HTMLSpanElement, TextProps & React.ComponentProps<'span'>>((props, ref) => (
  <StyledText {...props} ref={ref} />
));

export default Text;
