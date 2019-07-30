import React, { useRef, useState } from 'react';
import { css } from 'styled-components';
import { createComponent } from '../utils';
import { createEasyInput } from './EasyInput';
import Input from './Input';

const Search = createComponent({
  name: 'SearchInput',
  as: Input,
  style: ({ theme, size }) => css`
    color: ${theme.colors.greyDarkest};
    background-color: ${theme.colors.greyLighter};
    caret-color: ${theme.colors.black};
    border-color: ${theme.colors.greyLighter};
    font-size: ${theme.fontSizes[size]}px;
    padding-left: 28px;

    &:hover,
    &:active,
    &:focus {
      border-color: ${theme.colors.greyLighter};
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

SearchInput.propTypes = {
  ...Input.propTypes,
};

export default createEasyInput(SearchInput);
