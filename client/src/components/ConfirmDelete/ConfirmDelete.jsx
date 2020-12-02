import React from "react";
import { Modal, Button } from "react-bootstrap";

export class ConfirmDelete extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Modal show={this.props.isOpen}>
        <Modal.Header>
          <Modal.Title>Delete Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="alert alert-danger" role="alert">
            Are you sure you want to permanently delete this record?
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.onCancel}>
            Close
          </Button>
          <Button variant="danger" onClick={this.props.onConfirm}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
