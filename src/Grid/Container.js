import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'styled-components';
import Box from '../Box';
import { createComponent } from '../utils';

const getPadding = p => (typeof p.gutter === 'number' ? p.gutter / 2 : p.theme.grid.gutter / 2);

const StyledContainer = createComponent({
  name: 'Container',
  as: Box,
  style: ({ maxWidth, fluid, theme }) => css`
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    max-width: ${fluid ? '100%' : `${maxWidth || theme.grid.containerMaxWidth}px`};
    padding-left: ${getPadding}px;
    padding-right: ${getPadding}px;
  `,
});

StyledContainer.displayName = 'Container';

const Container = ({ gutter, children, ...rest }) => (
  <StyledContainer gutter={gutter} {...rest}>
    {React.Children.map(children, child => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, { gutter });
      }
      return child;
    })}
  </StyledContainer>
);

Container.propTypes = {
  gutter: PropTypes.number,
};

export default Container;
