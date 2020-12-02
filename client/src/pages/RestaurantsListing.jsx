import React from 'react'
import { HttpService } from '../services/http-service'
import RestListingComp from '../components/RestListingComp/RestListingComp'
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

    buildRestaurantsCard = (restaurant) => {
        return <RestListingComp key={restaurant.id} restaurant={restaurant} />
    }

    render() {
        return (
            <>
                <section
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
                </section>
            </>
        )
    }
}

export default RestaurantsListing
