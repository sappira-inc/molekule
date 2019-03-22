import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AsYouType } from 'libphonenumber-js';
import Input from './Input';
import { createEasyInput } from './EasyInput';

function PhoneInput({ value: passedValue, onChange, countryCode, ...inputProps }) {
  const formatter = new AsYouType(countryCode);
  const formatPhoneNumber = val => {
    const output = formatter.input(val);
    formatter.reset();
    return output;
  };
  const [value, setValue] = useState(formatPhoneNumber(passedValue));

  const handleInputChange = (name, val) => {
    const output = value && value.substr(-1) === ')' && val.length < value.length ? val : formatPhoneNumber(val);
    setValue(output);
    onChange(name, val);
  };

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
