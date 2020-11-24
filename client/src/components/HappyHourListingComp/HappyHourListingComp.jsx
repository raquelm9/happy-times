import React from "react";
import { HttpService } from "../../services/http-service";
import { withRouter } from "react-router-dom";

class HappyHourListingComp extends React.Component {
  constructor(props) {
    super(props);

    const queryString = this.props.location.search;
    const urlParams = new URLSearchParams(queryString);
    const idRestaurant = urlParams.get("id");

    this.idRestaurant = idRestaurant;

    // this.deleteHappyHour = this.deleteHappyHour.bind(this);
  }

  //   deleteHappyHour(event) {
  //     //prevents the page to reroute to rest detail
  //     event.stopPropagation();

  //     const happyHour = this.props.happyHour;

  //     new HttpService()
  //       .removeHappyHour(this.idRestaurant, happyHour.id)
  //       .then(() => this.props.onDelete());
  //   }

  render() {
    return (
      <>
        <div className="restaurant-card">
          <p>Open Days: {this.props.happyHour.openDays.days}</p>
          <p>Start Time: {this.props.happyHour.startTime}</p>
          <p>End Time: {this.props.happyHour.endTime}</p>
        </div>
      </>
    );
  }
}

export default withRouter(HappyHourListingComp);
