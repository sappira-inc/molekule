import React, { useState } from 'react';
import Dropdown, { PLACEMENT_TRANSITION_ORIGINS } from './Dropdown';
import Flex from '../Flex';
import RadioGroup from '../Form/RadioGroup';
import Button from '../Button';

export default {
  title: 'Components|Dropdown',
  component: Dropdown,
};

export const Basic = () => {
  const [ placement, setPlacement ] = useState('bottom-start')
  return (
    <Flex justifyContent="center">
      <Flex mr={5}>
        <RadioGroup
          label={<strong>Placement</strong>}
          value={placement}
          choices={Object.keys(PLACEMENT_TRANSITION_ORIGINS).map(placement => ({
            value: placement,
            label: placement,
          }))}
          onChange={(_, val) => setPlacement(val)}
        />
      </Flex>
      <Flex alignSelf="center">
        <Dropdown
          placement={placement}
          width={250}
          trigger={
            <Button mr={3} variant="primary">
              Basic Dropdown
            </Button>
          }>
          <Dropdown.Section>
            <Dropdown.Item>Dropdown Item</Dropdown.Item>
            <Dropdown.Item>Dropdown Item</Dropdown.Item>
            <Dropdown.Item>Dropdown Item</Dropdown.Item>
            <Dropdown.Item>Dropdown Item</Dropdown.Item>
            <Dropdown.Item color="red">Cancel</Dropdown.Item>
          </Dropdown.Section>
        </Dropdown>
      </Flex>
    </Flex>
  );
};

export const WithTitles = () => (
  <Flex>
    <Dropdown placement="bottom-start" width={250} trigger={<Button variant="danger">Dropdown w/Titles</Button>}>
      <Dropdown.Body>
        <Dropdown.Section>
          <Dropdown.SectionTitle>Section Title</Dropdown.SectionTitle>
          <Dropdown.Item selected closeOnClick={false}>Dropdown Item</Dropdown.Item>
          <Dropdown.Item>Dropdown Item</Dropdown.Item>
          <Dropdown.Item>Dropdown Item</Dropdown.Item>
        </Dropdown.Section>
        <Dropdown.Section>
          <Dropdown.SectionTitle>Section Title</Dropdown.SectionTitle>
          <Dropdown.Item>Dropdown Item</Dropdown.Item>
          <Dropdown.Item>Dropdown Item</Dropdown.Item>
          <Dropdown.Item>Dropdown Item</Dropdown.Item>
        </Dropdown.Section>
      </Dropdown.Body>
      <Dropdown.Footer>
        <Dropdown.Item color="red">Cancel</Dropdown.Item>
      </Dropdown.Footer>
    </Dropdown>
  </Flex>
);

export const WithIcons = () => (
  <Flex>
    <Dropdown
      placement="bottom-start"
      width={250}
      trigger={
        <Button mr={3} variant="success">
          Dropdown w/Icons
        </Button>
      }>
      <Dropdown.Body>
        <Dropdown.Section>
          <Dropdown.Item icon="account-circle">Dropdown Item</Dropdown.Item>
        </Dropdown.Section>
        <Dropdown.Section>
          <Dropdown.Item icon="pencil">Dropdown Item</Dropdown.Item>
          <Dropdown.Item icon="stethoscope">Dropdown Item</Dropdown.Item>
        </Dropdown.Section>
        <Dropdown.Section>
          <Dropdown.Item icon="bell">Dropdown Item</Dropdown.Item>
          <Dropdown.Item icon="settings">Dropdown Item</Dropdown.Item>
        </Dropdown.Section>
      </Dropdown.Body>
      <Dropdown.Footer>
        <Dropdown.Item icon="trash-can" color="red">Cancel</Dropdown.Item>
      </Dropdown.Footer>
    </Dropdown>
  </Flex>
);
