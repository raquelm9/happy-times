import React from "react"
import "./AddRestaurant.css"

class AddRestaurant extends React.Component {
    
    constructor(props){
        super(props);
        console.log(this.props)
    }

  render() {
    return (
        <div>
        <i className="plus square outline icon addRest"></i>
        </div>
    );
  }
}

export default AddRestaurant;