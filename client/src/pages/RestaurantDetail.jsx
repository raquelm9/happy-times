import React from 'react'
import OneImage from '../components/OneImage/OneImage'
import Grid from '../components/Grid/Grid'
import { HttpService } from '../services/http-service'
import { withRouter } from 'react-router-dom'
import './RestaurantDetail.css'
import './RestaurantListing.css'
import Navbar from '../components/Navbar/Navbar'

class RestaurantDetail extends React.Component {
    constructor(props) {
        super(props)

        const queryString = this.props.location.search
        const urlParams = new URLSearchParams(queryString)
        const id = urlParams.get('id')

        this.id = id

        this.state = { restaurant: {} }
    }

    componentDidMount() {
        this.loadData()
    }

    loadData = () => {
        new HttpService().getRestaurantDetail(this.id).then(
            (data) => {
                this.setState({ restaurant: data })
            },
            (err) => {}
        )
    }

    render() {
        return (
            <div id="restaurant-detail">
                <Navbar></Navbar>

                <div className="restaurant-detail-background-color" />
                <div className="inner">
                    <OneImage image={this.state.restaurant.image} />
                    <Grid restaurant={this.state.restaurant} />
                </div>
            </div>
        )
    }
}

export default withRouter(RestaurantDetail)
