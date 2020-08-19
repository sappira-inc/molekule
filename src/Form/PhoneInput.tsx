import React, { useState, useEffect, useRef, FC } from 'react';
import { AsYouType, isSupportedCountry, getCountryCallingCode, parseDigits, CountryCode } from 'libphonenumber-js/min';
// @ts-ignore
import examplePhoneNumbers from 'libphonenumber-js/examples.mobile.json';
import { Input, InputProps } from './Input';
import { createEasyInput } from './EasyInput';
import { getNextCursorPosition } from '../utils';

export const getRawMaxLength = (countryCode: any, value: any) => {
  const countryCallingCode = getCountryCallingCode(countryCode);
  const beginsWithCountryCode = parseDigits(value).substr(0, countryCallingCode.length) === countryCallingCode;
  const examplePhoneNumber = examplePhoneNumbers[countryCode];
  return beginsWithCountryCode ? countryCallingCode.length + examplePhoneNumber.length : examplePhoneNumber.length;
};

export interface PhoneInputProps extends InputProps {
  countryCode?: CountryCode;
}

export const PhoneInput: FC<PhoneInputProps> = ({
  countryCode,
  forwardedRef,
  value: propValue,
  onKeyDown,
  onChange,
  ...inputProps
}) => {
  const countryCodeSupported = countryCode && isSupportedCountry(countryCode);
  if (!countryCodeSupported) {
    throw new Error(`${countryCode} is not supported`);
  }

  const format = (value: any) => {
    const phoneString = value || '';
    const parsed = parseDigits(phoneString).substr(0, getRawMaxLength(countryCode, phoneString));
    return new AsYouType(countryCode).input(parsed);
  };

  const [currentValue, setValue] = useState(format(propValue));
  const ref = useRef();
  const inputRef = forwardedRef || ref;

  useEffect(() => {
    if (propValue !== currentValue) {
      setValue(format(propValue));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propValue]);

  const handleKeyDown = (event: any) => {
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

  const handleChange = (name: any, newValue: any, event: any) => {
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
};

PhoneInput.defaultProps = {
  countryCode: 'US',
};

export default createEasyInput(PhoneInput);
