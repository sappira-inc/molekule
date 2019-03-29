import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { AsYouType, isSupportedCountry, getCountryCallingCode, parseDigits } from 'libphonenumber-js/min';
import examplePhoneNumbers from 'libphonenumber-js/examples.mobile.json';
import Input from './Input';
import { createEasyInput } from './EasyInput';
import { getNextCursorPosition, isDeletingCharacter } from '../utils';

const formatPhoneNumber = (countryCode, value = '') => {
  const formatter = new AsYouType(countryCode);
  return formatter.input(parseDigits(value));
};

function PhoneInput({ forwardedRef, value: propValue, onChange, countryCode, ...inputProps }) {
  const format = (newValue, oldValue) => formatPhoneNumber(countryCode, newValue, oldValue);
  const [currentValue, setValue] = useState(format(propValue));
  const ref = forwardedRef || useRef();
  const cursorPosition = useRef(currentValue.length);
  const countryCodeSupported = isSupportedCountry(countryCode);

  useEffect(() => {
    if (propValue !== currentValue) {
      setValue(format(propValue, currentValue));
    }
  }, [propValue]);

  useEffect(() => {
    if (ref.current) {
      ref.current.setSelectionRange(cursorPosition.current, cursorPosition.current);
    }
  }, [currentValue, cursorPosition.current]);

  const handleChange = (name, newValue, event) => {
    let value = newValue;
    const cursorPos = event.target.selectionEnd || value.length;
    const isDeletingNonDigit = isDeletingCharacter(/\D/, value, currentValue, cursorPos);

    if (!isDeletingNonDigit && countryCodeSupported) {
      const countryCallingCode = getCountryCallingCode(countryCode);
      const examplePhoneNumber = examplePhoneNumbers[countryCode];
      const parsedNewValue = parseDigits(value);
      const beginsWithCountryCode = parsedNewValue.substr(0, countryCallingCode.length) === countryCallingCode;
      const maxLength = beginsWithCountryCode
        ? countryCallingCode.length + examplePhoneNumber.length
        : examplePhoneNumber.length;

      if (parsedNewValue.length > maxLength) {
        value = currentValue;
      }
    }

    const formattedValue = isDeletingNonDigit ? value : format(value, currentValue);

    cursorPosition.current = getNextCursorPosition(cursorPos, formattedValue, currentValue);

    setValue(formattedValue);

    if (onChange) {
      onChange(name, formattedValue);
    }
  };

  return <Input type="tel" forwardedRef={ref} value={currentValue} onChange={handleChange} {...inputProps} />;
}

PhoneInput.propTypes = {
  ...Input.propTypes,
  countryCode: PropTypes.string,
};

PhoneInput.defaultProps = {
  countryCode: 'US',
};

export default createEasyInput(PhoneInput);
