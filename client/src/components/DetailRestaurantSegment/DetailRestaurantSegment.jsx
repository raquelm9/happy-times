import React from "react";

class DetailRestaurantSegment extends React.Component {
  render() {
    return (
      <>
        <h3 className="ui header">Name :</h3>
        <h4 className="address">Address: </h4>
        <a href="www.google.ca" target="_blank">
          Link:{" "}
        </a>
        <p>Description</p>
      </>
    );
  }
}

export default DetailRestaurantSegment;
