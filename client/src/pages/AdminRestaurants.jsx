import React from "react";
import RestaurantsListing from "../pages/RestaurantsListing";

class AdminRestaurants extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <h1>Admin Access</h1>
        <RestaurantsListing canDelete={true}></RestaurantsListing>
      </>
    );
  }
}

export default AdminRestaurants;
