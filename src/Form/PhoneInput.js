import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { AsYouType } from 'libphonenumber-js';
import Input from './Input';
import { createEasyInput } from './EasyInput';

function PhoneInput({ value: passedValue, onChange, countryCode, ...inputProps }) {
  const formatter = new AsYouType(countryCode);

  const formatPhoneNumber = (newVal, prevVal = '') => {
    const isDeletingParen = prevVal && prevVal.substr(-1) === ')' && newVal.length < prevVal.length;
    const output = isDeletingParen ? newVal : formatter.input(newVal);
    formatter.reset();
    return output;
  };

  const [value, setValue] = useState(formatPhoneNumber(passedValue));

  const handleInputChange = (name, newVal) => {
    // Formatter adds a paren to "(408" so we skip formatting if current value has the paren
    const formatted = formatPhoneNumber(newVal, value);
    setValue(formatted);
    onChange(name, newVal);
  };

  useEffect(() => {
    if (passedValue !== value) {
      setValue(formatPhoneNumber(passedValue, value));
    }
  }, [passedValue]);

  return <Input value={value} onChange={handleInputChange} {...inputProps} />;
}

PhoneInput.propTypes = {
  ...Input.propTypes,
  countryCode: PropTypes.string,
};

PhoneInput.defaultProps = {
  countryCode: 'US',
};

export default createEasyInput(PhoneInput);
