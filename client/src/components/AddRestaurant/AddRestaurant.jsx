import React from "react";
import "./AddRestaurant.css";

class AddRestaurant extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="ui grid">
        <div className="twelve wide column"></div>
        <div className="four wide column">
          <i className="big plus square outline icon addRest"></i>
        </div>
      </div>
    );
  }
}

export default AddRestaurant;
