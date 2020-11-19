import React from "react";
import { withRouter } from "react-router-dom";
import { todaysHappyHour } from "../../helpers/happy_hour";
import { addressLabel } from "../../helpers/address";
import { HttpService } from "../../services/http-service";
import { ConfirmDelete } from "../ConfirmDelete/ConfirmDelete";

import "./RestListingComp.css";

class RestListingComp extends React.Component {
  constructor(props) {
    super(props);
    this.deleteRest = this.deleteRest.bind(this);
    this.state = { isOpen: false };
  }

  timeHappyHour() {
    const happyHour = todaysHappyHour(this.props.restaurant);

    if (!happyHour) {
      return "No Happy Hour For Today";
    } else {
      return happyHour.startTime + " - " + happyHour.endTime;
    }
  }

  categoryHappyHour() {
    const happyHour = todaysHappyHour(this.props.restaurant);
    const categories = [];

    if (!happyHour) return "";

    happyHour.menu.items.forEach((item) => {
      if (!categories.includes(item.category)) {
        categories.push(item.category);
      }
    });

    return categories.join(" & ");
  }

  viewHappyHour() {
    const restaurant = this.props.restaurant;

    if (this.props.canDelete) {
      this.props.history.push({
        pathname: "/admin/restaurant/information",
        search: "id=" + restaurant.id,
      });
    } else {
      this.props.history.push({
        pathname: "/restaurant/happy-hour",
        search: "id=" + restaurant.id,
      });
    }
  }

  deleteRest(event) {
    //prevents the page to reroute to rest detail
    event.stopPropagation();

    const restaurant = this.props.restaurant;

    new HttpService()
      .removeRestaurant(restaurant.id)
      .then(() => this.props.onDelete());
  }

  openModal(event) {
    //prevents the page to reroute to rest detail
    event.stopPropagation();

    this.setState({ isOpen: true });
  }

  closeModal() {
    this.setState({ isOpen: false });
  }

  showCanDelete() {
    if (this.props.canDelete) {
      return (
        <div className="deleteButton">
          <i
            className="trash alternate icon"
            onClick={this.openModal.bind(this)}
          ></i>
        </div>
      );
    } else {
      return (
        <p>
          Happy Hour:<br></br>
          {this.timeHappyHour()}
        </p>
      );
    }
  }

  render() {
    const restaurant = this.props.restaurant;

    return (
      <>
        <div
          className="restaurant-card"
          onClick={this.viewHappyHour.bind(this)}
        >
          <p>Restaurant Name: {restaurant.name}</p>
          <p>Address: {addressLabel(restaurant)}</p>
          <>{this.showCanDelete()}</>
        </div>
        <ConfirmDelete
          isOpen={this.state.isOpen}
          onCancel={this.closeModal.bind(this)}
          onConfirm={this.deleteRest.bind(this)}
        ></ConfirmDelete>
      </>
    );
  }
}

export default withRouter(RestListingComp);
