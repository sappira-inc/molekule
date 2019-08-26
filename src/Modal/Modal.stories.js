import React from 'react';
import Modal from './Modal';
import ModalExample from './Modal.example';
import ModalDropdownExample from './Modal.dropdownExample';

export default {
  title: 'Components|Modal',
  component: Modal,
};

export const Basic = () => (
  <ModalExample
    body="I am an example modal that displays example content to prove that I can actually do some things"
    maxWidth={300}
  />
);

export const LongContent = () => (
  <ModalExample
    body={
      <div>
        {new Array(50).fill(null).map(key => (
          <p key={key}>I&apos;m really long annoying content.</p>
        ))}
      </div>
    }
  />
);

export const DropdownTrigger = () => <ModalDropdownExample body="I'm triggered by a dropdown" />;
