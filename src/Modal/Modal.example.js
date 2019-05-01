import React from 'react';
import Modal from './Modal';
import Button from '../Button';
import Input from '../Form/Input';

export default class ModalDemo extends React.Component {
  state = {
    isModalOpen: false,
    isModalTwoOpen: false,
  };

  toggle = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen, isModalTwoOpen: false });
  };

  toggleModalTwo = () => {
    this.setState({ isModalTwoOpen: !this.state.isModalTwoOpen });
  };

  onCancel = () => {
    this.toggle();

    setTimeout(() => {
      alert('Oh no! It has been canceled.');
    }, 500);
  };

  render() {
    const { body, bodyTwo = 'Im a nested modal!', ...props } = this.props;

    return (
      <div>
        <Button onClick={this.toggle}>Open Modal</Button>

        <Modal
          open={this.state.isModalOpen}
          onClose={this.toggle}
          title="Example Modal"
          {...props}>
          <Modal.Body>
            <>
              {body}
              <Input autoFocus name="password" label="Password" />
            </>

            <Modal
              open={this.state.isModalTwoOpen}
              onClose={this.toggleModalTwo}
              title="Example Modal Two"
              {...props}>
              <Modal.Body>{bodyTwo}</Modal.Body>

              <Modal.Footer>
                <Button.Group justifyContent="flex-end">
                  <Button variant="gray" onClick={this.toggleModalTwo}>
                    Cancel
                  </Button>
                  <Button variant="success" onClick={this.toggleModalTwo}>
                    I&apos;m Done Anyways
                  </Button>
                </Button.Group>
              </Modal.Footer>
            </Modal>
          </Modal.Body>

          <Modal.Footer>
            <Button.Group justifyContent="flex-end">
              <Button variant="gray" onClick={this.onCancel}>
                Cancel
              </Button>
              <Button variant="success" onClick={this.toggleModalTwo}>
                Open Another Modal
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
