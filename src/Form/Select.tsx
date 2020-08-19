import React, { Component, createRef } from 'react';
import styled, { css } from 'styled-components';
import { Field } from './Field';
import { FormError } from './FormError';
import Icon from '../Icon';
import Flex from '../Flex';
import Label from './Label';
import { createEasyInput } from './EasyInput';
import { createComponent } from '../utils';

export interface SelectProps {
  name: string;
  options: any[];
  placeholder?: string;
  value?: string;
  error?: string;
  onChange?: any;
  onBlur?: any;
  size?: string;
  label?: string;
  forwardedRef?: any;
  floating?: any;
  id?: any;
}

const SelectContainer = createComponent<any>({
  name: 'SelectContainer',
  as: Flex,
  style: ({ theme }) => css`
    background: white;
    border: 1px solid ${theme.colors.greyLight};
    height: 48px;
    outline: none;
    width: 100%;
    position: relative;
    border-radius: ${theme.radius}px;
    transition: 250ms all;
    -webkit-appearance: none;
    font-family: inherit;
    font-size: ${theme.typography.fontSize}px;
    vertical-align: middle;
  `,
});

const IconContainer = styled(Flex)`
  position: absolute;
  height: 100%;
  right: 0;
  top: 0;
  z-index: 1;
`;

const SelectInput = createComponent<any>({
  name: 'Select',
  tag: 'select',
  style: ({ theme, value, isFloating }) => css`
    position: relative;
    z-index: 2;
    padding: 0 32px 0px 8px;
    outline: none;
    width: 100%;
    font-size: ${theme.typography.fontSize}px;
    font-family: inherit;
    background: transparent;
    color: ${value ? theme.typography.color : theme.colors.greyDarker};
    border: none;
    -webkit-appearance: none;

    ${isFloating &&
      css`
        margin-top: 16px;
      `};
  `,
});

const SelectOption = createComponent<any>({
  name: 'SelectOption',
  tag: 'option',
});

export class Select extends Component<SelectProps> {
  static defaultProps = {
    onChange() {},
    onBlur() {},
  };

  static getDerivedStateFromProps(props: any, state: any) {
    if (props.value !== undefined && props.value !== state.value) {
      return {
        value: props.value,
      };
    }
    return null;
  }

  state = {
    value: '',
  };

  innerRef = createRef();

  get ref() {
    return this.props.forwardedRef || this.innerRef;
  }

  handleChange = (e: any) => {
    this.setState({ value: e.target.value });
    this.props.onChange(e.target.name, e.target.value);
  };

  handleBlur = (e: any) => {
    this.props.onBlur(e.target.name);
  };

  render() {
    const { id, name, options, placeholder, error, size = 'md', label, floating, ...props } = this.props;
    const { value } = this.state;
    const isFloating = floating && value !== undefined && `${value}`.trim();
    const FloatingLabel = (
      <Label htmlFor={id} size={size} isFloating={!!isFloating} isFloatable={floating}>
        {label}
      </Label>
    );

    return (
      <Field>
        {label && !floating && <Label size={size}>{label}</Label>}
        <SelectContainer value={value} size={size}>
          {label && isFloating && FloatingLabel}
          <SelectInput
            {...props}
            size={size}
            ref={this.ref}
            name={name}
            value={value}
            onChange={this.handleChange}
            isFloating={isFloating}
            onBlur={this.handleBlur}>
            <SelectOption value="">{placeholder || 'Select an option...'}</SelectOption>
            {options.map(option => (
              <SelectOption key={option.value} value={option.value}>
                {option.label}
              </SelectOption>
            ))}
          </SelectInput>
          <IconContainer aria-hidden="true" mr={2} alignItems="center" justifyContent="center">
            <Icon name="chevron-down" color="greyDarker" size={24} />
          </IconContainer>
        </SelectContainer>
        {error && <FormError>{error}</FormError>}
      </Field>
    );
  }
}

export default createEasyInput(Select);
