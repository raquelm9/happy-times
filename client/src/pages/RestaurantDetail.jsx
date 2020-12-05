import React from 'react'
import OneImage from '../components/OneImage/OneImage'
import Grid from '../components/Grid/Grid'
import { HttpService } from '../services/http-service'
import { withRouter } from 'react-router-dom'
import './RestaurantDetail.css'
import './RestaurantListing.css'
import Diamond from '../assets/wood.jpg'

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
    goToMap() {
        this.props.history.push('/map/')
    }
    goToList() {
        this.props.history.push('/restaurants/')
    }

    render() {
        return (
            <>
                <div className="restaurant-detail-background-color">
                    <div
                        style={{
                            backgroundColor: '#121212',
                        }}
                    >
                        <ul className="nav justify-content-end">
                            <li
                                className="nav-item"
                                style={{
                                    marginTop: '5px',
                                }}
                            >
                                <i
                                    className="map icon restaurant-listing"
                                    onClick={this.goToMap.bind(this)}
                                ></i>
                            </li>
                            <li className="nav-item">
                                <i
                                    className="nav-link list alternate icon restaurant-listing"
                                    onClick={this.goToList.bind(this)}
                                ></i>
                            </li>
                        </ul>
                        <OneImage image={this.state.restaurant.image} />
                        <Grid restaurant={this.state.restaurant} />
                    </div>
                </div>
            </>
        )
    }
}

export default withRouter(RestaurantDetail)
