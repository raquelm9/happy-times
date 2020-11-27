import { withRouter } from "react-router-dom";
import React from "react";

class AddItem extends React.Component {
  constructor(props) {
    super(props);
    const queryString = this.props.location.search;
    const urlParams = new URLSearchParams(queryString);
    const restaurantId = urlParams.get("restaurantId");
    const happyHourId = urlParams.get("happyHourId");

    this.restaurantID = restaurantId;
    this.happyHourId = happyHourId;
  }

  addNewItem() {
    const data = {
      restaurantId: this.restaurantID,
      happyHourId: this.happyHourId,
    };

    const searchParams = new URLSearchParams(data);

    this.props.history.push({
      pathname: "/admin/restaurant/happy-hour/item/information",
      search: searchParams.toString(),
    });
  }

  render() {
    return (
      <div className="ui grid">
        <div className="twelve wide column"></div>
        <div className="four wide column">
          <i
            className="big plus square outline icon addHappyHour"
            onClick={this.addNewItem.bind(this)}
          ></i>
        </div>
      </div>
    );
  }
}

export default withRouter(AddItem);
