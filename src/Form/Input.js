import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { css } from 'styled-components';
import Field from './Field';
import StyledLabel from './Label';
import FormError from './FormError';
import Icon from '../Icon';
import { createEasyInput } from './EasyInput';
import { createComponent } from '../utils';

const InputContainer = createComponent({
  name: 'InputContainer',
  style: css`
    position: relative;
  `,
});

const StyledInput = createComponent({
  name: 'Input',
  tag: 'input',
  style: ({
    isFloating,
    size,
    theme,
    borderRadius = theme.radius,
    hasLeftIcon,
    leftIconSize,
    hasRightIcon,
    rightIconSize,
  }) => css`
    border: 1px solid ${theme.colors.greyLight};
    height: ${theme.heights[size]}px;
    display: block;
    outline: none;
    width: 100%;
    padding: 8px;
    border-radius: ${borderRadius}px;
    transition: 250ms all;
    -webkit-appearance: none;
    font-family: inherit;
    font-size: ${theme.fontSizes[size]}px;

    &:hover,
    &:focus,
    &:active {
      border-color: ${theme.colors.grey};
    }

    ::placeholder {
      color: ${theme.colors.grey};
    }

    &[disabled] {
      opacity: 0.65;
    }

    ${isFloating &&
      css`
        padding-bottom: 0px;
      `};

    ${hasLeftIcon &&
      css`
        padding-left: ${leftIconSize + 12}px;
      `};

    ${hasRightIcon &&
      css`
        padding-right: ${rightIconSize + 32}px;
      `};
  `,
});

const StyledTextArea = StyledInput.withComponent('textarea');

const AutogrowShadow = createComponent({
  name: 'AutogrowShadow',
  tag: 'textarea',
  style: css`
    position: absolute;
    left: -9999px;
  `,
  props: () => ({
    tabIndex: -1,
  }),
});

const LeftIcon = createComponent({
  name: 'LeftIcon',
  as: Icon,
  style: css`
    position: absolute;
    left: 8px;
    top: 50%;
    transform: translateY(-50%);
  `,
});

const RightIcon = createComponent({
  name: 'LeftIcon',
  as: Icon,
  style: css`
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  `,
});

const validateValueProp = (props, propName, componentName) => {
  if (props.type === 'number' && typeof props[propName] !== 'number') {
    return new Error(`Invalid prop ${propName} supplied to ${componentName} with type="number", expected Number`);
  }
  if (typeof props[propName] !== 'string' && props.type !== 'number') {
    return new Error(`Invalid prop ${propName} supplied to ${componentName}, expected String`);
  }
  return null;
};

class Input extends Component {
  static propTypes = {
    value: validateValueProp,
    type: PropTypes.string,
    disabled: PropTypes.bool,
    placeholder: PropTypes.string,
    multiline: PropTypes.bool,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    minRows: PropTypes.number,
    rows: PropTypes.number,
    maxRows: PropTypes.number,
    rowHeight: PropTypes.number,
    lineHeight: PropTypes.number,
    autogrow: PropTypes.bool,
    size: PropTypes.string,
    floating: PropTypes.bool,
    forwardedRef: PropTypes.oneOfType([PropTypes.shape(), PropTypes.func]),
    leftIcon: PropTypes.string,
    leftIconSize: PropTypes.number,
    leftIconColor: PropTypes.string,
    onLeftIconClick: PropTypes.func,
    rightIcon: PropTypes.string,
    rightIconSize: PropTypes.number,
    rightIconColor: PropTypes.string,
    onRightIconClick: PropTypes.func,
  };

  static defaultProps = {
    type: 'text',
    multiline: false,
    minRows: 2,
    rows: 3,
    maxRows: 6,
    rowHeight: 14,
    lineHeight: 1.5,
    autogrow: false,
    disabled: false,
    size: 'md',
    onFocus() {},
    onBlur() {},
    onChange() {},
    floating: false,
    leftIconSize: 18,
    leftIconColor: 'greyDarkest',
    onLeftIconClick() {},
    rightIconSize: 18,
    rightIconColor: 'greyDarkest',
    onRightIconClick() {},
  };

  static getDerivedStateFromProps(props, state) {
    if (props.value !== undefined && props.value !== state.value) {
      return {
        value: props.value,
      };
    }
    return null;
  }

  state = {
    focused: false,
  };

  inputRef = React.createRef();

  get ref() {
    return this.props.forwardedRef || this.inputRef;
  }

  componentDidMount() {
    if (this.props.autofocus && this.ref.current) {
      this.ref.current.focus();
    }

    if (this.props.multiline) {
      /* eslint-disable-next-line react/no-did-mount-set-state */
      this.setState({
        height: this.props.rows * this.props.rowHeight * this.props.lineHeight,
      });
    }
  }

  componentDidUpdate(oldProps, oldState) {
    if (oldState.value !== this.state.value) {
      this.autogrow();
    }
  }

  componentWillUnmount() {
    if (this.autogrowShadowNode && this.autogrowShadowNode.parentNode) {
      this.autogrowShadowNode.parentNode.removeChild(this.autogrowShadowNode);
    }
  }

  onFocus = e => {
    this.setState({ focused: true });
    this.props.onFocus(e.target.name);
  };

  onBlur = e => {
    this.setState({ focused: false });

    const { onBlur, onChange, transformOnBlur } = this.props;

    onBlur(e.target.name);

    const currentValue = this.props.value;
    if (transformOnBlur && currentValue) {
      const transformedValue = transformOnBlur(currentValue);
      if (transformedValue !== currentValue) {
        onChange(e.target.name, transformedValue);
      }
    }
  };

  onChange = e => {
    this.setState({ value: e.target.value });
    this.props.onChange(e.target.name, e.target.value, e);
  };

  handleAutogrowRef = node => {
    this.autogrowShadowNode = node;
    this.autogrow();
  };

  autogrow() {
    if (!this.props.autogrow || !this.autogrowShadowNode) {
      return;
    }

    const { minRows, maxRows, rowHeight, lineHeight } = this.props;

    const minHeight = minRows * rowHeight * lineHeight;
    const maxHeight = maxRows * rowHeight * lineHeight;

    this.autogrowShadowNode.style.width = `${this.ref.current.clientWidth}px`;
    this.autogrowShadowNode.value = this.state.value;

    let height = this.autogrowShadowNode.scrollHeight + rowHeight * lineHeight;

    if (height < minHeight) {
      height = minHeight;
    } else if (height > maxHeight) {
      height = maxHeight;
    }

    this.setState({ height });
  }

  focus() {
    this.ref.current.focus();
  }

  blur() {
    this.ref.current.blur();
  }

  handleClear = () => {
    this.setState({ value: '' });
    this.props.onChange(this.inputRef.current.name, '');
  };

  render() {
    const {
      style,
      minRows,
      maxRows,
      rowHeight,
      label,
      multiline,
      autogrow,
      autofocus,
      id,
      error,
      value,
      floating,
      placeholder,
      transformOnBlur,
      size,
      leftIcon,
      leftIconSize,
      leftIconColor,
      onLeftIconClick,
      rightIcon,
      rightIconSize,
      rightIconColor,
      onRightIconClick,
      ...rest
    } = this.props;

    const { focused, height, value: stateValue } = this.state;

    const isFloating = (floating && value != undefined && `${value}`.trim()) || (floating && `${stateValue}`.trim());

    const inputProps = {
      ...rest,
      id,
      ref: this.ref,
      size,
      value: stateValue,
      onChange: this.onChange,
      onFocus: this.onFocus,
      onBlur: this.onBlur,
      style: multiline ? { ...style, height } : style,
      placeholder,
      isFloatable: floating,
      isFloating,
      error,
      hasLeftIcon: !!leftIcon,
      leftIconSize,
      hasRightIcon: !!rightIcon,
      rightIconSize,
    };

    const Label = label ? (
      <StyledLabel
        htmlFor={id}
        styles={rest.styles}
        size={size}
        isFloatable={floating}
        isFloating={isFloating}
        isFocused={focused}
        error={error}>
        {label}
      </StyledLabel>
    ) : null;

    return (
      <Field styles={rest.styles}>
        {!floating && Label}

        <InputContainer styles={rest.styles}>
          {floating && Label}

          {leftIcon && (
            <LeftIcon
              data-testid="left-icon"
              name={leftIcon}
              size={leftIconSize}
              color={leftIconColor}
              onClick={onLeftIconClick}
            />
          )}

          {rightIcon && (
            <RightIcon
              data-testid="right-icon"
              name={rightIcon}
              size={rightIconSize}
              color={rightIconColor}
              onClick={onRightIconClick}
            />
          )}

          {multiline ? <StyledTextArea {...inputProps} /> : <StyledInput {...inputProps} />}
        </InputContainer>

        {autogrow && <AutogrowShadow ref={this.handleAutogrowRef} />}

        {!focused && error ? <FormError styles={rest.styles}>{error}</FormError> : null}
      </Field>
    );
  }
}

export default createEasyInput(Input);
