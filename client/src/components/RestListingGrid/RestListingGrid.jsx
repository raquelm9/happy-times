import React from "react";

class RestListingGrid extends React.Component {
  render() {
    return (
      <div className="ui stackable one column padded grid">
        <>{this.restaurantList()}</>
      </div>
    );
  }
}

export default RestListingGrid;
