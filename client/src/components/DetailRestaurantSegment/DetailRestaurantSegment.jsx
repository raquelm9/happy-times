import React from "react";
import { addressLabel } from "../../helpers/address";

class DetailRestaurantSegment extends React.Component {
  render() {
    return (
      <>
        <h3 className="ui header">Name:{this.props.restaurant.name}</h3>
        <h4 className="address">
          Address: {addressLabel(this.props.restaurant)}
        </h4>
        <p>
          Website:{" "}
          <a href={this.props.restaurant.website} target="_blank">
            {this.props.restaurant.website}
          </a>
        </p>

        <p>Description: {this.props.restaurant.description}</p>
      </>
    );
  }
}

export default DetailRestaurantSegment;
