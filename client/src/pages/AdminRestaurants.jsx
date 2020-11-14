import React from "react";
import RestaurantsListing  from "../pages/RestaurantsListing";


class AdminRestaurants extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
       <RestaurantsListing canDelete={true}></RestaurantsListing>
      </>
    );
  }
}

export default AdminRestaurants;
