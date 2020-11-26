import React from "react";
import { HttpService } from "../services/http-service";
import AdminItemForm from "../components/AdminItemForm/AdminItemForm";
import AddItem from "../components/AddItem/AddItem";

class AdminNewItem extends React.Component {
  constructor(props) {
    super(props);

    const queryString = this.props.location.search;
    const urlParams = new URLSearchParams(queryString);
    const restaurantId = urlParams.get("restaurantId");
    const happyHourId = urlParams.get("happyHourId");

    this.restaurantId = restaurantId;
    this.happyHourId = happyHourId;

    this.state = { item: undefined, isLoading: true };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    if (this.restaurantId !== null && this.happyHourId !== null) {
      new HttpService()
        .getRestaurantHappyHour(this.restaurantId, this.happyHourId)
        .then(
          (data) => {
            this.setState({ happyHour: data, isLoading: false });
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
        <AdminItemForm happyHour={this.state.happyHour}></AdminItemForm>
      </>
    );
  }
}

export default AdminNewItem;
