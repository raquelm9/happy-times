import React from "react";
import "./HappyHourItem.css";

class HappyHourItem extends React.Component {
  constructor(props) {
    super(props);
  }

  renderItem() {
    return (
      <>
        Name: {this.props.item.name} -{" "}
        <span className="item-price">${this.props.item.price}</span>
        <p>Description: {this.props.item.description}</p>
      </>
    );
  }

  render() {
    return <div className="menu-item">{this.renderItem()}</div>;
  }
}

export default HappyHourItem;
