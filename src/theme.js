import { merge } from 'lodash';
import { lighten } from 'polished';

export default (overrides = {}) => {
  const colors = merge(
    {
      primary: '#5759D6',
      grayLightest: '#f1f5f9',
      grayLight: '#e4edf5',
      grayMid: '#8297a4',
      grayDark: '#576574',
      red: '#c0392b',
      blue: '#2980b9',
      green: '#27ae60',
      orange: '#e67e22',
    },
    overrides.colors
  );

  const radii = [0, 2, 4];

  const typography = {
    fontSize: 12,
  };

  const variants = {
    primary: {
      backgroundColor: lighten(0.325, colors.primary),
      fontColor: colors.primary,
    },
    success: {
      backgroundColor: lighten(0.45, colors.green),
      fontColor: colors.green,
    },
    danger: {
      backgroundColor: lighten(0.45, colors.red),
      fontColor: colors.red,
    },
    warning: {
      backgroundColor: lighten(0.45, colors.orange),
      fontColor: colors.orange,
    },
    info: {
      backgroundColor: lighten(0.45, colors.blue),
      fontColor: colors.blue,
    },
    inverted: {
      backgroundColor: colors.primary,
      fontColor: 'white',
    },
    gray: {
      backgroundColor: lighten(0.35, colors.grayMid),
      fontColor: colors.grayMid,
    },
  };

  const heights = {
    xs: 28,
    sm: 32,
    md: 36,
    lg: 40,
    xl: 44,
  };

  const fontSizes = {
    xs: 8,
    sm: 10,
    md: 12,
    lg: 14,
    xl: 16,
  };

  const breakpoints = [368, 768, 1024, 1440];

  const grid = {
    containerMaxWidth: 1000,
    gutter: 16,
    columns: 12,
    sizes: {
      xs: breakpoints[0],
      sm: breakpoints[1],
      md: breakpoints[2],
      lg: breakpoints[3],
    },
  };

  return {
    classPrefix: 're',
    colors,
    radius: 2,
    radii,
    typography,
    variants,
    heights,
    fontSizes,
    breakpoints,
    grid,
  };
};
