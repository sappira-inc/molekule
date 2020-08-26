import React from 'react';
import { Modal } from './Modal';
import { Button } from '../Button';
import { Input } from '../Form/Input';

export default class ModalNoAutoFocusExample extends React.Component<any> {
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
      // eslint-disable-next-line no-alert
      alert('Oh no! It has been canceled.');
    }, 500);
  };

  render() {
    const { body, bodyTwo = 'Im a nested modal!', ...props } = this.props;

    return (
      <div>
        <Button onClick={this.toggle}>Open Modal</Button>

        <Modal open={this.state.isModalOpen} onClose={this.toggle} title="Example Modal" {...props}>
          <Modal.Body>
            <>
              {body}
              <Input name="password" label="Password" />
            </>

            <Modal open={this.state.isModalTwoOpen} onClose={this.toggleModalTwo} title="Example Modal Two" {...props}>
              <Modal.Body>{bodyTwo}</Modal.Body>

              <Modal.Footer>
                <Button.Group justifyContent="space-between">
                  <Button variant="grey" onClick={this.toggleModalTwo}>
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
            <Button.Group justifyContent="space-between">
              <Button variant="grey" onClick={this.onCancel}>
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
