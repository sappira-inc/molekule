import React, { Component, createRef } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import Field from './Field';
import FormError from './FormError';
import Icon from '../Icon';
import Flex from '../Flex';
import Label from './Label';
import { createEasyInput } from './EasyInput';
import { themeGet, createComponent } from '../utils';

const SelectContainer = createComponent({
  name: 'SelectContainer',
  as: Flex,
  style: ({ theme, value }) => css`
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
    font-size: ${themeGet('typography.fontSize')}px;
    vertical-align: middle;

    select {
      color: ${theme.colors.greyDarker};

      ${value &&
        css`
          color: ${theme.colors.greyDarkest};
        `}

      option {
        color: ${theme.colors.greyDarkest};
      }
    }
  `,
});

const IconContainer = styled(Flex)`
  position: absolute;
  height: 100%;
  right: 0;
  top: 0;
  z-index: 1;
`;

const SelectInput = createComponent({
  name: 'Select',
  tag: 'select',
  style: ({ isFloating }) => css`
    position: relative;
    z-index: 2;
    padding: 0 8px;
    outline: none;
    width: 100%;
    font-size: ${themeGet('typography.fontSize')}px;
    background: transparent;
    border: none;
    -webkit-appearance: none;
    ${isFloating &&
      css`
        margin-top: 8px;
      `};
  `,
});

const SelectOption = createComponent({
  name: 'SelectOption',
  tag: 'option',
});

export class Select extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    size: PropTypes.string,
    label: PropTypes.string,
  };

  static defaultProps = {
    onChange() {},
    onBlur() {},
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
    value: '',
  };

  innerRef = createRef();

  get ref() {
    return this.props.forwardedRef || this.innerRef;
  }

  handleChange = e => {
    this.setState({ value: e.target.value });
    this.props.onChange(e.target.name, e.target.value);
  };

  handleBlur = e => {
    this.props.onBlur(e.target.name);
  };

  render() {
    const { id, name, options, placeholder, error, size = 'md', label, floating, ...props } = this.props;
    const { value } = this.state;
    const isFloating = floating && value != undefined && `${value}`.trim();
    const FloatingLabel = (
      <Label htmlFor={id} size={size} isFloating={isFloating} isFloatable={floating}>
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
