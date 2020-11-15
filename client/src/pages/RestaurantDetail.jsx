import React from "react";
import OneImage from "../components/OneImage/OneImage";
import Grid from "../components/Grid/Grid";
import { HttpService } from "../services/http-service";

class RestaurantDetail extends React.Component {
  constructor(props) {
    super(props);

    const queryString = this.props.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");

    this.id = id;

    this.state = { restaurant: {} };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    new HttpService().getRestaurantDetail(this.id).then(
      (data) => {
        this.setState({ restaurant: data });
      },
      (err) => {}
    );
  };

  render() {
    return (
      <div>
        <OneImage image={this.state.restaurant.image} />
        <Grid restaurant={this.state.restaurant} />
      </div>
    );
  }
}

export default RestaurantDetail;
