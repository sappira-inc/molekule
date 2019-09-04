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
    const [placement, setPlacement] = useState('bottom');
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
          <Dropdown
            placement={placement}
            width={250}
            trigger={
              <Button mr={3} variant="success">
                Open Dropdown
              </Button>
            }>
            <Dropdown.Header title="Dropdown" />

            <Dropdown.Body>
              <Dropdown.Section>
                <Dropdown.SectionTitle>Section One</Dropdown.SectionTitle>
                <Dropdown.Item closeOnClick={false}>I don't close when clicked</Dropdown.Item>
                <Dropdown.Item as="button">Item Two</Dropdown.Item>
              </Dropdown.Section>

              <Dropdown.Section>
                <Dropdown.SectionTitle>Section Two</Dropdown.SectionTitle>
                <Dropdown.Item as="a" onClick={close} href="http://google.com" target="_blank">Item One</Dropdown.Item>
                <Dropdown.Item disabled>Item Two</Dropdown.Item>
              </Dropdown.Section>
            </Dropdown.Body>

            <Dropdown.Footer>Footer</Dropdown.Footer>
          </Dropdown>

          <Dropdown width={250} trigger={<Button mr={3}>Open Other Dropdown</Button>}>
            <Dropdown.Header title="Dropdown" />

            <Dropdown.Body>
              <Dropdown.Section>
                <Dropdown.SectionTitle>Section One</Dropdown.SectionTitle>
                <Dropdown.Item>Item One</Dropdown.Item>
                <Dropdown.Item>Item Two</Dropdown.Item>
              </Dropdown.Section>

              <Dropdown.Section>
                <Dropdown.SectionTitle>Section Two</Dropdown.SectionTitle>
                <Dropdown.Item icon="alert-circle" iconProps={{ size: 16, color: 'primary' }}>Item One</Dropdown.Item>
                <Dropdown.Item disabled>Item Two</Dropdown.Item>
              </Dropdown.Section>
            </Dropdown.Body>

            <Dropdown.Footer>Footer</Dropdown.Footer>
          </Dropdown>
          <Flex mr={3}>
            <Dropdown width={250} placement="bottom-end" trigger={<Icon name="information-outline" />}>
              <Dropdown.Header title="Dropdown" />

              <Dropdown.Body>
                <Dropdown.Section>
                  <Dropdown.SectionTitle>Section One</Dropdown.SectionTitle>
                  <Dropdown.Item>Item One</Dropdown.Item>
                  <Dropdown.Item>Item Two</Dropdown.Item>
                </Dropdown.Section>
              </Dropdown.Body>

              <Dropdown.Footer>Footer</Dropdown.Footer>
            </Dropdown>
          </Flex>

          <Dropdown
            width={250}
            placement="bottom-start"
            styles={{ Trigger: { display: 'flex', flex: 1 } }}
            trigger={
              <Flex mr={3} flex={1} justifyContent="space-between">
                <Button style={{ width: `100%` }}>Open Flex Dropdown</Button>
              </Flex>
            }>
            <Dropdown.Header title="Dropdown" />

            <Dropdown.Body>
              <Dropdown.Section>
                <Dropdown.SectionTitle>Section One</Dropdown.SectionTitle>
                <Dropdown.Item>Item One</Dropdown.Item>
                <Dropdown.Item>Item Two</Dropdown.Item>
              </Dropdown.Section>
            </Dropdown.Body>

            <Dropdown.Footer>Footer</Dropdown.Footer>
          </Dropdown>
        </Flex>
      </>
    );
  }
  return <Example />;
};
