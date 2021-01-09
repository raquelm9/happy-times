import React from 'react'
import OneImage from '../components/OneImage/OneImage'
import Grid from '../components/Grid/Grid'
import { HttpService } from '../services/http-service'
import { withRouter } from 'react-router-dom'
import './RestaurantDetail.css'
import './RestaurantListing.css'
import Navbar from '../components/Navbar/Navbar'
import DetailCard from '../components/DetailCard/DetailCard'

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
        <div className="background"></div>
        <div className="restaurant-listing-container container-fluid">
          <div className="row">
            <div className="col-12">
              <DetailCard restaurant={this.state.restaurant}></DetailCard>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(RestaurantDetail)
