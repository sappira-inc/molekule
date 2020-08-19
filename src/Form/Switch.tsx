import React from 'react';
import { css } from 'styled-components';
import { createComponent } from '../utils';
import { createEasyInput } from './EasyInput';

const SwitchThumb = createComponent<any>({
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

const SwitchTrack = createComponent<any>({
  name: 'SwitchTrack',
  as: 'label',
  style: ({ theme, trackColor, thumbSize, trackInset, value, isFocused, colorFocus = theme.colors.colorFocus }) => css`
    position: relative;
    display: inline-block;
    cursor: pointer;
    width: ${thumbSize * 2}px;
    height: ${thumbSize}px;
    background: ${value ? theme.colors[trackColor] : 'transparent'};
    border: ${trackInset}px solid ${value ? theme.colors[trackColor] : theme.colors.grey};
    border-radius: ${thumbSize}px;
    transition: background-color 0.2s, border-color 0.2s;
    z-index: 1;

    &:active {
      ${SwitchThumb} {
        transform: translateX(${value ? thumbSize - trackInset * 3 : 0}px);
        width: ${thumbSize + trackInset}px;
      }
    }

    &:before {
      transition: opacity 250ms;
      content: '';
      position: absolute;
      left: -${trackInset + 4}px;
      top: -${trackInset + 4}px;
      width: ${thumbSize * 2}px;
      height: ${thumbSize}px;
      z-index: 0;
      opacity: 0;
    }

    ${isFocused &&
      css`
        &:before {
          opacity: 1;
          border: 4px solid ${colorFocus};
          border-radius: ${thumbSize}px;
        }
      `}
  `,
});

const SwitchInput = createComponent<any>({
  name: 'SwitchInput',
  as: 'input',
  style: css`
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
    left: 1px;
    white-space: nowrap;
  `,
});

interface SwitchProps {
  name?: string;
  trackColor?: string;
  trackInset?: number;
  thumbSize?: number;
  value?: boolean;
  onChange?: any;
  colorFocus?: any;
}

export class Switch extends React.Component<SwitchProps, any> {
  static defaultProps = {
    trackColor: 'primary',
    trackInset: 2,
    thumbSize: 24,
  };

  state = {
    value: !!this.props.value,
    isFocused: false,
  };

  static getDerivedStateFromProps(props: any, state: any) {
    if (props.value !== undefined && props.value !== state.value) {
      return {
        value: props.value,
      };
    }

    return null;
  }

  handleChange = () => {
    const { onChange, name } = this.props;

    if (typeof onChange === 'function') {
      onChange(name, !this.state.value);
    } else {
      this.setState((state: any) => ({ value: !state.value }));
    }
  };

  handleFocus = () => {
    this.setState({ isFocused: !this.state.isFocused });
  };

  render() {
    const { name, thumbSize, trackInset, colorFocus, ...props } = this.props;
    const { value, isFocused } = this.state;
    const sharedProps = {
      value,
      thumbSize,
      trackInset,
      isFocused,
    };

    return (
      <SwitchTrack colorFocus={colorFocus} {...props} {...sharedProps}>
        <SwitchInput
          name={name}
          type="checkbox"
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleFocus}
        />
        <SwitchThumb {...sharedProps} />
      </SwitchTrack>
    );
  }
}

export default createEasyInput(Switch);
