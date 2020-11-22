import React from "react";
import { HttpService } from "../services/http-service";
import AddRestaurantForm from "../components/AdminRestaurantForm/AdminRestaurantForm";

class AdminNewRestaurant extends React.Component {
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

  render() {
    if (this.state.isLoading) return <p>Loading...</p>;

    return (
      <>
        <AddRestaurantForm
          restaurant={this.state.restaurant}
        ></AddRestaurantForm>
      </>
    );
  }
}

export default AdminNewRestaurant;
