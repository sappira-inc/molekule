import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { AsYouType, isSupportedCountry, getCountryCallingCode, parseDigits } from 'libphonenumber-js/min';
import examplePhoneNumbers from 'libphonenumber-js/examples.mobile.json';
import Input from './Input';
import { createEasyInput } from './EasyInput';
import { getNextCursorPosition } from '../utils';

export const getRawMaxLength = (countryCode, value) => {
  const countryCallingCode = getCountryCallingCode(countryCode);
  const beginsWithCountryCode = parseDigits(value).substr(0, countryCallingCode.length) === countryCallingCode;
  const examplePhoneNumber = examplePhoneNumbers[countryCode];
  return beginsWithCountryCode ? countryCallingCode.length + examplePhoneNumber.length : examplePhoneNumber.length;
};

function PhoneInput({ countryCode, forwardedRef, value: propValue, onKeyDown, onChange, ...inputProps }) {
  const countryCodeSupported = isSupportedCountry(countryCode);
  if (!countryCodeSupported) {
    throw new Error(`${countryCode} is not supported`);
  }

  const format = (value = '') => {
    const parsed = parseDigits(value).substr(0, getRawMaxLength(countryCode, value));
    return new AsYouType(countryCode).input(parsed);
  };

  const [currentValue, setValue] = useState(format(propValue));
  const inputRef = forwardedRef || useRef();

  useEffect(() => {
    if (propValue !== currentValue) {
      setValue(format(propValue));
    }
  }, [propValue]);

  const handleKeyDown = event => {
    const isLetterLike = /^\w{1}$/.test(event.key);
    if (isLetterLike) {
      const cursorPos = event.target.selectionStart;
      const nextFormattedValue = format(
        currentValue.substring(0, cursorPos) + event.key + currentValue.substring(cursorPos)
      );
      const nextValueRawLength = parseDigits(currentValue).length + 1;
      if (nextValueRawLength > getRawMaxLength(countryCode, nextFormattedValue)) {
        event.preventDefault();
        event.stopPropagation();
      }
    }

    if (onKeyDown) {
      onKeyDown(event);
    }
  };

  const handleChange = (name, newValue, event) => {
    const nextValue = newValue.length < currentValue.length ? newValue.trim() : format(newValue);
    const nextCursorPosition = getNextCursorPosition(event.target.selectionStart, currentValue, nextValue);

    setValue(nextValue);
    setTimeout(() => {
      inputRef.current.setSelectionRange(nextCursorPosition, nextCursorPosition);
    });

    if (onChange) {
      onChange(name, nextValue, event);
    }
  };

  return (
    <Input
      type="tel"
      forwardedRef={inputRef}
      value={currentValue}
      onKeyDown={handleKeyDown}
      onChange={handleChange}
      {...inputProps}
    />
  );
}

PhoneInput.propTypes = {
  ...Input.propTypes,
  countryCode: PropTypes.string,
};

PhoneInput.defaultProps = {
  countryCode: 'US',
};

export default createEasyInput(PhoneInput);
