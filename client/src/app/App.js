import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

//Pages
import MainPage from "../pages/MainPage";
import RestaurantDetail from "../pages/RestaurantDetail";
import RestaurantsListing from "../pages/RestaurantsListing";
import Map from "../pages/Map";
import AdminRestaurants from "../pages/AdminRestaurants";
import AdminNewRestaurant from "../pages/AdminNewRestaurant.jsx";
import AdminLogin from "../pages/AdminLogin";

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
          <Route exact path="/admin" component={AdminLogin} />
          <Route exact path="/admin/restaurants" component={AdminRestaurants} />
          <Route
            exact
            path="/admin/restaurant/information"
            component={AdminNewRestaurant}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
