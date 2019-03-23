import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import DateFormatter from 'cleave.js/src/shortcuts/DateFormatter';
import Input from './Input';
import { createEasyInput } from './EasyInput';
import { getNextCursorPosition } from '../utils';

const formatDateString = (datePattern, dateString) => {
  const formatter = new DateFormatter(datePattern);

  let tmpDate = formatter.getValidatedDate(`${dateString}`);
  return formatter.getBlocks().reduce((str, blockLength, index) => {
    const block = tmpDate.substring(0, blockLength);
    if (!block) {
      return str;
    }
    tmpDate = tmpDate.substring(blockLength);
    return `${str}${index !== 0 ? '/' : ''}${block}`;
  }, '');
};

function DateInput({ forwardedRef, value: propValue, onChange, datePattern, ...inputProps }) {
  const [currentValue, setValue] = useState(propValue || '');
  const ref = forwardedRef || useRef();
  const cursorPosition = useRef(currentValue.length);

  useEffect(() => {
    if (propValue !== currentValue) {
      setValue(formatDateString(datePattern, propValue));
    }
  }, [propValue]);

  useEffect(() => {
    if (ref.current) {
      ref.current.setSelectionRange(cursorPosition.current, cursorPosition.current);
    }
  }, [currentValue]);

  const handleChange = (name, val, event) => {
    const formattedValue = formatDateString(datePattern, val);

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

DateInput.propTypes = {
  ...Input.propTypes,
  datePattern: PropTypes.arrayOf(PropTypes.string),
};

DateInput.defaultProps = {
  datePattern: ['m', 'd', 'Y'],
};

export default createEasyInput(DateInput);
