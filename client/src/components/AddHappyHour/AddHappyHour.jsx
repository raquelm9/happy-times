import React from 'react'
import './AddHappyHour.css'
import { withRouter } from 'react-router-dom'

class AddHappyHour extends React.Component {
    constructor(props) {
        super(props)
        const queryString = this.props.location.search
        const urlParams = new URLSearchParams(queryString)
        const idRestaurant = urlParams.get('id')

        this.idRestaurant = idRestaurant
    }

    addNewHappyHour() {
        this.props.history.push({
            pathname: '/admin/restaurant/happy-hour/information',
            search: 'restaurantId=' + this.idRestaurant,
        })
    }

    render() {
        return (
            <>
                <i
                    className="big plus square outline icon addHappyHour"
                    onClick={this.addNewHappyHour.bind(this)}
                ></i>
            </>
        )
    }
}

export default withRouter(AddHappyHour)
