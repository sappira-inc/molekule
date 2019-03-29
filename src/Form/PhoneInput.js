import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { AsYouType, isSupportedCountry, getCountryCallingCode, parseDigits } from 'libphonenumber-js/min';
import examplePhoneNumbers from 'libphonenumber-js/examples.mobile.json';
import Input from './Input';
import { createEasyInput } from './EasyInput';
import { getNextCursorPosition, isDeletingCharacter } from '../utils';

const formatPhoneNumber = ({ countryCode, countryCodeSupported, oldValue = '', newValue = '' }) => {
  const formatter = new AsYouType(countryCode);
  let value = parseDigits(newValue);

  if (countryCodeSupported) {
    const countryCallingCode = getCountryCallingCode(countryCode);
    const examplePhoneNumber = examplePhoneNumbers[countryCode];
    const beginsWithCountryCode = value.substr(0, countryCallingCode.length) === countryCallingCode;
    const maxLength = beginsWithCountryCode
      ? countryCallingCode.length + examplePhoneNumber.length
      : examplePhoneNumber.length;

    if (value.length > maxLength) {
      value = parseDigits(oldValue).substr(0, maxLength);
    }
  }

  return formatter.input(value);
};

function PhoneInput({ forwardedRef, value: propValue, onChange, countryCode, ...inputProps }) {
  const countryCodeSupported = isSupportedCountry(countryCode);
  const format = (oldValue, newValue) => formatPhoneNumber({ countryCode, countryCodeSupported, oldValue, newValue });
  const [currentValue, setValue] = useState(format(propValue, propValue));
  const inputRef = forwardedRef || useRef();
  const cursorPosition = useRef(currentValue.length);

  useEffect(() => {
    if (propValue !== currentValue) {
      setValue(format(currentValue, propValue));
    }
  }, [propValue]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.setSelectionRange(cursorPosition.current, cursorPosition.current);
    }
  }, [currentValue, cursorPosition.current]);

  const handleChange = (name, newValue, event) => {
    // @FIXME: Looking at newValue.length is jank for testing backspaces because we can't trigger a backspace event
    // programmatically
    const cursorPos = typeof event.target.selectionStart === 'number' ? event.target.selectionStart : newValue.length;
    const isDeletingNonDigit = isDeletingCharacter(/\D/, currentValue, newValue, cursorPos);
    const nextValue = isDeletingNonDigit ? newValue : format(currentValue, newValue);

    if (nextValue === currentValue) {
      // The DOM thinks we're adding a character but we actually don't after formatting,
      // so we need to subtract 1 from the next cursor position and reset to where we just were
      setTimeout(() => {
        const nextCursorPos = cursorPos - 1;
        inputRef.current.setSelectionRange(nextCursorPos, nextCursorPos);
        cursorPosition.current = nextCursorPos;
      });
    } else {
      cursorPosition.current = getNextCursorPosition(cursorPos, currentValue, nextValue);
    }

    setValue(nextValue);

    if (onChange) {
      onChange(name, nextValue);
    }
  };

  return <Input type="tel" forwardedRef={inputRef} value={currentValue} onChange={handleChange} {...inputProps} />;
}

PhoneInput.propTypes = {
  ...Input.propTypes,
  countryCode: PropTypes.string,
};

PhoneInput.defaultProps = {
  countryCode: 'US',
};

export default createEasyInput(PhoneInput);
