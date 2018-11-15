import { merge } from 'lodash';

export default (overrides = {}) => {
  const shadow = '0 3px 6px hsla(0,0%,60%,.1), 0 3px 6px hsla(0,0%,60%,.15), 0 -1px 2px hsla(0,0%,60%,.02)';
  const shadowHover = '0 6px 9px hsla(0,0%,60%,.2), 0 6px 9px hsla(0,0%,60%,.2), 0 -1px 2px hsla(0,0%,60%,.08)';

  const colors = merge(
    {
      primary: '#2DAAF2',
      grayLightest: '#F1F4F6',
      grayLight: '#DEE0E4',
      grayMid: '#8E97A7',
      grayDark: '#43526D',
      red: '#F06071',
      blue: '#0747A5',
      green: '#09BB84',
      orange: '#FFA057',
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

  const breakpoints = [480, 768, 1024, 1440];

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
    breakpoints,
    classPrefix: 're',
    colors,
    fontSizes,
    grid,
    heights,
    radii,
    radius: 4,
    shadow,
    shadowHover,
    typography,
    variants,
  };
};
