import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'styled-components';
import Box from '../Box';
import { themeGet, createComponent } from '../utils';

const StyledCard = createComponent({
  name: 'Card',
  as: Box,
  style: ({ shadow }) => css`
    background: white;
    box-shadow: ${shadow ? themeGet('shadow', 'none') : 'none'};
    border-radius: ${themeGet('radius', 0)}px;
    overflow: hidden;
  `,
});

const Card = React.forwardRef((props, ref) => <StyledCard ref={ref} {...props} />);

Card.propTypes = {
  shadow: PropTypes.bool,
};

Card.defaultProps = {
  shadow: true,
};

Card.Header = createComponent({
  name: 'CardHeader',
  as: Box,
  style: ({ theme }) => css`
    padding: 1rem;
    border-bottom: 1px solid ${theme.colors.greyLight};
  `,
});

Card.Body = createComponent({
  name: 'CardBody',
  as: Box,
  style: () => css`
    padding: 1rem;
  `,
});

Card.Footer = createComponent({
  name: 'CardFooter',
  as: Box,
  style: ({ theme }) => css`
    padding: 1rem;
    border-top: 1px solid ${theme.colors.greyLight};
  `,
});

export default Card;
