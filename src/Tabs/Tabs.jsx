import React, { Component } from 'react';
import { css } from 'styled-components';
import PropTypes from 'prop-types';
import { createComponent } from '../utils';

const TabsProvider = createComponent({
  name: 'Tabs',
  style: ({ vertical }) => css`
    display: flex;
    flex-direction: ${vertical ? 'row' : 'column'};
  `,
});

const TabList = createComponent({
  name: 'TabList',
  tag: 'ul',
  style: ({ vertical }) => css`
    display: flex;
    margin: 0;
    padding: 0;
    list-style: none;
    flex-direction: ${vertical ? 'column' : 'row'};

    ${!vertical &&
      css`
        border-bottom: 1px solid #dfe3e8;
      `};
  `,
});
const TabListItem = createComponent({
  name: 'TabListItem',
  tag: 'li',
  style: () => css`
    display: flex;
    margin: 0;
    padding: 0;
  `,
});

const Tab = createComponent({
  name: 'Tab',
  tag: 'button',
  style: ({ vertical, disabled }) => css`
    appearance: none;
    margin: 0;
    padding: 0;
    background: none;
    border: none;
    font-size: 14px;
    font-family: inherit;
    position: relative;
    justify-content: center;
    cursor: pointer;
    margin-${vertical ? 'left' : 'top'}: 1px;
    margin-${vertical ? 'right' : 'bottom'}: -1px;
    padding: ${vertical ? '0' : '0 12px'};
    outline: none;
    white-space: nowrap;
    opacity: ${disabled ? 0.5 : 1};

    &:active {
      outline: none;
    }
  `,
});

const TabTitle = createComponent({
  name: 'TabTitle',
  tag: 'span',
  style: ({ active, vertical, theme }) => css`
    display: block;
    color: ${active ? '#212b36' : '#637381'};
    padding: ${vertical ? '8px 12px 8px 8px' : '12px 8px'};
    border-${vertical ? 'left' : 'bottom'}: 4px solid ${active ? theme.colors.primary : 'transparent'};

    &::hover {
      color: #212b36;
      border-color: ${active ? theme.colors.primary : '#d9dee3'};
    }
  `,
});

const TabContent = createComponent({
  name: 'TabContent',
  tag: 'div',
  style: css`
    width: 100%;
  `,
});

class Tabs extends Component {
  static propTypes = {
    tabs: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    active: PropTypes.number,
    vertical: PropTypes.bool,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    vertical: false,
  };

  state = {
    active: this.props.active || 0,
  };

  componentDidUpdate() {
    if (this.props.active && this.props.active !== this.state.active) {
      this.setState({
        active: this.props.active,
      });
    }
  }

  handleTabClick = selected => {
    if (this.props.onChange) {
      this.props.onChange(selected);
    }

    this.setState({
      active: selected,
    });
  };

  renderHeadings() {
    return this.props.tabs.map((tab, i) => {
      const id = tab.id || i;

      return (
        <TabListItem key={id}>
          <Tab
            id={id}
            disabled={tab.disabled}
            vertical={this.props.vertical}
            onClick={() => {
              if (tab.onActive) {
                tab.onActive();
              }
              this.handleTabClick(i);
            }}>
            <TabTitle active={this.state.active === i} vertical={this.props.vertical}>
              {tab.title}
            </TabTitle>
          </Tab>
        </TabListItem>
      );
    });
  }

  renderContent() {
    const { content } = this.props.tabs[this.state.active];
    if (React.isValidElement(content)) {
      return content;
    }
    throw new Error('Tab content must be a valid React element.');
  }

  render() {
    return (
      <TabsProvider vertical={this.props.vertical}>
        <TabList vertical={this.props.vertical}>{this.renderHeadings()}</TabList>
        <TabContent>{this.renderContent()}</TabContent>
      </TabsProvider>
    );
  }
}

export default Tabs;
