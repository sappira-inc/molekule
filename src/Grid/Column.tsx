import { css } from 'styled-components';
import Flex, { FlexProps } from '../Flex';
import { createComponent } from '../utils';

const getWidthPercent = (width: number, columns: number) => `${(width / columns) * 100}%`;

const getColumnWidth = (width: number, columns: number) => {
  if (width / columns !== 1) {
    return css`
      display: block;
      flex-basis: ${getWidthPercent(width, columns)};
      max-width: ${getWidthPercent(width, columns)};
    `;
  }

  return css`
    max-width: 100%;
    width: 100%;
    flex: auto;
  `;
};

const getPadding = ({ collapse, gutter, theme }: any) => {
  if (collapse) return 0;
  return typeof gutter === 'number' ? gutter / 2 : theme.gridGutter / 2;
};

const getOffset = (offset: number, columns: number) => css`
  margin-left: ${offset === 0 ? 0 : getWidthPercent(offset, columns)};
`;

export interface ColumnProps extends FlexProps {
  gutter?: number;
  collapse?: boolean;
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xsOffset?: number;
}

export const Column = createComponent<ColumnProps>({
  name: 'Column',
  as: Flex,
  style: ({ theme, order, ...props }) => {
    const mediaQueries = Object.keys(theme.breakpoints).map(breakpoint => {
      if (!props[breakpoint]) {
        return null;
      }

      if (breakpoint === 'xs') {
        return css`
          ${getColumnWidth(props[breakpoint] || 0, theme.gridColumns)};
          ${props[`${breakpoint}Offset`] && getOffset(props[`${breakpoint}Offset`], theme.gridColumns)};
        `;
      }

      return css`
        @media (min-width: ${theme.breakpoints[breakpoint]}) {
          ${getColumnWidth(props[breakpoint], theme.gridColumns)};
          ${props[`${breakpoint}Offset`] !== undefined && getOffset(props[`${breakpoint}Offset`], theme.gridColumns)};
        }
      `;
    });

    return css`
      box-sizing: border-box;
      flex: 1 0 auto;
      flex-direction: column;
      padding-left: ${getPadding}px;
      padding-right: ${getPadding}px;

      ${mediaQueries};
    `;
  },
});

Column.defaultProps = {
  collapse: false,
};
