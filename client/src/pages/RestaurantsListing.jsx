import React from 'react'
import { HttpService } from '../services/http-service'
import RestListingComp from '../components/RestListingComp/RestListingComp'
import { withRouter } from 'react-router-dom'
import './RestaurantListing.css'
import Navbar from '../components/Navbar/Navbar'

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
        <Navbar></Navbar>
        <div className="restaurant-listing-container container-fluid">
          <div className="row">
            <div className="col-12">
              <h1 className="restaurants-title">Restaurants Listing</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              {this.state.restaurants.map(this.buildRestaurantsCard)}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default withRouter(RestaurantsListing)
