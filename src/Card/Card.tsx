import React from 'react';
import { css } from 'styled-components';
import Box, { BoxProps } from '../Box';
import { themeGet, createComponent } from '../utils';

export interface CardProps {
  shadow?: boolean;
  children?: React.ReactNode;
}

const StyledCard = createComponent<CardProps & BoxProps>({
  name: 'Card',
  as: Box,
  style: ({ shadow, theme }) => css`
    background: white;
    box-shadow: ${shadow ? themeGet('shadow.soft', 'none') : 'none'};
    border-radius: ${themeGet('radius', 0)}px;
    overflow: hidden;
    border: 1px solid ${theme.colors.greyLight};
  `,
});

export interface CardStaticMembers {
  Footer: React.ComponentType<BoxProps>;
  Body: React.ComponentType<BoxProps>;
  Header: React.ComponentType<BoxProps>;
}

/** Cards provide a flexible way to encapsulate content with multiple variants and options. */
const Card = React.forwardRef<HTMLDivElement, CardProps & BoxProps>((props, ref) => (
  <StyledCard ref={ref} {...props} />
)) as React.ForwardRefExoticComponent<CardProps & BoxProps & React.RefAttributes<HTMLDivElement>> & CardStaticMembers;

Card.defaultProps = {
  shadow: false,
};

Card.Footer = createComponent<BoxProps>({
  name: 'CardFooter',
  as: Box,
  style: css`
    padding: 16px;
  `,
});

const cardFooterClass = Card.Footer.toString();

Card.Body = createComponent<BoxProps>({
  name: 'CardBody',
  as: Box,
  style: () => css`
    padding: 16px;

    & + ${cardFooterClass} {
      padding-top: 0px;
    }
  `,
});

const cardBodyClass = Card.Body.toString();

Card.Header = createComponent<BoxProps>({
  name: 'CardHeader',
  as: Box,
  style: css`
    padding: 16px;
    font-weight: 700;

    & + ${cardBodyClass} {
      padding-top: 0px;
    }
  `,
});

export default Card;
