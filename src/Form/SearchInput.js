import React, { useRef, useState } from 'react';
import { css } from 'styled-components';
import { createComponent } from '../utils';
import { createEasyInput } from './EasyInput';
import Input from './Input';

const Search = createComponent({
  name: 'SearchInput',
  as: Input,
  style: ({ theme }) => css`
    font-size: ${theme.fontSizes.md}px;
    color: ${theme.colors.greyDarkest};
    background-color: ${theme.colors.greyLight};
    caret-color: ${theme.colors.greyDarkest};
    border-color: ${theme.colors.greyLightest};

    &:hover,
    &:active,
    &:focus {
      border-color: ${theme.colors.greyLight};
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

  const clearValue = () => {
    handleChange('search', '');
  };

  return (
    <Search
      forwardedRef={inputRef}
      leftIcon="magnify"
      rightIcon={currentValue && 'close-circle'}
      onRightIconClick={clearValue}
      onChange={handleChange}
      value={currentValue}
      {...inputProps}
    />
  );
}

export default createEasyInput(SearchInput);