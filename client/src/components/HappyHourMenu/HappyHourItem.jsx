import React from 'react'
import './HappyHourItem.css'
import PaddedContainerSegment from '../PaddedContainerSegment/PaddedContainerSegment'
import { ConfirmDelete } from '../ConfirmDelete/ConfirmDelete'
import { HttpService } from '../../services/http-service'
import { withRouter } from 'react-router-dom'
import { AddItemModal } from '../Common/Modals/AddItemModal'

class HappyHourItem extends React.Component {
    constructor(props) {
        super(props)
        const queryString = this.props.location.search
        const urlParams = new URLSearchParams(queryString)
        const restaurantId = urlParams.get('restaurantId')
        const happyHourId = urlParams.get('happyHourId')

        this.restaurantId = restaurantId
        this.happyHourId = happyHourId

        this.state = { confirmingDelete: false, updatingItem: false }
    }

    openConfirmDeleteModal(event) {
        //prevents the page to reroute to rest detail
        event.stopPropagation()
        this.setState({ confirmingDelete: true })
    }

    closeDeleteModal() {
        this.setState({ confirmingDelete: false })
    }

    openUpdateItemModal() {
        this.setState({ updatingItem: true })
    }

    closeUpdatingModal() {
        this.setState({ updatingItem: false })
    }

    showCanDelete() {
        return (
            <div className="deleteButton">
                <i
                    className="trash alternate icon"
                    onClick={this.openConfirmDeleteModal.bind(this)}
                ></i>
            </div>
        )
    }

    renderItem() {
        return (
            <>
                Name: {this.props.item.name} -{' '}
                <span className="item-price">${this.props.item.price}</span>
                <p>Description: {this.props.item.description}</p>
            </>
        )
    }

    deleteItem(event) {
        //prevents the page to reroute to rest detail
        event.stopPropagation()

        const restaurantId = this.restaurantId
        const happyHourId = this.happyHourId
        const itemId = this.props.item.id

        new HttpService()
            .removeItem(restaurantId, happyHourId, itemId)
            .then(() => this.setState({ confirmingDelete: false }))
            .finally(() => this.props.onDelete())
    }

    itemContainer() {
        if (this.props.admin) {
            return (
                <>
                    <PaddedContainerSegment
                        itemContainer={true}
                        onClick={this.openUpdateItemModal.bind(this)}
                    >
                        <div className="menu-item">{this.renderItem()}</div>
                        <div>{this.showCanDelete()}</div>
                    </PaddedContainerSegment>
                    <ConfirmDelete
                        isOpen={this.state.confirmingDelete}
                        onCancel={this.closeDeleteModal.bind(this)}
                        onConfirm={this.deleteItem.bind(this)}
                    ></ConfirmDelete>
                </>
            )
        } else {
            return <div className="menu-item">{this.renderItem()}</div>
        }
    }

    render() {
        return (
            <>
                {this.itemContainer()}
                <AddItemModal
                    isOpen={this.state.updatingItem}
                    onHide={this.closeUpdatingModal.bind(this)}
                    item={this.props.item}
                    adjItem={this.props.adjItem}
                />
            </>
        )
    }
}

export default withRouter(HappyHourItem)
