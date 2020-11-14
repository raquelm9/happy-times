import React from "react";
import { HttpService } from "../services/http-service";
import RestListingComp from "../components/RestListingComp/RestListingComp";
import PaddedContainerSegment from "../components/PaddedContainerSegment/PaddedContainerSegment";
import AddRestaurant from "../components/AddRestaurant/AddRestaurant"

class RestaurantsListing extends React.Component {
  constructor(props) {
    super(props);

    const canDelete= this.props.canDelete;
  
    this.state = { restaurants: [] };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    new HttpService().getRestaurants().then(
      (data) => {
        this.setState({ restaurants: data });
      },
      (err) => {}
    );
  };


  buildRestaurants = () => {
    const list = this.state.restaurants.map((restaurant) => (
      <div className="row" key={restaurant.id}>
        <div className="column">
          <PaddedContainerSegment>
            <RestListingComp restaurant={restaurant} canDelete={this.props.canDelete}/>
          </PaddedContainerSegment>
        </div>
      </div>
    ));

    return list;
  };


  
  render() {
    return (
      <>
        <div className="ui stackable one column padded grid">
          {this.buildRestaurants()}
        </div>
        <AddRestaurant canDelete={this.props.canDelete}></AddRestaurant>
      </>
    );
  }
}

export default RestaurantsListing;
