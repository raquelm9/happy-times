import React from "react";

class RestListingComp extends React.Component {
  constructor(props) {
    super(props);
  }

  addressLabel() {
    const restaurant = this.props.restaurant;
    const address = restaurant.address;

    return (
      address.unit +
      " " +
      address.street +
      ", " +
      address.city +
      ", " +
      address.province +
      " " +
      address.postalCode
    );
  }

  todaysHappyHour() {
    const restaurant = this.props.restaurant;
    const happyHours = restaurant.happyHours;

    //Getting current day of the week
    var day = new Date();
    var dayofWeek = day.getDay();

    //time for today's happyhour
    var happyHourFound;

    for (var i = 0; i < happyHours.length; i++) {
      var currentHappyHour = happyHours[i];

      var happyHourDays = currentHappyHour.openDays.days;

      for (var j = 0; j < happyHourDays.length; j++) {
        var happyHourDay = happyHourDays[j];

        if (dayofWeek === happyHourDay) {
          happyHourFound = currentHappyHour;
          break;
        }
      }
    }

    return happyHourFound;
  }

  timeHappyHour() {
    const happyHour = this.todaysHappyHour();

    if (!happyHour) {
      return "No Happy Hour For Today";
    } else {
      return happyHour.startTime + " - " + happyHour.endTime;
    }
  }

  categoryHappyHour() {
    const happyHour = this.todaysHappyHour();
    const categories = [];

    if (!happyHour) return "";

    happyHour.menu.items.forEach((item) => {
      if (!categories.includes(item.category)) {
        categories.push(item.category);
      }
    });

    return categories.join(" & ");
  }

  render() {
    const restaurant = this.props.restaurant;

    return (
      <>
        <p>Name Restaurant: {restaurant.name}</p>
        <p>Address: {this.addressLabel()}</p>
        <p>
          Happy Hour:<br></br>
          {this.timeHappyHour()}
        </p>
        <p>Category: {this.categoryHappyHour()}</p>
      </>
    );
  }
}

export default RestListingComp;
