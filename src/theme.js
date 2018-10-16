import { merge } from 'lodash';

export default (overrides = {}) => {
  const colors = merge(
    {
      primary: '#0747A5',
      grayLightest: '#f1f5f9',
      grayLight: '#cfd7df',
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
      backgroundColor: colors.primary,
      fontColor: 'white',
    },
    success: {
      backgroundColor: colors.green,
      fontColor: 'white',
    },
    danger: {
      backgroundColor: colors.red,
      fontColor: 'white',
    },
    warning: {
      backgroundColor: colors.orange,
      fontColor: 'white',
    },
    info: {
      backgroundColor: colors.blue,
      fontColor: 'white',
    },
    gray: {
      backgroundColor: colors.grayLight,
      fontColor: colors.grayDark,
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
    radius: 4,
    radii,
    typography,
    variants,
    heights,
    fontSizes,
    breakpoints,
    grid,
  };
};
