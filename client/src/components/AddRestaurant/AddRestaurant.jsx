import React from "react";
import "./AddRestaurant.css";
import { withRouter } from "react-router-dom";

class AddRestaurant extends React.Component {
  constructor(props) {
    super(props);
  }

  addNewRestaurant() {
    this.props.history.push("/admin/restaurant/information");
  }

  render() {
    return (
      <div className="ui grid">
        <div className="twelve wide column"></div>
        <div className="four wide column">
          <i
            className="big plus square outline icon addRest"
            onClick={this.addNewRestaurant.bind(this)}
          ></i>
        </div>
      </div>
    );
  }
}

export default withRouter(AddRestaurant);
