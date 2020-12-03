import React from 'react'
import { HttpService } from '../services/http-service'
import RestListingComp from '../components/RestListingComp/RestListingComp'
import { withRouter } from 'react-router-dom'
import './RestaurantListing.css'

class RestaurantsListing extends React.Component {
    constructor(props) {
        super(props)

        this.state = { restaurants: [] }
    }

    componentDidMount() {
        this.loadData()
    }

    loadData = () => {
        new HttpService().getRestaurants().then(
            (data) => {
                this.setState({ restaurants: data })
            },
            (err) => {}
        )
    }

    goToMap() {
        this.props.history.push('/map/')
    }

    buildRestaurantsCard = (restaurant) => {
        return <RestListingComp key={restaurant.id} restaurant={restaurant} />
    }

    render() {
        return (
            <>
                <div
                    style={{
                        backgroundColor: '#121212',
                    }}
                >
                    <ul className="nav justify-content-end">
                        <li className="nav-item">
                            <i
                                className="map icon restaurant-listing"
                                onClick={this.goToMap.bind(this)}
                            ></i>
                        </li>
                    </ul>
                </div>
                <div
                    className="row"
                    style={{
                        backgroundColor: '#121212',
                    }}
                >
                    <div className="col-12">
                        <h1 className="restaurants-title">Restaurants</h1>
                        <div className="row">
                            <div className="col-12">
                                {this.state.restaurants.map(
                                    this.buildRestaurantsCard
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default withRouter(RestaurantsListing)
