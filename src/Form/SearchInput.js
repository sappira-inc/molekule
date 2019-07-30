import React, { useRef, useState } from 'react';
import { css } from 'styled-components';
import { createComponent } from '../utils';
import { createEasyInput } from './EasyInput';
import Input from './Input';

const Search = createComponent({
  name: 'SearchInput',
  as: Input,
  style: ({ theme, size }) => css`
    color: ${theme.colors.grayDark};
    background-color: ${theme.colors.grayLight};
    height: ${theme.heights[size]}px;
    caret-color: ${theme.colors.greyDark};
    border-color: ${theme.colors.grayLightest};
    font-size: ${theme.fontSizes[size]}px;
    padding-left: 28px;
    padding-right: 28px;

    &:hover,
    &:active,
    &:focus {
      border-color: ${theme.colors.grayLight};
    }
  `,
});

function SearchInput({ forwardedRef, value: propValue, onChange, ...inputProps }) {
  const [currentValue, setValue] = useState(propValue);
  const inputRef = forwardedRef || useRef();

  const handleChange = (name, newValue, event) => {
    setValue(newValue);

    if (onChange) {
      onChange(name, newValue, event);
    }
  };

  return (
    <Search
      forwardedRef={inputRef}
      icon="magnify"
      onChange={handleChange}
      value={currentValue}
      isClearable
      {...inputProps}
    />
  );
}

export default createEasyInput(SearchInput);
