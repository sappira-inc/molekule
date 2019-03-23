import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import DateFormatter from 'cleave.js/src/shortcuts/DateFormatter';
import Input from './Input';
import { createEasyInput } from './EasyInput';
import { getNextCursorPosition, isDeletingCharacter } from '../utils';

const formatDate = (datePattern, dateString = '') => {
  const formatter = new DateFormatter(datePattern);

  // Process our date string, bounding values between 1 and 31, and prepending 0s for
  // for single digit blocks that can't have 2 numbers, e.g. 5
  let tmpDate = formatter.getValidatedDate(`${dateString}`);

  // Blocks look something like [2, 2, 4], telling us how long each chunk should be
  return formatter.getBlocks().reduce((str, blockLength, index, blockArr) => {
    const block = tmpDate.substring(0, blockLength);
    if (!block) {
      return str;
    }
    tmpDate = tmpDate.substring(blockLength);
    const shouldAppendSlash = block.length === blockLength && index < blockArr.length - 1;
    return `${str}${block}${shouldAppendSlash ? '/' : ''}`;
  }, '');
};

function DateInput({ forwardedRef, value: propValue, onChange, datePattern, ...inputProps }) {
  const [currentValue, setValue] = useState(formatDate(datePattern, propValue));
  const ref = forwardedRef || useRef();
  const cursorPosition = useRef(currentValue.length);

  useEffect(() => {
    if (propValue !== currentValue) {
      setValue(formatDate(datePattern, propValue));
    }
  }, [propValue]);

  useEffect(() => {
    if (ref.current) {
      ref.current.setSelectionRange(cursorPosition.current, cursorPosition.current);
    }
  }, [currentValue]);

  const handleChange = (name, newValue, event) => {
    const isDeletingSlash = isDeletingCharacter(
      '/',
      newValue,
      currentValue,
      event.target.selectionEnd || newValue.length
    );
    const formattedValue = isDeletingSlash ? newValue : formatDate(datePattern, newValue);

    cursorPosition.current = getNextCursorPosition(event.target.selectionEnd, formattedValue, currentValue);

    setValue(formattedValue);

    if (onChange) {
      onChange(name, formattedValue);
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
