import React from "react";
import {
  todaysHappyHour,
  timeHappyHour,
  itemsByCategory,
} from "../../helpers/happy_hour";
import HappyHourItem from "./HappyHourItem";

class HappyHourMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  renderItems() {
    const happyHour = todaysHappyHour(this.props.restaurant);

    if (!happyHour) {
      return [];
    }

    const categorizedItems = itemsByCategory(happyHour.menu.items);

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
          <HappyHourItem item={item} key={item.id} />
        ))}
      </>
    );
  }

  render() {
    return (
      <>
        <h2 className="ui header centered">Happy Hour Menu</h2>
        <h3 className="ui header centered">
          {timeHappyHour(this.props.restaurant)}
        </h3>
        {this.renderItems()}
      </>
    );
  }
}

export default HappyHourMenu;
