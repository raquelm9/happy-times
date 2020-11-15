import React from "react";
import { HttpService } from "../services/http-service";
import RestListingComp from "../components/RestListingComp/RestListingComp";
import PaddedContainerSegment from "../components/PaddedContainerSegment/PaddedContainerSegment";
import AddRestaurant from "../components/AddRestaurant/AddRestaurant";

class RestaurantsListing extends React.Component {
  constructor(props) {
    super(props);

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
            <RestListingComp
              restaurant={restaurant}
              onDelete={this.loadData.bind(this)}
              canDelete={this.props.canDelete}
            />
          </PaddedContainerSegment>
        </div>
      </div>
    ));

    return list;
  };

  showAddRestaurant() {
    if (this.props.canDelete) {
      return <AddRestaurant></AddRestaurant>;
    }
  }

  render() {
    return (
      <>
        <div className="ui stackable one column padded grid">
          {this.buildRestaurants()}
        </div>
        {this.showAddRestaurant()}
      </>
    );
  }
}

export default RestaurantsListing;
