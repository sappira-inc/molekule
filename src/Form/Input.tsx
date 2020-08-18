import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { Field } from './Field';
import StyledLabel from './Label';
import { FormError, StyledFormError } from './FormError';
import { createEasyInput, EasyInputProps } from './EasyInput';
import Icon from '../Icon';
import { createComponent } from '../utils';

interface InputContainerProps {
  styles: any;
}

const InputContainer = createComponent<InputContainerProps>({
  name: 'InputContainer',
  style: css`
    position: relative;

    & + ${StyledFormError} {
      margin-left: 8px;
    }
  `,
});

export interface InputProps {
  value?: any;
  type?: string;
  disabled?: boolean;
  placeholder?: string;
  multiline?: boolean;
  label?: any;
  autofocus?: any;
  transformOnBlur?: any;
  onFocus?: any;
  onBlur?: any;
  onChange?: any;
  onKeyDown?: any;
  minRows?: number;
  rows?: number;
  maxRows?: number;
  rowHeight?: number;
  lineHeight?: number;
  autogrow?: boolean;
  size?: string;
  floating?: boolean;
  forwardedRef?: any;
  leftIcon?: string;
  leftIconProps?: any;
  rightIcon?: string;
  rightIconProps?: any;
  style?: any;
  styles?: any;
  id?: any;
  error?: any;
}

const StyledInput = createComponent<InputProps, 'input'>({
  name: 'Input',
  tag: 'input',
  style: ({
    isFloatable,
    isFloating,
    theme,
    borderRadius = theme.radius,
    leftIcon,
    rightIcon,
    leftIconProps,
    rightIconProps,
  }: any) => css`
    border: 1px solid ${theme.colors.greyLight};
    height: 48px;
    display: block;
    outline: none;
    width: 100%;
    padding: 8px;
    padding-right: 24px;
    border-radius: ${borderRadius}px;
    transition: 250ms all;
    -webkit-appearance: none;
    font-family: inherit;
    font-size: ${theme.typography.fontSize}px;
    color: ${theme.typography.color};
    box-sizing: border-box;

    &:hover,
    &:active,
    & + label &:hover {
      border-color: ${theme.colors.greyDark};
    }

    &:focus {
      border-color: ${theme.colors.primary};
    }

    ::placeholder {
      color: ${theme.colors.greyDarker};
      opacity: ${isFloatable ? 0 : 1};
    }

    &[disabled] {
      background-color: ${theme.colors.white};
      border-color: ${theme.colors.greyLight};
      color: ${theme.colors.grey};

      ::placeholder {
        color: ${theme.colors.grey};
      }
    }

    ${leftIcon &&
      !isFloatable &&
      css`
        padding-left: ${(leftIconProps.size || 16) + 12}px;
      `};

    ${rightIcon &&
      css`
        padding-right: ${(rightIconProps.size || 16) + 32}px;
      `};

    ${isFloating &&
      css`
        line-height: 16px;
        padding-top: 16px;
        padding-bottom: 0px;
      `};
  `,
});

const StyledIcon = styled(Icon)`
  ${({ theme, isDisabled }: any) => css`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    transition: 250ms all;

    ${isDisabled &&
      css`
        color: ${theme.colors.grey};
      `}
  `}
`;

const LeftIcon = createComponent({
  name: 'InputLeftIcon',
  as: StyledIcon,
  style: ({ isFocused, isFloating, isFloatable, theme }: any) => css`
    left: 8px;

    ${isFloatable &&
      css`
        position: static;
        padding-right: 4px;
      `}

    ${isFloating &&
      css`
        font-size: 12px;
        line-height: 14px;

        ${isFocused &&
          css`
            color: ${theme.colors.primary};
          `}
      `}
  `,
});

const RightIcon = createComponent({
  name: 'InputRightIcon',
  as: StyledIcon,
  style: css`
    right: 8px;
  `,
});

const StyledTextArea = createComponent({
  name: 'TextArea',
  as: StyledInput.withComponent('textarea'),
  style: ({ isFloatable, isFloating }: any) => css`
    ${isFloatable &&
      isFloating &&
      css`
        padding-top: 24px;
      `}
  `,
});

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

export class InputClass extends Component<InputProps, any> {
  autogrowShadowNode: any;

  static defaultProps: InputProps = {
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
    leftIconProps: {},
    rightIconProps: {},
  };

  static getDerivedStateFromProps(props: InputProps, state: any) {
    if (props.value !== undefined && props.value !== state.value) {
      return {
        value: props.value,
      };
    }
    return null;
  }

  state: any = {
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
        height: (this.props.rows || 0) * (this.props.rowHeight || 0) * (this.props.lineHeight || 0),
      });
    }
  }

  componentDidUpdate(_oldProps: InputProps, oldState: any) {
    if (oldState.value !== this.state.value) {
      this.autogrow();
    }
  }

  componentWillUnmount() {
    if (this.autogrowShadowNode && this.autogrowShadowNode.parentNode) {
      this.autogrowShadowNode.parentNode.removeChild(this.autogrowShadowNode);
    }
  }

  onFocus = (e: any) => {
    this.setState({ focused: true });
    this.props.onFocus(e.target.name);
  };

  onBlur = (e: any) => {
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

  onChange = (e: any) => {
    this.setState({ value: e.target.value });
    this.props.onChange(e.target.name, e.target.value, e);
  };

  handleAutogrowRef = (node: any) => {
    this.autogrowShadowNode = node;
    this.autogrow();
  };

  autogrow() {
    if (!this.props.autogrow || !this.autogrowShadowNode) {
      return;
    }

    const { minRows = 0, maxRows = 0, rowHeight = 0, lineHeight = 0 } = this.props;

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

  handleLabelClick = () => {
    if (this.props.floating) {
      this.focus();
    }
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
      floating,
      placeholder,
      transformOnBlur,
      size,
      leftIcon,
      leftIconProps,
      rightIcon,
      rightIconProps,
      disabled,
      ...rest
    } = this.props;

    const { focused, height, value } = this.state;

    const isFloating = (floating && value != null && !!`${value}`.trim()) || (floating && focused);

    const inputProps = {
      ...rest,
      id,
      ref: this.ref,
      size,
      value,
      onChange: this.onChange,
      onFocus: this.onFocus,
      onBlur: this.onBlur,
      style: multiline ? { ...style, height } : style,
      placeholder,
      isFloatable: floating,
      isFloating,
      error,
      leftIcon,
      leftIconProps,
      rightIcon,
      rightIconProps,
      disabled,
    };

    const { styles } = rest as any;

    const statusProps = {
      isFloatable: floating,
      isFloating,
      isFocused: focused,
      isDisabled: disabled,
    };

    const Label = label ? (
      <StyledLabel
        htmlFor={id}
        styles={styles}
        error={error}
        multiline={multiline}
        onClick={this.handleLabelClick}
        {...statusProps}>
        {leftIcon && <LeftIcon styles={styles} name={leftIcon} {...statusProps} {...leftIconProps} />}
        {label}
      </StyledLabel>
    ) : null;

    return (
      <Field styles={styles}>
        {!floating && Label}

        <InputContainer styles={styles}>
          {floating && Label}

          {leftIcon && !floating && <LeftIcon styles={styles} name={leftIcon} {...statusProps} {...leftIconProps} />}

          {rightIcon && <RightIcon styles={styles} name={rightIcon} size={24} {...statusProps} {...rightIconProps} />}

          {multiline ? <StyledTextArea {...inputProps} /> : <StyledInput {...(inputProps as any)} />}
        </InputContainer>

        {!focused && error ? <FormError>{error}</FormError> : null}

        {autogrow && <AutogrowShadow ref={this.handleAutogrowRef} />}
      </Field>
    );
  }
}

export const Input = createEasyInput<InputProps & EasyInputProps>(InputClass);
