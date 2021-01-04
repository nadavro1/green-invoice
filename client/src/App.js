import React, {Fragment,useEffect} from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import './App.css';
import {Provider} from 'react-redux';
import store from './store';
import Dashboard from './components/dashboard/Dashboard';
import Routes from './components/routing/Routes';

const App= ()=>  {
  

  return(
  <Provider store={store}>
    <Router>
      <Fragment>
        <Navbar/>
        <Switch>
          <Route exact path='/' component={Dashboard}/>
          <Route component={Routes}/>
        </Switch>
      </Fragment> 
    </Router>
  </Provider>
)};
    
  

export default App;
