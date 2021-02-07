import React from 'react'
import { HttpService } from '../../services/http-service'
import { withRouter } from 'react-router-dom'
import { ConfirmDelete } from '../ConfirmDelete/ConfirmDelete'
import AdminNewHappyHour from '../../pages/AdminNewHappyHour/AdminNewHappyHour'

class HappyHourListingComp extends React.Component {
  constructor(props) {
    super(props)

    const queryString = this.props.location.search
    const urlParams = new URLSearchParams(queryString)
    const idRestaurant = urlParams.get('id')

    this.state = { isOpen: false }

    this.idRestaurant = idRestaurant
  }

  viewHappyHourForm() {
    const data = {
      restaurantId: this.idRestaurant,
      happyHourId: this.props.happyHour.id,
    }
    const searchParams = new URLSearchParams(data)

    this.props.history.push({
      pathname: '/admin/restaurant/happy-hour/information',
      search: searchParams.toString(),
    })
  }

  deleteHappyHour(event) {
    //prevents the page to reroute to rest detail
    event.stopPropagation()

    const happyHour = this.props.happyHour

    new HttpService()
      .removeHappyHour(this.idRestaurant, happyHour.id)
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
        <i></i>
      </div>
    )
  }

  weekDays = () => {
    const helper = {
      0: 'SUN ',
      1: 'MON ',
      2: 'TUE ',
      3: 'WED ',
      4: 'THU ',
      5: 'FRI ',
      6: 'SAT ',
    }
    const weekDays = this.props.happyHour.openDays.map((day) => (
      <span key={day}>{helper[day]}</span>
    ))
    return weekDays
  }

  render() {
    return (
      <>
        <div
          className="restaurant-card"
          onClick={this.viewHappyHourForm.bind(this)}
        >
          <p>Open Days: {this.weekDays()}</p>
          <p>Start Time: {this.props.happyHour.startTime}</p>
          <p>End Time: {this.props.happyHour.endTime}</p>
          <>{this.showCanDelete()}</>
        </div>
        <ConfirmDelete
          isOpen={this.state.isOpen}
          onCancel={this.closeModal.bind(this)}
          onConfirm={this.deleteHappyHour.bind(this)}
        ></ConfirmDelete>
      </>
    )
  }
}

export default withRouter(HappyHourListingComp)
