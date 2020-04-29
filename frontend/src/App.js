import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import HomeView from './views/HomeView.jsx';
import BuyView from './views/BuyView.js';
import RentView from './views/RentView.jsx';

const App = (props) => (
  <Router history={browserHistory}>
    <Route path='/' component={HomeView} />
    <Route path='/buy' component={() => <BuyView props={props}/> }  />
    <Route path='/rent' component={RentView} />
  </Router>
)

export default App;
