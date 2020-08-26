import { compose, space, color, typography, SpaceProps, ColorProps, TypographyProps } from 'styled-system';
import { createComponent } from '../utils';

export interface TextProps extends SpaceProps, ColorProps, TypographyProps {}

export const Text = createComponent<TextProps, 'span'>({
  name: 'Text',
  tag: 'span',
  style: compose(space, color, typography),
});
