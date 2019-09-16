/* eslint-disable no-nested-ternary */
import React, { useContext } from 'react';
import { css } from 'styled-components';
import { get } from 'lodash';
import { createComponent } from '../utils';
import { Context as FormbotContext } from './Formbot';

const FormErrorContainer = createComponent({
  name: 'FormError',
  tag: 'span',
  style: css`
    display: block;
    margin: 8px 0 0 1px;
    color: ${p => p.theme.colors.red};
    font-size: 12px;
    font-weight: 500;
  `,
});

const FormError = ({ name, children }) => {
  const context = useContext(FormbotContext);
  const hasNameOnly = !!name && typeof children !== 'function';
  const hasRenderProp = !!name && typeof children === 'function';
  const error = get(context, ['errors', name]);

  if (hasNameOnly && error) return <FormErrorContainer>{error}</FormErrorContainer>;

  return hasRenderProp ? (
    error ? (
      <FormErrorContainer>{children(error, context)}</FormErrorContainer>
    ) : null
  ) : (
    <FormErrorContainer>{children}</FormErrorContainer>
  );
};

export default FormError;
