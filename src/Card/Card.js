import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'styled-components';
import { space, borderRadius, themeGet } from 'styled-system';
import { createComponent } from '../utils';

const StyledCard = createComponent({
  name: 'Card',
  style: ({ shadow }) => css`
    background: white;
    box-shadow: ${shadow
      ? themeGet('shadow', '0 4px 10px rgba(0, 29, 54, 0.04), 0 -2px 6px rgba(0, 29, 54, 0.025);')
      : 'none'};

    ${borderRadius};
    ${space};
  `,
});

const Card = props => <StyledCard {...props} />;

Card.propTypes = {
  shadow: PropTypes.bool,
};

Card.defaultProps = {
  shadow: true,
};

Card.Header = createComponent({
  name: 'CardHeader',
  style: () => css`
    padding: 1rem;
    border-bottom: 1px solid ${themeGet('colors.grayLight')};

    ${space};
  `,
});

Card.Body = createComponent({
  name: 'CardBody',
  style: () => css`
    padding: 1rem;

    ${space};
  `,
});

Card.Footer = createComponent({
  name: 'CardFooter',
  style: () => css`
    padding: 1rem;
    border-top: 1px solid ${themeGet('colors.grayLight')};

    ${space};
  `,
});

export default Card;
