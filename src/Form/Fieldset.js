import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { createComponent } from '../utils';

const Legend = createComponent({
  name: 'Legend',
  tag: 'legend',
  style: ({ theme, color = theme.colors.greyDarkest }) => css`
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

const Fieldset = ({ legend, children }) => (
  <Container>
    {legend && <Legend>{legend}</Legend>}

    {children}
  </Container>
);

Fieldset.propTypes = {
  legend: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

export default Fieldset;
