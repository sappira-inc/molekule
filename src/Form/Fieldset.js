import React from 'react';
import Box from '../Box';
import styled, { css } from 'styled-components';
import { createComponent } from '../utils';

const Legend = createComponent({
  name: 'Legend',
  tag: 'legend',
  style: ({
    theme,
    color = theme.colors.primary,
  }) => css`
    font-weight: 700;
    margin-bottom: 1rem;
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.25px;
    color: ${color};
  `,
});

const Container = styled.fieldset`
  border: 0;
  padding: 0;
  margin: 0;

  * + & {
    margin-top: 1.5rem;
  }
`;

const Fieldset = ({ legend, children }) => (
  <Container>
    {legend && <Legend>{legend}</Legend>}

    {children}
  </Container>
);

export default Fieldset;

