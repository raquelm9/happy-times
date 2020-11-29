import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import AdminItemForm from '../../AddItem/AdminItemForm'

export class AddItemModal extends React.Component {
    constructor(props) {
        super(props)

        this.state = { item: undefined }
    }

    render() {
        return (
            <Modal show={this.props.isOpen} onHide={this.props.onHide}>
                <Modal.Header>
                    <Modal.Title>Add Menu Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AdminItemForm
                        happyHourId={this.props.happyHourId}
                        item={this.props.item}
                        onItemUpdated={this.props.ondh}
                        adjItem={this.props.onAdded}
                    />
                </Modal.Body>
            </Modal>
        )
    }
}
