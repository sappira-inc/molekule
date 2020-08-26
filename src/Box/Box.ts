import {
  compose,
  space,
  color,
  typography,
  layout,
  flexbox,
  position,
  background,
  SpaceProps,
  ColorProps,
  TypographyProps,
  LayoutProps,
  FlexboxProps,
  PositionProps,
  BackgroundProps,
} from 'styled-system';
import { createComponent } from '../utils';

export interface BoxProps
  extends SpaceProps,
    ColorProps,
    TypographyProps,
    LayoutProps,
    FlexboxProps,
    PositionProps,
    BackgroundProps {
  color?:
    | string
    | (string & (string | number | symbol | null)[])
    | (string & {
        [x: string]: string | number | symbol | undefined;
        [x: number]: string | number | symbol | undefined;
      })
    | undefined; // typing issue
}

export const Box = createComponent<BoxProps>({
  name: 'Box',
  style: compose(space, color, typography, layout, flexbox, position, background),
});
