import React from "react";
import DetailRestaurantSegment from "../DetailRestaurantSegment/DetailRestaurantSegment";
import HappyHourMenu from "../HappyHourMenu/HappyHourMenu";
import PaddedContainerSegment from "../PaddedContainerSegment/PaddedContainerSegment";

class Grid extends React.Component {
  render() {
    return (
      <div
        className="ui stackable two column grid"
        style={{ marginLeft: "5px", marginRight: "5px" }}
      >
        <div className="column">
          <div className="ui segment">
            <PaddedContainerSegment>
              <DetailRestaurantSegment restaurant={this.props.restaurant} />
            </PaddedContainerSegment>
          </div>
        </div>
        <div className="column">
          <div className="ui segment">
            <PaddedContainerSegment>
              <HappyHourMenu restaurant={this.props.restaurant} />
            </PaddedContainerSegment>
          </div>
        </div>
      </div>
    );
  }
}

export default Grid;
