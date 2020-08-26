import React from 'react';
import styled, { css } from 'styled-components';
import { createComponent } from '../utils';

export interface FieldsetProps {
  legend?: string | JSX.Element;
  sublegend?: string | JSX.Element;
  children?: any;
}

const Legend = createComponent<FieldsetProps, 'legend'>({
  name: 'Legend',
  tag: 'legend',
  style: ({ theme, color = theme.colors.greyDarkest }: any) => css`
    font-weight: 700;
    margin-bottom: 8px;
    font-size: 18px;
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

export const Fieldset = ({ legend, children }: FieldsetProps) => (
  <Container>
    {legend && <Legend>{legend}</Legend>}

    {children}
  </Container>
);
