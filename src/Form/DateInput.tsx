import React, { useState, useEffect, useRef } from 'react';
import DateFormatter from 'cleave.js/src/shortcuts/DateFormatter';
import { Input, InputProps } from './Input';
import { createEasyInput } from './EasyInput';
import { getNextCursorPosition } from '../utils';

export const getRawMaxLength = (pattern: any) => {
  const formatter = new DateFormatter(pattern, '1900-01-01', '2099-12-31');
  const blocks: any[] = formatter.getBlocks();
  return blocks.reduce((sum, block) => sum + block, 0);
};

const formatDate = (pattern: any, delimiter: any, dateString = '') => {
  const formatter = new DateFormatter(pattern, '1900-01-01', '2099-12-31');

  // Process our date string, bounding values between 1 and 31, and prepending 0s for
  // for single digit blocks that can't have 2 numbers, e.g. 5
  let tmpDate = formatter.getValidatedDate(`${dateString}`);

  // Blocks look something like [2, 2, 4], telling us how long each chunk should be
  return (formatter.getBlocks() as any[]).reduce((str, blockLength, index, blockArr) => {
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

export interface DateInputProps extends InputProps {
  initialValue?: string;
  pattern?: string[];
  delimiter?: string;
}

export const DateInput: React.FC<DateInputProps & { children?: never }> = ({
  delimiter,
  pattern,
  forwardedRef,
  initialValue,
  value: propValue,
  onKeyDown,
  onChange,
  ...inputProps
}) => {
  const format = (value: any) => formatDate(pattern, delimiter, value);
  const [currentValue, setValue] = useState(initialValue || format(propValue));
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const inputRef = forwardedRef || useRef();
  const previousValue = useRef(propValue);

  useEffect(() => {
    if (previousValue.current !== propValue && propValue !== currentValue) {
      setValue(format(propValue));
    }
    previousValue.current = propValue;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propValue]);

  const handleKeyDown = (event: any) => {
    const isLetterLike = /^\w{1}$/.test(event.key);
    if (isLetterLike && currentValue.replace(/\D/g, '').length >= getRawMaxLength(pattern)) {
      event.preventDefault();
      event.stopPropagation();
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
      forwardedRef={inputRef}
      value={currentValue}
      onKeyDown={handleKeyDown}
      onChange={handleChange}
      {...inputProps}
    />
  );
};

DateInput.defaultProps = {
  ...Input.defaultProps,
  pattern: ['m', 'd', 'Y'],
  delimiter: '/',
};

export default createEasyInput(DateInput);
