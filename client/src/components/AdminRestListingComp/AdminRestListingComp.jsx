import React from 'react'
import { withRouter } from 'react-router-dom'
import { addressLabel } from '../../helpers/address'
import { HttpService } from '../../services/http-service'
import { ConfirmDelete } from '../ConfirmDelete/ConfirmDelete'

import './AdminRestListingComp.css'

class RestListingComp extends React.Component {
    constructor(props) {
        super(props)
        this.deleteRest = this.deleteRest.bind(this)
        this.state = { isOpen: false }
    }

    viewHappyHour() {
        const restaurant = this.props.restaurant

        this.props.history.push({
            pathname: '/admin/restaurant/information',
            search: 'id=' + restaurant.id,
        })
    }

    deleteRest(event) {
        //prevents the page to reroute to rest detail
        event.stopPropagation()

        const restaurant = this.props.restaurant

        new HttpService()
            .removeRestaurant(restaurant.id)
            .then(() => this.props.onDelete())
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

    render() {
        const restaurant = this.props.restaurant

        return (
            <>
                <div
                    className="restaurant-card"
                    onClick={this.viewHappyHour.bind(this)}
                >
                    <p className="restListingCompName">{restaurant.name}</p>
                    <p>Address: {addressLabel(restaurant)}</p>
                    <>{this.showCanDelete()}</>
                </div>
                <ConfirmDelete
                    isOpen={this.state.isOpen}
                    onCancel={this.closeModal.bind(this)}
                    onConfirm={this.deleteRest.bind(this)}
                ></ConfirmDelete>
            </>
        )
    }
}

export default withRouter(RestListingComp)
