import { ThemeColors, ThemeBreakpoints, ThemeTypography, ThemeSizes, ThemeVariants } from 'types';

export interface Theme {
  classPrefix: string;
  space: number[];
  gridWidth: number;
  gridGutter: number;
  gridColumns: number;
  radii: number[];
  radius: number;
  shadow: {
    soft: string;
    hard: string;
  };
  colors: ThemeColors;
  breakpoints: string[] & ThemeBreakpoints;
  typography: ThemeTypography;
  sizes: ThemeSizes;
  variants: ThemeVariants;
}
