import React, { useState } from 'react';
import Dropdown, { PLACEMENT_TRANSITION_ORIGINS } from './Dropdown';
import Icon from '../Icon';
import Flex from '../Flex';
import RadioGroup from '../Form/RadioGroup';
import Button from '../Button';

export default {
  title: 'Components|Dropdown',
  component: Dropdown,
};

export const Basic = () => {
  function Example() {
    const [placement, setPlacement] = useState('top');
    return (
      <>
        <Flex justifyContent="space-between">
          <RadioGroup
            label={<strong>Placement</strong>}
            value={placement}
            choices={Object.keys(PLACEMENT_TRANSITION_ORIGINS).map(placement => ({
              value: placement,
              label: placement,
            }))}
            onChange={(_, val) => setPlacement(val)}
          />
          <Flex mr={3}>
            <Dropdown placement={placement} width={250} trigger={<Button variant="success">Open Dropdown</Button>}>
              <Dropdown.Header title="Dropdown" />

              <Dropdown.Body>
                <Dropdown.SectionTitle>Section One</Dropdown.SectionTitle>
                <Dropdown.Item closeOnClick={false}>I don't close when clicked</Dropdown.Item>
                <Dropdown.Item as="button">Item Two</Dropdown.Item>

                <Dropdown.SectionTitle>Section Two</Dropdown.SectionTitle>
                <Dropdown.Item as="a" closeOnClick href="http://google.com" target="_blank">
                  Item One
                </Dropdown.Item>
                <Dropdown.Item disabled>Item Two</Dropdown.Item>
              </Dropdown.Body>

              <Dropdown.Footer>Footer</Dropdown.Footer>
            </Dropdown>
          </Flex>

          <Flex mr={3}>
            <Dropdown width={250} trigger={<Button>Open Other Dropdown</Button>}>
              <Dropdown.Header title="Dropdown" />

              <Dropdown.Body>
                <Dropdown.SectionTitle>Section One</Dropdown.SectionTitle>
                <Dropdown.Item>Item One</Dropdown.Item>
                <Dropdown.Item>Item Two</Dropdown.Item>

                <Dropdown.SectionTitle>Section Two</Dropdown.SectionTitle>
                <Dropdown.Item>Item One</Dropdown.Item>
                <Dropdown.Item disabled>Item Two</Dropdown.Item>
              </Dropdown.Body>

              <Dropdown.Footer>Footer</Dropdown.Footer>
            </Dropdown>
          </Flex>

          <Flex mr={3}>
            <Dropdown width={250} placement="top" trigger={<Icon name="information-outline" />}>
              <Dropdown.Header title="Dropdown" />

              <Dropdown.Body>
                <Dropdown.SectionTitle>Section One</Dropdown.SectionTitle>
                <Dropdown.Item>Item One</Dropdown.Item>
                <Dropdown.Item>Item Two</Dropdown.Item>
              </Dropdown.Body>

              <Dropdown.Footer>Footer</Dropdown.Footer>
            </Dropdown>
          </Flex>

          <Flex flex={1}>
            <Dropdown
              width={250}
              placement="top"
              styles={{ Trigger: { display: 'flex', flex: 1 } }}
              trigger={
                <Flex flex={1} justifyContent="space-between">
                  <Button style={{ width: `100%` }}>Open Flex Dropdown</Button>
                </Flex>
              }>
              <Dropdown.Header title="Dropdown" />

              <Dropdown.Body>
                <Dropdown.SectionTitle>Section One</Dropdown.SectionTitle>
                <Dropdown.Item>Item One</Dropdown.Item>
                <Dropdown.Item>Item Two</Dropdown.Item>
              </Dropdown.Body>

              <Dropdown.Footer>Footer</Dropdown.Footer>
            </Dropdown>
          </Flex>
        </Flex>
      </>
    );
  }
  return <Example />;
};
