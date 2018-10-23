import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { css } from 'styled-components';
import Collapse from '../Collapse';
import { createComponent } from '../utils';
import Box from '../Box';
import Icon from '../Icon';
import Flex from '../Flex';

const AccordionItemProps = {
  title: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  content: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  renderHeader: PropTypes.func,
  renderContent: PropTypes.func,
};

const AccordionContainer = createComponent({
  name: 'Accordion',
});

const AccordionItemContainer = createComponent({
  name: 'AccordionItem',
});

const AccordionHeader = createComponent({
  name: 'AccordionItemHeader',
  tag: 'header',
  style: css`
    padding: 0.75rem 1rem;
    cursor: pointer;
  `,
});

const AccordionTitle = createComponent({
  name: 'AccordionItemTitle',
  tag: 'span',
  style: css``,
});

const AccordionIcon = createComponent({
  name: 'AccordionItemIcon',
  as: Icon,
  style: ({ isOpen }) => css`
    transition: 175ms transform;
    transform: rotate(${isOpen ? 90 : 0}deg);
  `,
});

const AccordionContent = createComponent({
  name: 'AccordionItemContent',
});

const AccordionItem = ({ isOpen, title, content, contentContainerStyle, renderHeader, renderContent, onToggle }) => (
  <AccordionItemContainer>
    <Collapse
      isOpen={isOpen}
      renderTrigger={() =>
        renderHeader ? (
          renderHeader({ isOpen, title, onToggle })
        ) : (
          <AccordionHeader onClick={onToggle}>
            <Flex>
              <Box flex={1}>
                <AccordionTitle>{title}</AccordionTitle>
              </Box>
              <AccordionIcon name="chevron-right" isOpen={isOpen} />
            </Flex>
          </AccordionHeader>
        )
      }>
      {renderContent ? (
        renderContent({ isOpen, content })
      ) : (
        <AccordionContent style={contentContainerStyle}>{content}</AccordionContent>
      )}
    </Collapse>
  </AccordionItemContainer>
);

AccordionItem.propTypes = AccordionItemProps;

export default class Accordion extends Component {
  static propTypes = {
    /**
     * An array of AccordionItems
     */
    items: PropTypes.arrayOf(PropTypes.shape(AccordionItemProps)),

    /**
     * Only one accordion cell open at a time
     */
    solo: PropTypes.bool,

    /**
     * Style passed to content container box
     */
    contentContainerStyle: PropTypes.object,
  };

  static Item = AccordionItem;

  state = {
    openList: [],
  };

  handleItemToggle = idx => {
    const { solo } = this.props;
    this.setState(({ openList }) => {
      if (openList.indexOf(idx) >= 0) {
        return { openList: openList.filter(i => i !== idx) };
      }

      return {
        openList: solo ? [idx] : [...openList, idx],
      };
    });
  };

  render() {
    const { items, children, contentContainerStyle } = this.props;
    const { openList } = this.state;

    return (
      <AccordionContainer>
        {children ||
          items.map((item, i) => (
            <AccordionItem
              key={item.title}
              contentContainerStyle={contentContainerStyle}
              isOpen={openList.indexOf(i) >= 0}
              {...item}
              onToggle={() => this.handleItemToggle(i)}
            />
          ))}
      </AccordionContainer>
    );
  }
}
