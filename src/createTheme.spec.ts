import { createTheme } from './createTheme';
import { defaultThemeColors } from './defaultThemeColors';
import { defaultBreakpoints } from './defaultBreakpoints';

describe('createTheme', () => {
  it('default', () => {
    const theme = createTheme();

    expect(theme.colors.blue).toEqual(defaultThemeColors.blue);
    expect(theme.breakpoints.lg).toEqual(defaultBreakpoints[3]);
  });

  it('overwrite', () => {
    const theme = createTheme({
      colors: {
        ...defaultThemeColors,
        primaryDark: 'foo',
      },
    });

    expect(theme.colors.primaryDark).toEqual('foo');
    expect(theme.variants.Badge.primary.color).toEqual('foo');
    expect(theme.breakpoints.lg).toEqual(defaultBreakpoints[3]);
  });
});
