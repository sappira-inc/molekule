import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { css } from 'styled-components';
import Transition from 'react-transition-group/Transition';
import { createComponent } from '../utils';

const getTransitionStyle = (state, duration) => {
  switch (state) {
    case 'exited':
      return css`
        display: none;
      `;

    case 'entering':
    case 'exiting':
      return css`
        transition: height ${duration}ms ease-in-out;
        overflow: hidden;
      `;

    default:
      return css``;
  }
};

const Container = createComponent({
  name: 'Collapse',
  style: ({ duration, height, state }) => css`
    position: relative;
    height: ${height}px;

    ${getTransitionStyle(state, duration)};
  `,
});

const Trigger = createComponent({
  name: 'CollapseTrigger',
});

export default class Collapse extends Component {
  static propTypes = {
    isOpen: PropTypes.bool,
    duration: PropTypes.number,
    onEnter: PropTypes.func,
    onEntering: PropTypes.func,
    onEntered: PropTypes.func,
    onExit: PropTypes.func,
    onExiting: PropTypes.func,
    onExited: PropTypes.func,
  };

  static defaultProps = {
    duration: 175,
    onEnter: () => {},
    onEntering: () => {},
    onEntered: () => {},
    onExit: () => {},
    onExiting: () => {},
    onExited: () => {},
  };

  static getDerivedStateFromProps(props, state) {
    if (props.isOpen !== undefined && props.isOpen !== state.isOpen) {
      return {
        ...state,
        isOpen: props.isOpen,
      };
    }

    return null;
  }

  state = {
    isOpen: this.props.isOpen || false,
    height: 0,
  };

  onEnter = (node, isAppearing) => {
    this.props.onEnter(node, isAppearing);
  };

  onEntering = (node, isAppearing) => {
    this.setState({ height: node.scrollHeight });
    this.props.onEntering(node, isAppearing);
  };

  onEntered = (node, isAppearing) => {
    this.props.onEntered(node, isAppearing);
  };

  onExit = node => {
    this.setState({ height: node.scrollHeight });
    this.props.onExit(node);
  };

  onExiting = node => {
    // Taken from: https://github.com/reactstrap/reactstrap/blob/master/src/Collapse.js#L80
    const _unused = node.offsetHeight; // eslint-disable-line
    this.setState({ height: 0 });
    this.props.onExiting(node);
  };

  onExited = node => {
    this.props.onExited(node);
  };

  toggle = () => {
    this.setState(state => ({
      isOpen: !state.isOpen,
    }));
  };

  renderTrigger() {
    const { trigger, renderTrigger } = this.props;

    if (renderTrigger) {
      return renderTrigger({ toggle: this.toggle });
    } else if (trigger) {
      return <Trigger onClick={this.toggle}>{trigger}</Trigger>;
    }

    return null;
  }

  render() {
    const { duration, children, ...props } = this.props;
    const { height, isOpen } = this.state;

    return (
      <>
        {this.renderTrigger()}

        <Transition
          {...props}
          in={isOpen}
          timeout={duration}
          onEnter={this.onEnter}
          onEntering={this.onEntering}
          onEntered={this.onEntered}
          onExit={this.onExit}
          onExiting={this.onExiting}
          onExited={this.onExited}>
          {state => (
            <Container state={state} height={height} duration={duration}>
              {children}
            </Container>
          )}
        </Transition>
      </>
    );
  }
}
