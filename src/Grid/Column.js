import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'styled-components';
import Flex from '../Flex';
import { createComponent } from '../utils';

const getWidthPercent = (width, columns) => `${(width / columns) * 100}%`;

const getColumnWidth = (width, columns) => {
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

const getPadding = ({ collapse, gutter, theme }) => {
  if (collapse) return 0;
  return typeof gutter === 'number' ? gutter / 2 : theme.gridGutter / 2;
};

const getOffset = (offset, columns) => css`
  margin-left: ${offset === 0 ? 0 : getWidthPercent(offset, columns)};
`;

const StyledColumn = createComponent({
  name: 'Column',
  as: Flex,
  style: ({ theme, order, ...props }) => {
    const breakpoints = Object.keys(theme.breakpoints);
    const mediaQueries = breakpoints.map(breakpoint => {
      if (!props[breakpoint]) {
        return null;
      }

      if (breakpoint === 'xs') {
        return css`
          ${getColumnWidth(props[breakpoint], theme.gridColumns)};
          ${props[`${breakpoint}Offset`] && getOffset(props[`${breakpoint}Offset`], theme.gridColumns)};
        `;
      }

      return css`
        @media (min-width: ${breakpoints[breakpoint]}px) {
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
      order: ${order != null ? order : 'initial'};

      ${mediaQueries};
    `;
  },
});

const Column = props => <StyledColumn {...props} />;

Column.propTypes = {
  /**
   * Margin between columns
   */
  gutter: PropTypes.number,

  /**
   * Collapse columns by removing gutters
   */
  collapse: PropTypes.bool,
};

Column.defaultProps = {
  collapse: false,
};

export default Column;
