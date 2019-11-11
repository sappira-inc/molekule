/* eslint-disable no-nested-ternary */
import React, { useContext } from 'react';
import { css } from 'styled-components';
import get from 'lodash/get';
import { createComponent } from '../utils';
import { Context as FormbotContext } from './Formbot';

export const StyledFormError = createComponent({
  name: 'FormError',
  tag: 'span',
  style: css`
    display: block;
    margin: 4px 0 0 1px;
    color: ${p => p.theme.colors.red};
    font-size: 14px;
    font-weight: 500;
  `,
});

const FormError = ({ name, children }) => {
  const context = useContext(FormbotContext);
  const hasNameOnly = !!name && typeof children !== 'function';
  const hasRenderProp = !!name && typeof children === 'function';
  const error = get(context, ['errors', name]);

  if (hasNameOnly && error) return <StyledFormError>{error}</StyledFormError>;

  return hasRenderProp ? (
    error ? (
      <StyledFormError>{children(error, context)}</StyledFormError>
    ) : null
  ) : (
    <StyledFormError>{children}</StyledFormError>
  );
};

export default FormError;
