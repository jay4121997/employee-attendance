import React from 'react';
import { Route,Redirect,Switch } from 'react-router-dom';

import Layout from './hoc/layout/layout'
import ViewEmployee from './containers/ViewEmployee/ViewEmployee'
import AddEmployee from './containers/AddEmployee/AddEmployee'
import Auth from './containers/auth/auth'
import Logout from './containers/auth/Logout'

import classes from  './App.module.css';

function App() {
  return (
    <div className={classes.App}>
      <Layout>
        <Switch>
          <Route path='/addnew' exact component={AddEmployee} />
          <Route path='/auth' exact component={Auth} />
          <Route path='/logout' exact component={Logout} />
          <Route path='/' exact component={ViewEmployee} />
          <Redirect to ='/'/>
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
