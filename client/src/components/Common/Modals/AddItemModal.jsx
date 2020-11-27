import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import AddItemForm from '../../AddItem/AdminItemForm'

export class AddItemModal extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Modal show={this.props.isOpen} onHide={this.props.onHide}>
                <Modal.Header>
                    <Modal.Title>Add Menu Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddItemForm item={this.props.item} />
                </Modal.Body>
            </Modal>
        )
    }
}
