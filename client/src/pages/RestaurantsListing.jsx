import React from 'react'
import { HttpService } from '../services/http-service'
import RestListingComp from '../components/RestListingComp/RestListingComp'
import { withRouter } from 'react-router-dom'
import './RestaurantListing.css'
import Navbar from '../components/Navbar/Navbar'

class RestaurantsListing extends React.Component {
  constructor(props) {
    super(props)

    this.state = { restaurants: [], isLoading: true }
  }

  componentDidMount() {
    this.loadData()
  }

  loadData = () => {
    new HttpService().getRestaurants().then(
      (data) => {
        this.setState({ restaurants: data, isLoading: false })
      },
      (err) => {}
    )
  }

  buildRestaurantsCard = (restaurant) => {
    return <RestListingComp key={restaurant.id} restaurant={restaurant} />
  }

  showLoadingOrRestaurants = () => {
    if (this.state.isLoading) {
      return (
        <>
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-light" role="status">
              <span className="sr-only">Loading</span>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <p className="loading-info">
                Please wait ... our server is starting
              </p>
            </div>
          </div>
        </>
      )
    } else {
      return (
        <>
          <div className="row">
            <div className="col-12">
              {this.state.restaurants.map(this.buildRestaurantsCard)}
            </div>
          </div>
        </>
      )
    }
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
          {this.showLoadingOrRestaurants()}
        </div>
      </>
    )
  }
}

export default withRouter(RestaurantsListing)
