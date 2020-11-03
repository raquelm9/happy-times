import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

//Pages
import MainPage from './pages/MainPage';
import RestaurantDetail from './pages/RestaurantDetail';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path = '/' component={MainPage} />
        <Route exact path = '/RestaurantDetail' component={RestaurantDetail} />
      </Switch>
    </Router>

  );
};

export default App;
