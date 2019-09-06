import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'styled-components';
import { createComponent } from '../utils';
import { createEasyInput } from './EasyInput';

const SwitchThumb = createComponent({
  name: 'SwitchThumb',
  as: 'i',
  style: ({ trackInset, thumbSize, value }) => css`
    border-radius: ${thumbSize * 2}px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    height: ${thumbSize - trackInset * 2}px;
    width: ${thumbSize - trackInset * 2}px;
    background-color: white;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1), 0px 4px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.3s cubic-bezier(0.125, 0.85, 0.3, 1.125);

    ${value &&
      css`
        transform: translateX(${thumbSize}px);
      `};
  `,
});

const SwitchTrack = createComponent({
  name: 'SwitchTrack',
  as: 'label',
  style: ({ theme, trackColor, thumbSize, trackInset, value }) => css`
    position: relative;
    display: inline-block;
    cursor: pointer;
    width: ${thumbSize * 2}px;
    height: ${thumbSize}px;
    background: ${value ? theme.colors[trackColor] : 'transparent'};
    border: ${trackInset}px solid ${value ? theme.colors[trackColor] : theme.colors.grey};
    border-radius: ${thumbSize * 2}px;

    &:active {
      ${SwitchThumb} {
        transform: translateX(${value ? thumbSize - trackInset * 3 : 0}px);
        width: ${thumbSize + trackInset}px;
      }
    }
  `,
});

const SwitchInput = createComponent({
  name: 'SwitchInput',
  as: 'input',
  style: css`
    display: none;
  `,
});

export class Switch extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    trackColor: PropTypes.string,
    trackInset: PropTypes.number,
    thumbSize: PropTypes.number,
    value: PropTypes.bool,
  };

  static defaultProps = {
    trackColor: 'primary',
    trackInset: 2,
    thumbSize: 24,
  };

  state = {
    value: !!this.props.value,
  };

  static getDerivedStateFromProps(props, state) {
    if (props.value !== undefined && props.value !== state.value) {
      return {
        value: props.value,
      };
    }

    return null;
  }

  handleChange = () => {
    const { onChange, name } = this.props;
    const { value } = this.state;
    const nextValue = !value;

    this.setState({ value: nextValue }, () => {
      if (typeof onChange === 'function') {
        onChange(name, nextValue);
      }
    });
  };

  render() {
    const { name, thumbSize, trackInset, ...props } = this.props;
    const { value } = this.state;
    const sharedProps = {
      value,
      thumbSize,
      trackInset,
    };

    return (
      <SwitchTrack {...props} {...sharedProps}>
        <SwitchInput name={name} type="checkbox" onChange={this.handleChange} />
        <SwitchThumb {...sharedProps} />
      </SwitchTrack>
    );
  }
}

export default createEasyInput(Switch);
