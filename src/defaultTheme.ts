import { ThemeBreakpoints, Theme } from 'types';
import { defaultThemeColors } from './defaultThemeColors';
import { defaultBreakpoints } from './defaultBreakpoints';
import { defaultThemeSizes } from './defaultThemeSizes';
import { defaultThemeVariants } from './defaultThemeVariants';

const breakpoints = [...defaultBreakpoints] as string[] & ThemeBreakpoints;
/* eslint-disable prefer-destructuring */
breakpoints.xs = breakpoints[0];
breakpoints.sm = breakpoints[1];
breakpoints.md = breakpoints[2];
breakpoints.lg = breakpoints[3];
breakpoints.xl = breakpoints[4];

export const defaultTheme: Theme = {
  classPrefix: 're',
  colors: defaultThemeColors,
  space: [0, 4, 8, 16, 24, 32, 64, 126, 256],

  breakpoints,
  gridWidth: 1200,
  gridGutter: 16,
  gridColumns: 12,

  radii: [0, 2, 4, 8],
  radius: 8,

  shadow: {
    soft: '0px 2px 16px rgba(27, 32, 43, 0.1)',
    hard: '0px 0px 16px rgba(44, 53, 71, 0.2)',
  },

  typography: {
    fontSize: 16,
    color: defaultThemeColors.black,
    bodyFontFamily: 'Avenir',
    headerFontFamily: 'Tiempos',
  },

  sizes: defaultThemeSizes,

  variants: defaultThemeVariants,
};
