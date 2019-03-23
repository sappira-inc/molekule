import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { AsYouType } from 'libphonenumber-js';
import Input from './Input';
import { createEasyInput } from './EasyInput';
import { getNextCursorPosition, isDeletingCharacter } from '../utils';

const formatPhoneNumber = (countryCode, value = '') => {
  const formatter = new AsYouType(countryCode);
  return formatter.input(value.replace(/\D/g, ''));
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
    const isDeletingParen = isDeletingCharacter(
      ')',
      newValue,
      currentValue,
      event.target.selectionEnd || currentValue.length
    );
    const formattedValue = isDeletingParen ? newValue : format(newValue, currentValue);

    cursorPosition.current = getNextCursorPosition(event.target.selectionEnd, formattedValue, currentValue);

    setValue(formattedValue);

    if (onChange) {
      onChange(name, formattedValue);
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
