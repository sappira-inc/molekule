import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import DateFormatter from 'cleave.js/src/shortcuts/DateFormatter';
import Input from './Input';
import { createEasyInput } from './EasyInput';
import { getNextCursorPosition, isDeletingCharacter } from '../utils';

const formatDate = (pattern, delimiter, dateString = '') => {
  const formatter = new DateFormatter(pattern);

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

    // Append the delimiter if our block is complete and we're not at the last block
    const shouldAppendDelimiter = block.length === blockLength && index < blockArr.length - 1;

    return `${str}${block}${shouldAppendDelimiter ? delimiter : ''}`;
  }, '');
};

function DateInput({ forwardedRef, value: propValue, delimiter, pattern, onChange, ...inputProps }) {
  const format = value => formatDate(pattern, delimiter, value);
  const [currentValue, setValue] = useState(format(propValue));
  const ref = forwardedRef || useRef();
  const cursorPosition = useRef(currentValue.length);

  useEffect(() => {
    if (propValue !== currentValue) {
      setValue(format(propValue));
    }
  }, [propValue]);

  useEffect(() => {
    if (ref.current) {
      ref.current.setSelectionRange(cursorPosition.current, cursorPosition.current);
    }
  }, [currentValue]);

  const handleChange = (name, newValue, event) => {
    const cursorPos = event.target.selectionEnd || newValue.length;
    const isDeletingDelimiter = isDeletingCharacter(delimiter, currentValue, newValue, cursorPos);
    const nextValue = isDeletingDelimiter ? newValue : format(newValue);

    cursorPosition.current = getNextCursorPosition(cursorPos, currentValue, nextValue);

    setValue(nextValue);

    if (onChange) {
      onChange(name, nextValue);
    }
  };

  return <Input forwardedRef={ref} value={currentValue} onChange={handleChange} {...inputProps} />;
}

DateInput.propTypes = {
  ...Input.propTypes,
  pattern: PropTypes.arrayOf(PropTypes.string),
  delimiter: PropTypes.string,
};

DateInput.defaultProps = {
  pattern: ['m', 'd', 'Y'],
  delimiter: '/',
};

export default createEasyInput(DateInput);
