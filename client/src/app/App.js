import React from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

//Pages
import MainPage from '../pages/MainPage'
import RestaurantDetail from '../pages/RestaurantDetail'
import RestaurantsListing from '../pages/RestaurantsListing'
import Map from '../pages/Map'
import AdminRestaurants from '../pages/AdminRestaurants'
import AdminNewRestaurant from '../pages/AdminNewRestaurant.jsx'
import AdminLogin from '../pages/AdminLogin'
import AdminRestaurantHappyHours from '../pages/AdminRestaurantHappyHours'
import AdminNewHappyHour from '../pages/AdminNewHappyHour'
import AdminNewItem from '../pages/AdminNewItem'

class App extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={MainPage} />
                    <Route
                        exact
                        path="/restaurants"
                        component={RestaurantsListing}
                    />
                    <Route
                        exact
                        path="/restaurant/happy-hour"
                        component={RestaurantDetail}
                    />
                    <Route exact path="/map" component={Map} />
                    <Route exact path="/admin" component={AdminLogin} />
                    <Route
                        exact
                        path="/admin/restaurants"
                        component={AdminRestaurants}
                    />
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
                    {/* <Route
            exact
            path="/admin/restaurant/happy-hour/item/information"
            component={AdminNewItem}
          /> */}
                </Switch>
            </Router>
        )
    }
}

export default App
