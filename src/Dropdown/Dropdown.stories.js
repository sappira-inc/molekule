import React, { useState } from 'react';
import Dropdown, { PLACEMENT_TRANSITION_ORIGINS } from './Dropdown';
import Flex from '../Flex';
import RadioGroup from '../Form/RadioGroup';
import Button from '../Button';

export default {
  title: 'Components|Dropdown',
  component: Dropdown,
};

function BasicExample() {
  const [placement, setPlacement] = useState('bottom-start');
  return (
    <Flex justifyContent="center">
      <Flex mr={5}>
        <RadioGroup
          label={<strong>Placement</strong>}
          value={placement}
          choices={Object.keys(PLACEMENT_TRANSITION_ORIGINS).map(p => ({
            value: p,
            label: p,
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
          <Dropdown.Item>Dropdown Item</Dropdown.Item>
          <Dropdown.Item>Dropdown Item</Dropdown.Item>
          <Dropdown.Item>Dropdown Item</Dropdown.Item>
          <Dropdown.Item>Dropdown Item</Dropdown.Item>
          <Dropdown.Item color="red">Cancel</Dropdown.Item>
        </Dropdown>
      </Flex>
    </Flex>
  );
}

export const Basic = () => <BasicExample />;

export const WithTitles = () => (
  <Flex>
    <Dropdown placement="bottom-start" width={250} trigger={<Button variant="danger">Dropdown w/Titles</Button>}>
      <Dropdown.Title>Section Title</Dropdown.Title>
      <Dropdown.Item selected closeOnClick={false}>
        Dropdown Item
      </Dropdown.Item>
      <Dropdown.Item>Dropdown Item</Dropdown.Item>
      <Dropdown.Item>Dropdown Item</Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Title>Section Title</Dropdown.Title>
      <Dropdown.Item>Dropdown Item</Dropdown.Item>
      <Dropdown.Item>Dropdown Item</Dropdown.Item>
      <Dropdown.Item>Dropdown Item</Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item color="red">Cancel</Dropdown.Item>
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
      <Dropdown.Item icon="account-circle">Dropdown Item</Dropdown.Item>
      <Dropdown.Item icon="pencil">Dropdown Item</Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item icon="stethoscope">Dropdown Item</Dropdown.Item>
      <Dropdown.Item icon="bell">Dropdown Item</Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item icon="settings">Dropdown Item</Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item icon="trash-can" color="red">
        Cancel
      </Dropdown.Item>
    </Dropdown>
  </Flex>
);
