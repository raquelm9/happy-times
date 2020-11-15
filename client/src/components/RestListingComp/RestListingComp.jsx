import React from "react";
import { withRouter } from "react-router-dom";
import { todaysHappyHour } from "../../helpers/happy_hour";
import { addressLabel } from "../../helpers/address";
import { HttpService } from "../../services/http-service";

import "./RestListingComp.css";

class RestListingComp extends React.Component {
  constructor(props) {
    super(props);
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

    this.props.history.push({
      pathname: "/restaurant/happy-hour",
      search: "id=" + restaurant.id,
    });
  }

  deleteRest(event) {
    //prevents the page to reroute to rest detail
    event.stopPropagation();

    const restaurant = this.props.restaurant;

    console.log(this.props.onDelete);

    new HttpService()
      .removeRestaurant(restaurant.id)
      .then(() => this.props.onDelete());
  }

  showCanDelete() {
    if (this.props.canDelete) {
      return (
        <div className="deleteButton">
          <i
            className="trash alternate icon"
            onClick={this.deleteRest.bind(this)}
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
      <div className="restaurant-card" onClick={this.viewHappyHour.bind(this)}>
        <p>Restaurant Name: {restaurant.name}</p>
        <p>Address: {addressLabel(restaurant)}</p>
        <>{this.showCanDelete()}</>
      </div>
    );
  }
}

export default withRouter(RestListingComp);
