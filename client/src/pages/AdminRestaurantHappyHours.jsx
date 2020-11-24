import React from "react";
import { HttpService } from "../services/http-service";
import PaddedContainerSegment from "../components/PaddedContainerSegment/PaddedContainerSegment";
import AddHappyHour from "../components/AddHappyHour/AddHappyHour";
import HappyHourListingComp from "../components/HappyHourListingComp/HappyHourListingComp";

class AdminRestaurantHappyHours extends React.Component {
  constructor(props) {
    super(props);

    const queryString = this.props.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");

    this.id = id;

    this.state = { restaurant: undefined, isLoading: true };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    if (this.id !== null) {
      new HttpService().getRestaurantDetail(this.id).then(
        (data) => {
          this.setState({ restaurant: data, isLoading: false });
        },
        (err) => {}
      );
    } else {
      this.setState({ isLoading: false });
    }
  };

  buildHappyHours = () => {
    const list = this.state.restaurant.happyHours.map((happyHour) => (
      <div className="row" key={happyHour.id}>
        <div className="column">
          <PaddedContainerSegment>
            <HappyHourListingComp
              happyHour={happyHour}
              onDelete={this.loadData.bind(this)}
            />
          </PaddedContainerSegment>
        </div>
      </div>
    ));

    return list;
  };

  render() {
    if (this.state.isLoading) return <p>Loading...</p>;

    return (
      <>
        <h1>Admin Access</h1>
        <h2>{this.state.restaurant.name} Happy Hour</h2>
        <div className="ui stackable one column padded grid">
          {this.buildHappyHours()}
        </div>
        <AddHappyHour></AddHappyHour>
      </>
    );
  }
}

export default AdminRestaurantHappyHours;
