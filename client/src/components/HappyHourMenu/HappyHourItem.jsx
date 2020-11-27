import React from 'react'
import './HappyHourItem.css'
import PaddedContainerSegment from '../PaddedContainerSegment/PaddedContainerSegment'
import { ConfirmDelete } from '../ConfirmDelete/ConfirmDelete'
import { HttpService } from '../../services/http-service'
import { withRouter } from 'react-router-dom'

class HappyHourItem extends React.Component {
    constructor(props) {
        super(props)
        const queryString = this.props.location.search
        const urlParams = new URLSearchParams(queryString)
        const restaurantId = urlParams.get('restaurantId')
        const happyHourId = urlParams.get('happyHourId')

        this.restaurantId = restaurantId
        this.happyHourId = happyHourId

        this.state = { isOpen: false }
    }

    openModal(event) {
        //prevents the page to reroute to rest detail
        event.stopPropagation()

        this.setState({ isOpen: true })
    }

    closeModal() {
        this.setState({ isOpen: false })
    }

    showCanDelete() {
        return (
            <div className="deleteButton">
                <i
                    className="trash alternate icon"
                    onClick={this.openModal.bind(this)}
                ></i>
            </div>
        )
    }

    viewItemForm() {
        const data = {
            restaurantId: this.restaurantId,
            happyHourId: this.happyHourId,
            itemId: this.props.item.id,
        }
        const searchParams = new URLSearchParams(data)

        this.props.history.push({
            pathname: '/admin/restaurant/happy-hour/item/information',
            search: searchParams.toString(),
        })
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
            .then(() => this.setState({ isOpen: false }))
            .then(() => this.props.onDelete())
    }

    itemContainer() {
        if (this.props.admin) {
            return (
                <>
                    <PaddedContainerSegment
                        onClick={this.viewItemForm.bind(this)}
                    >
                        <div className="menu-item">{this.renderItem()}</div>
                        <div>{this.showCanDelete()}</div>
                    </PaddedContainerSegment>
                    <ConfirmDelete
                        isOpen={this.state.isOpen}
                        onCancel={this.closeModal.bind(this)}
                        onConfirm={this.deleteItem.bind(this)}
                    ></ConfirmDelete>
                </>
            )
        } else {
            return <div className="menu-item">{this.renderItem()}</div>
        }
    }

    render() {
        return <>{this.itemContainer()}</>
    }
}

export default withRouter(HappyHourItem)
