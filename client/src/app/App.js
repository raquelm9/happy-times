import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

//Pages
import MainPage from "../pages/MainPage";
import RestaurantDetail from "../pages/RestaurantDetail";
import RestaurantsListing from "../pages/RestaurantsListing";
import Map from "../pages/Map";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/restaurants" component={RestaurantsListing} />
          <Route
            exact
            path="/restaurant/happy-hour"
            component={RestaurantDetail}
          />
          <Route exact path="/map" component={Map} />
        </Switch>
      </Router>
    );
  }
}

export default App;
