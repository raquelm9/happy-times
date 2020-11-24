import React from "react";
import "./AddHappyHour.css";
import { withRouter } from "react-router-dom";

class AddHappyHour extends React.Component {
  constructor(props) {
    super(props);
  }

  addNewHappyHour() {
    this.props.history.push("/admin/restaurant/happy-hour/information");
  }

  render() {
    return (
      <div className="ui grid">
        <div className="twelve wide column"></div>
        <div className="four wide column">
          <i
            className="big plus square outline icon addHappyHour"
            onClick={this.addNewHappyHour.bind(this)}
          ></i>
        </div>
      </div>
    );
  }
}

export default withRouter(AddHappyHour);
