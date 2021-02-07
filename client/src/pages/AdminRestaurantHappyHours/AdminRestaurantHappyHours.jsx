import React from 'react'
import { HttpService } from '../../services/http-service'
import PaddedContainerSegment from '../../components/PaddedContainerSegment/PaddedContainerSegment'
import AddHappyHour from '../../components/AddHappyHour/AddHappyHour'
import HappyHourListingComp from '../../components/HappyHourListingComp/HappyHourListingComp'
import { withRouter } from 'react-router-dom'
import '../AdminRestaurants/AdminRestaurants.css'

class AdminRestaurantHappyHours extends React.Component {
  constructor(props) {
    super(props)

    const queryString = this.props.location.search
    const urlParams = new URLSearchParams(queryString)
    const id = urlParams.get('id')

    this.id = id

    this.state = { restaurant: undefined, isLoading: true }
  }

  componentDidMount() {
    this.loadData()
  }

  mainAdminPage() {
    this.props.history.push('/admin/restaurants')
  }

  loadData = () => {
    if (this.id !== null) {
      new HttpService().getRestaurantDetail(this.id).then(
        (data) => {
          this.setState({ restaurant: data, isLoading: false })
        },
        (err) => {}
      )
    } else {
      this.setState({ isLoading: false })
    }
  }

  buildHappyHours = () => {
    const list = this.state.restaurant.happyHours.map((happyHour) => (
      <div className="row" key={happyHour.id}>
        <div className="column">
          <PaddedContainerSegment>
            <HappyHourListingComp
              happyHour={happyHour}
              onDelete={this.loadData.bind(this)}
            />
          </PaddedContainerSegment>
        </div>
      </div>
    ))

    return list
  }

  render() {
    if (this.state.isLoading) return <p>Loading...</p>

    return (
      <div>
        <div>
          <p className="admin-access">Admin Access</p>
        </div>
        <div>
          <p className="admin-restaurants-title">
            Happy Hour<br></br>
            {this.state.restaurant.name}
          </p>
        </div>

        <div className="ui stackable one column padded grid">
          {this.buildHappyHours()}
        </div>
        <div className="row">
          <div className="col-lg-8"></div>
          <div className="col-lg-4 buttom-admin-happy-hour">
            <button
              type="button"
              className="btn btn-secondary back-to-restaurants"
              onClick={this.mainAdminPage.bind(this)}
            >
              Restaurants
            </button>
            <AddHappyHour></AddHappyHour>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(AdminRestaurantHappyHours)
