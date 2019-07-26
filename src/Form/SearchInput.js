import React, { useRef, useState } from 'react';
import { css } from 'styled-components';
import { createComponent } from '../utils';
import { createEasyInput } from './EasyInput';
import Input from './Input';
import Icon from '../Icon';

const SearchContainer = createComponent({
  name: 'SearchContainer',
  style: css`
    position: relative;
  `,
});

const CloseIcon = createComponent({
  name: 'CloseIcon',
  as: Icon,
  style: css`
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  `,
});

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

  const handleClear = () => {
    handleChange('search', '');
  };

  return (
    <SearchContainer>
      <Search forwardedRef={inputRef} icon="magnify" onChange={handleChange} value={currentValue} {...inputProps} />
      {propValue && <CloseIcon name="close-circle" color="greyDarker" size={18} onClick={handleClear} />}
    </SearchContainer>
  );
}

SearchInput.propTypes = {
  ...Input.propTypes,
};

export default createEasyInput(SearchInput);
