import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import AdminItemForm from '../../AddItem/AdminItemForm'

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
                    <AdminItemForm
                        onHide={this.props.onHide}
                        happyHourId={this.props.happyHourId}
                        item={this.props.item}
                        onAdded={this.props.onAdded}
                    />
                </Modal.Body>
            </Modal>
        )
    }
}
