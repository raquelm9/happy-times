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

  weekDays = () => {
    const helper = {
      0: "SUN",
      1: "MON",
      2: "TUE",
      3: "WED",
      4: "THU",
      5: "FRI",
      6: "SAT",
    };
    const weekDays = this.props.happyHour.openDays.days.map((day) => (
      <span key={day}>{helper[day]}</span>
    ));
    return weekDays;
  };

  render() {
    return (
      <>
        <div className="restaurant-card">
          {this.weekDays()}
          <p>Start Time: {this.props.happyHour.startTime}</p>
          <p>End Time: {this.props.happyHour.endTime}</p>
        </div>
      </>
    );
  }
}

export default withRouter(HappyHourListingComp);
