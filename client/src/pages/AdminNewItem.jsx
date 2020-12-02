// import React from "react";
// import { HttpService } from "../services/http-service";
// import AdminItemForm from "../components/AdminItemForm/AdminItemForm";

// class AdminNewItem extends React.Component {
//   constructor(props) {
//     super(props);

//     const queryString = this.props.location.search;
//     const urlParams = new URLSearchParams(queryString);
//     const restaurantId = urlParams.get("restaurantId");
//     const happyHourId = urlParams.get("happyHourId");
//     const itemId = urlParams.get("itemId");

//     this.restaurantId = restaurantId;
//     this.happyHourId = happyHourId;
//     this.itemId = itemId;

//     this.state = { item: undefined, isLoading: true };
//   }

//   componentDidMount() {
//     this.loadData();
//   }

//   loadData = () => {
//     if (
//       this.restaurantId !== null &&
//       this.happyHourId !== null &&
//       this.itemId !== null
//     ) {
//       new HttpService()
//         .getRestaurantItem(this.restaurantId, this.happyHourId, this.itemId)
//         .then(
//           (data) => {
//             this.setState({ item: data, isLoading: false });
//           },
//           (err) => {}
//         );
//     } else {
//       this.setState({ isLoading: false });
//     }
//   };

//   render() {
//     if (this.state.isLoading) return <p>Loading...</p>;

//     return (
//       <>
//         <AdminItemForm item={this.state.item}></AdminItemForm>
//       </>
//     );
//   }
// }

// export default AdminNewItem;
