import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { AsYouType } from 'libphonenumber-js';
import Input from './Input';
import { createEasyInput } from './EasyInput';
import { getNextCursorPosition } from '../utils';

const formatPhoneNumber = (countryCode, newValue, oldValue = '') => {
  const formatter = new AsYouType(countryCode);
  // Don't format if we're deleting the trailing paren; formatter adds a paren to "(408"
  const isDeletingParen = oldValue && oldValue.substr(-1) === ')' && newValue.length < oldValue.length;
  return isDeletingParen ? newValue : formatter.input(newValue.replace(/\D/g, ''));
};

function PhoneInput({ forwardedRef, value: propValue, onChange, countryCode, ...inputProps }) {
  const format = (newValue, oldValue) => formatPhoneNumber(countryCode, newValue, oldValue);
  const [currentValue, setValue] = useState(format(propValue));
  const ref = forwardedRef || useRef();
  const cursorPosition = useRef(currentValue.length);

  useEffect(() => {
    if (propValue !== currentValue) {
      setValue(formatPhoneNumber(countryCode, propValue, currentValue));
    }
  }, [propValue]);

  useEffect(() => {
    if (ref.current) {
      ref.current.setSelectionRange(cursorPosition.current, cursorPosition.current);
    }
  }, [currentValue]);

  const handleChange = (name, newValue, event) => {
    const formattedValue = format(newValue, currentValue);

    if (formattedValue !== currentValue) {
      cursorPosition.current = getNextCursorPosition(event.target.selectionEnd, formattedValue, currentValue);

      setValue(formattedValue);

      if (onChange) {
        onChange(name, formattedValue);
      }
    }
  };

  return <Input forwardedRef={ref} value={currentValue} onChange={handleChange} {...inputProps} />;
}

PhoneInput.propTypes = {
  ...Input.propTypes,
  countryCode: PropTypes.string,
};

PhoneInput.defaultProps = {
  countryCode: 'US',
};

export default createEasyInput(PhoneInput);
