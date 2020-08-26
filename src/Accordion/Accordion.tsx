import React, { useState, useCallback } from 'react';
import { css } from 'styled-components';
import Collapse from '../Collapse';
import { createComponent } from '../utils';
import { Box } from '../Box';
import { Icon } from '../Icon';
import { Flex } from '../Flex';

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

const AccordionIcon = createComponent<{ isOpen?: boolean }, typeof Icon>({
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

interface AccordionItemProps extends Partial<Pick<AccordionProps, 'contentContainerStyle'>> {
  title: string;
  isOpen?: boolean;
  content?: React.ReactNode | string;
  onToggle?: () => void;
  renderHeader?: (p: Pick<AccordionItemProps, 'isOpen' | 'title' | 'onToggle'>) => React.ReactNode;
  renderContent?: (p: Pick<AccordionItemProps, 'isOpen' | 'content'>) => React.ReactNode;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  isOpen,
  title,
  content,
  contentContainerStyle,
  renderHeader,
  renderContent,
  onToggle,
}) => (
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

export interface AccordionProps {
  items: AccordionItemProps[];
  solo?: boolean;
  contentContainerStyle?: React.CSSProperties;
}

export interface AccordionStaticMembers {
  Item: typeof AccordionItem;
}

const Accordion: React.FC<AccordionProps> & AccordionStaticMembers = ({
  items,
  solo,
  contentContainerStyle,
  children,
}) => {
  const [openList, setOpenList] = useState<number[]>([]);

  const handleItemToggle = useCallback(
    (idx: number) => {
      if (openList.indexOf(idx) >= 0) setOpenList(openList.filter(i => i !== idx));
      else setOpenList(solo ? [idx] : [...openList, idx]);
    },
    [solo, openList]
  );

  return (
    <AccordionContainer>
      {children ||
        items.map((item, i) => (
          <AccordionItem
            key={item.title}
            contentContainerStyle={contentContainerStyle}
            {...item}
            isOpen={openList.indexOf(i) >= 0}
            onToggle={() => handleItemToggle(i)}
          />
        ))}
    </AccordionContainer>
  );
};

Accordion.Item = AccordionItem;

export default Accordion;
