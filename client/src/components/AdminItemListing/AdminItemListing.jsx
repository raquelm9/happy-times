import React from "react";
import { itemsByCategory } from "../../helpers/happy_hour";
import HappyHourItem from "../../components/HappyHourMenu/HappyHourItem";
import { HttpService } from "../../services/http-service";
import { withRouter } from "react-router-dom";

class AdminItemListing extends React.Component {
  constructor(props) {
    super(props);

    const queryString = this.props.location.search;
    const urlParams = new URLSearchParams(queryString);
    const restaurantId = urlParams.get("restaurantId");
    const happyHourId = urlParams.get("happyHourId");

    this.restaurantId = restaurantId;
    this.happyHourId = happyHourId;

    this.state = {
      happyHourItems: props.items,
    };
  }

  loadHappyHour() {
    return new HttpService()
      .getRestaurantHappyHour(this.restaurantId, this.happyHourId)
      .then((updatedHappyHour) =>
        this.setState({ happyHourItems: updatedHappyHour.menu.items })
      );
  }

  renderItems() {
    const items = this.state.happyHourItems;

    if (!items) {
      return [];
    }

    const categorizedItems = itemsByCategory(items);

    return (
      <>
        {categorizedItems.food.length > 0 ? (
          <div className="menu-category">
            {this.renderItemsWithCategory("Food", categorizedItems.food)}
          </div>
        ) : null}
        {categorizedItems.drink.length > 0 ? (
          <div className="menu-category">
            {this.renderItemsWithCategory("Drinks", categorizedItems.drink)}
          </div>
        ) : null}
      </>
    );
  }

  renderItemsWithCategory(categoryName, items) {
    return (
      <>
        <h4>{categoryName}</h4>
        {items.map((item) => (
          <HappyHourItem
            item={item}
            key={item.id}
            admin={true}
            onDelete={this.loadHappyHour.bind(this)}
          />
        ))}
      </>
    );
  }

  render() {
    return <>{this.renderItems()}</>;
  }
}

export default withRouter(AdminItemListing);
