import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

//Pages
import MainPage from '../pages/MainPage/MainPage'
import AboutMe from '../pages/AboutMe/AboutMe'
import ClientLogin from '../components/LoginForm/Login'
import RestaurantDetail from '../pages/RestaurantDetail/RestaurantDetail'
import RestaurantsListing from '../pages/RestaurantsListing/RestaurantsListing'
import Map from '../pages/Map/Map'
import AdminRestaurants from '../pages/AdminRestaurants/AdminRestaurants'
import AdminNewRestaurant from '../pages/AdminNewRestaurant/AdminNewRestaurant.jsx'
import AdminLogin from '../pages/AdminLogin/AdminLogin'
import AdminRestaurantHappyHours from '../pages/AdminRestaurantHappyHours/AdminRestaurantHappyHours'
import AdminNewHappyHour from '../pages/AdminNewHappyHour/AdminNewHappyHour'

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/restaurants" component={RestaurantsListing} />
          <Route exact path="/login" component={ClientLogin} />
          <Route exact path="/about-me" component={AboutMe} />
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
          <Route
            exact
            path="/admin/restaurant/happy-hour"
            component={AdminRestaurantHappyHours}
          />
          <Route
            exact
            path="/admin/restaurant/happy-hour/information"
            component={AdminNewHappyHour}
          />
          <Route path="*" exact={true} component={RestaurantsListing} />
        </Switch>
      </Router>
    )
  }
}

export default App
