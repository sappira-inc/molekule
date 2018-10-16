import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'styled-components';
import Flex from '../Flex';
import { createComponent } from '../utils';

const getMargin = p => {
  if (p.collapse) return 0;
  return typeof p.gutter === 'number' ? p.gutter / 2 : p.theme.grid.gutter / 2;
};

const StyledRow = createComponent({
  name: 'Row',
  as: Flex,
  style: ({ vertical }) => {
    const direction = vertical ? 'column' : 'row';

    return css`
      flex: 0 1 auto;
      flex-direction: ${p.reverse ? `${direction}-reverse` : direction};
      flex-wrap: wrap;
      margin-right: -${getMargin}px;
      margin-left: -${getMargin}px;
    `;
  },
});

const Row = ({ children, gutter, reverse, collapse, vertical, ...props }) => (
  <StyledRow {...props} gutter={gutter} reverse={reverse} collapse={collapse} vertical={vertical}>
    {React.Children.map(children, child => React.cloneElement(child, { gutter, collapse, vertical }))}
  </StyledRow>
);

Row.displayName = 'Row';

Row.propTypes = {
  /**
   * Lay row out vertically
   */
  vertical: PropTypes.bool,

  /**
   * Margin between columns
   */
  gutter: PropTypes.number,

  /**
   *  Reverse the order of the columns
   */
  reverse: PropTypes.bool,

  /**
   * Collapse columns by removing gutters
   */
  collapse: PropTypes.bool,
};

Row.defaultProps = {
  vertical: false,
  reverse: false,
  collapse: false,
};

export default Row;
