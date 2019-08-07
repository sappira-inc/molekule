import { getComponentStyle, getVariantStyles, getComponentVariant, themeGet, getOneSizeSmaller, getOneSizeLarger } from './utils';

const MOCK_THEME = {
  variants: {
    Element: {
      primary: {
        style: `
          background-color: blue;
        `,
      },
    },
  },
  styles: {
    Element: `
      background-color: tomato;
    `,
  },
  fontSizes: {
    sm: 8,
    md: 12,
    lg: 14,
  },
};

describe('#utils', () => {
  describe('#themeGet', () => {
    it('should return theme config', () => {
      expect(themeGet('variants.Element')({ theme: MOCK_THEME })).toMatchSnapshot();
    });

    it('should fallback when theme config not found', () => {
      expect(
        themeGet('variants.foobar', { primary: { style: `background-color: green` } })({ theme: MOCK_THEME })
      ).toMatchSnapshot();
    });
  });

  describe('#getComponentVariant', () => {
    it('should return primary variant from theme', () => {
      expect(getComponentVariant(MOCK_THEME, 'Element', 'primary')).toMatchSnapshot();
    });

    it('should throw error if variant not found', () => {
      try {
        getComponentVariant(MOCK_THEME, 'Element', 'foobar');
      } catch (error) {
        expect(error).toMatchSnapshot();
      }
    });
  });

  describe('#getComponentStyle', () => {
    it('should return top-level component style from theme', () => {
      expect(getComponentStyle('Element')({ theme: MOCK_THEME })).toMatchSnapshot();
    });
  });

  describe('#getVariantStyles', () => {
    it('should return variant style for component from theme', () => {
      expect(getVariantStyles('Element', 'primary')({ theme: MOCK_THEME })).toMatchSnapshot();
    });
  });

  describe('#getOneSizeSmaller', () => {
    it('should return size just one step smaller than requested for component', () => {
      expect(getOneSizeSmaller(MOCK_THEME.fontSizes, 'md')).toBe(MOCK_THEME.fontSizes.sm);
    });

    it('should return size requested if no smaller size', () => {
      expect(getOneSizeSmaller(MOCK_THEME.fontSizes, 'sm')).toBe(MOCK_THEME.fontSizes.sm);
    });
  });

  describe('#getOneSizeLarger', () => {
    it('should return size just one step larger than requested for component', () => {
      expect(getOneSizeLarger(MOCK_THEME.fontSizes, 'md')).toBe(MOCK_THEME.fontSizes.lg);
    });

    it('should return size requested if no larger size', () => {
      expect(getOneSizeLarger(MOCK_THEME.fontSizes, 'lg')).toBe(MOCK_THEME.fontSizes.lg);
    });
  });
});
