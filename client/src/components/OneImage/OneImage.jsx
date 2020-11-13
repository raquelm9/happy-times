import React from "react";
import "../OneImage/OneImage.css";

class OneImage extends React.Component {
  render() {
    return (
      <img
        className="ui fluid centered rounded image"
        id="photo"
        src={this.props.image}
        alt="bar"
      />
    );
  }
}

export default OneImage;
