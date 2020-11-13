import React from "react";
import { withRouter } from "react-router-dom";
import { todaysHappyHour } from "../../helpers/happy_hour";
import { addressLabel } from "../../helpers/address";

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

  render() {
    const restaurant = this.props.restaurant;

    return (
      <div className="restaurant-card" onClick={this.viewHappyHour.bind(this)}>
        <p>Name Restaurant: {restaurant.name}</p>
        <p>Address: {addressLabel(restaurant)}</p>
        <p>
          Happy Hour:<br></br>
          {this.timeHappyHour()}
        </p>
        <p>Category: {this.categoryHappyHour()}</p>
      </div>
    );
  }
}

export default withRouter(RestListingComp);
