import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import Field from './Field';
import FormError from './FormError';
import Icon from '../Icon';
import Flex from '../Flex';
import Label from './Label';
import { createEasyInput } from './EasyInput';
import { createComponent } from '../utils';

const SelectContain = createComponent({
  name: 'Select',
  as: Flex,
  style: ({ size, theme, value, borderRadius = theme.radius }) => css`
    background: white;
    border: 1px solid ${theme.colors.grayLight};
    height: ${theme.heights[size]}px;
    outline: none;
    width: 100%;
    padding: 0.5rem;
    position: relative;
    border-radius: ${borderRadius}px;
    transition: 250ms all;
    -webkit-appearance: none;
    font-family: inherit;
    font-size: ${theme.fontSizes[size]}px;
    vertical-align: middle;

    ${value &&
      css`
        color: ${p => p.theme.colors.grayMid};
        select {
          color: ${p => p.theme.colors.grayMid};
        }
      `};

    select {
      position: relative;
      z-index: 2;
      outline: none;
      width: 100%;
      font-size: ${p => p.theme.fontSizes[p.size]}px;
      background: transparent;
      border: none;
      -webkit-appearance: none;
    }
  `,
});

const IconContain = styled(Flex)`
  position: absolute;
  height: 100%;
  right: 0;
  top: 0;
  z-index: 1;
`;

function Select({ id, name, options, placeholder, value, error, onChange, onBlur, size = 'md', label, ...props }) {
  return (
    <Field>
      {label && <Label size={size}>{label}</Label>}
      <SelectContain value={value} size={size}>
        <select
          name={name}
          value={value}
          onChange={e => {
            if (typeof onChange === 'function') onChange(name, e.target.value);
          }}
          onBlur={e => {
            if (typeof onBlur === 'function') onBlur(name, e.target.value);
          }}>
          <option value="">{placeholder || 'Select an option...'}</option>
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <IconContain mr={2} alignItems="center" justifyContent="center">
          <Icon name="chevron-down" size={18} />
        </IconContain>
      </SelectContain>
      {error && <FormError>{error}</FormError>}
    </Field>
  );
}

Select.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  size: PropTypes.string,
  label: PropTypes.string,
};

export default createEasyInput(Select);
