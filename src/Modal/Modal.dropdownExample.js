import React from 'react';
import Modal from './Modal';
import Button from '../Button';
import Input from '../Form/Input';
import Dropdown from '../Dropdown';

export default class ModalDropdownDemo extends React.Component {
  state = {
    isModalOpen: false,
  };

  toggle = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  };

  onCancel = () => {
    this.toggle();

    setTimeout(() => {
      alert('Oh no! It has been canceled.');
    }, 500);
  };

  render() {
    const { body, ...props } = this.props;

    return (
      <div>
        <Dropdown placement="top" width={250} trigger={<Button variant="success">Open Dropdown</Button>}>
          <Dropdown.Header title="Dropdown" />

          <Dropdown.Body>
            <Dropdown.SectionTitle>Section One</Dropdown.SectionTitle>
            <Dropdown.Item onClick={this.toggle} as="button">
              Open Modal
            </Dropdown.Item>
          </Dropdown.Body>

          <Dropdown.Footer>Footer</Dropdown.Footer>
        </Dropdown>

        <Modal
          open={this.state.isModalOpen}
          onClose={this.toggle}
          title="Example Dropdown Modal"
          {...props}>
          <Modal.Body>
            <>
              {body}
              <Input autoFocus name="password" label="Password" />
            </>
          </Modal.Body>

          <Modal.Footer>
            <Button.Group justifyContent="flex-end">
              <Button variant="grey" onClick={this.onCancel}>
                Cancel
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
