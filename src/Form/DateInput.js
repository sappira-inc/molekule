import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import DateFormatter from 'cleave.js/src/shortcuts/DateFormatter';
import Input from './Input';
import { createEasyInput } from './EasyInput';
import { getNextCursorPosition } from '../utils';

export const getRawMaxLength = pattern => {
  const formatter = new DateFormatter(pattern);
  const blocks = formatter.getBlocks();
  return blocks.reduce((sum, block) => sum + block, 0);
};

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

function DateInput({ delimiter, pattern, forwardedRef, value: propValue, onKeyDown, onChange, ...inputProps }) {
  const format = value => formatDate(pattern, delimiter, value);
  const [currentValue, setValue] = useState(format(propValue));
  const inputRef = forwardedRef || useRef();
  const lastKeyPressed = useRef();

  useEffect(() => {
    if (propValue !== currentValue) {
      setValue(format(propValue));
    }
  }, [propValue]);

  const handleKeyDown = event => {
    lastKeyPressed.current = event.key;

    const isLetterLike = /^\w{1}$/.test(event.key);
    if (isLetterLike && currentValue.replace(/\D/g, '').length >= getRawMaxLength(pattern)) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (onKeyDown) {
      onKeyDown(event);
    }
  };

  const handleChange = (name, newValue, event) => {
    const nextValue = lastKeyPressed.current === 'Backspace' ? newValue.trim() : format(newValue);
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
      forwardedRef={inputRef}
      value={currentValue}
      onKeyDown={handleKeyDown}
      onChange={handleChange}
      {...inputProps}
    />
  );
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
